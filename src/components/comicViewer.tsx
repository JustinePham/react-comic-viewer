import { useState, useEffect } from 'react';

// Helper function to resize the image
const resizeImage = (url: string, maxWidth: number, maxHeight: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Needed for cross-origin images

    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      // Calculate dimensions based on aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.9));
      } else {
        reject(new Error("Canvas context is not available"));
      }
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
};


const ComicViewer: React.FC<{ comicData: {chapters:{title:string, pages:{page:number, url:string}[] }[]} }> = ({ comicData }) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [resizedImageUrl, setResizedImageUrl] = useState<string | null>(null);

  const chapters = comicData.chapters;

  useEffect(() => {
    setCurrentPageIndex(0); // Reset page index when the chapter changes
  }, [currentChapterIndex]);

  const currentChapter = chapters[currentChapterIndex];
  const currentPage = currentChapter.pages[currentPageIndex];

  // Resize the image when page changes
  useEffect(() => {
    resizeImage(currentPage.url, 880, 623) // Adjust maxWidth and maxHeight as needed
      .then((resizedUrl) => setResizedImageUrl(resizedUrl))
      .catch((error) => console.error("Error resizing image:", error));
  }, [currentPage]);

  // Navigate to the previous page
  const prevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  // Navigate to the next page
  const nextPage = () => {
    if (currentPageIndex < currentChapter.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  // Change chapter and reset to the first page of that chapter
  const changeChapter = (index:number) => {
    setCurrentChapterIndex(index);
    setCurrentPageIndex(0);
  };

  // Directly select a page within the current chapter
  const changePage = (index: number) => {
    setCurrentPageIndex(index);
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: '600px', margin: 'auto' }}>
      <h2 className="p-2 text-xl font-bold uppercase ">{currentChapter.title}</h2>
      {resizedImageUrl ? (
        <img
          src={resizedImageUrl}
          alt={`Page ${currentPage.page}`}
          style={{ width: "100%", maxWidth: "100%" }}
        />
      ) : (
        <p>Loading...</p>
      )}

      <div className="p-2 grid grid-rows-1 grid-cols-4 gap-2">
        <button className="bg-blue-500	 text-white" onClick={prevPage} disabled={currentPageIndex === 0}>
          Previous
        </button>
        <button className="bg-blue-500	 text-white"
          onClick={nextPage}
          disabled={currentPageIndex === currentChapter.pages.length - 1}
        >
          Next
        </button>
          <label>
            Select Chapter:
            <select className="form-select text-slate-400"
              value={currentChapterIndex}
              onChange={(e) => changeChapter(Number(e.target.value))}
            >
              {chapters.map((chapter, index) => (
                <option key={index} value={index}>
                  {chapter.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            Select Page:
            <select className="form-select text-slate-400"
              value={currentPageIndex}
              onChange={(e) => changePage(Number(e.target.value))}
            >
              {currentChapter.pages.map((page, index) => (
                <option key={index} value={index}>
                  Page {page.page}
                </option>
              ))}
            </select>
          </label>
      </div>
    </div>
  );
};

export default ComicViewer;
