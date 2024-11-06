import React from 'react';
import { useState, useEffect } from 'react';

const ComicViewer: React.FC<{ comicData: any }> = ({ comicData }) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const chapters = comicData.chapters;

  useEffect(() => {
    setCurrentPageIndex(0); // Reset page index when the chapter changes
  }, [currentChapterIndex]);

  const currentChapter = chapters[currentChapterIndex];
  const currentPage = currentChapter.pages[currentPageIndex];

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
      <h2>{currentChapter.title}</h2>
      <img
        src={currentPage.url}
        alt={`Page ${currentPage.page}`}
        style={{ width: '100%', maxWidth: '100%' }}
      />

      <div style={{ marginTop: '20px' }}>
        <button className="bg-cyan-400" onClick={prevPage} disabled={currentPageIndex === 0}>
          Previous
        </button>
        <button className="bg-cyan-400"
          onClick={nextPage}
          disabled={currentPageIndex === currentChapter.pages.length - 1}
        >
          Next
        </button>

        <div style={{ marginTop: '10px' }}>
          <label>
            Select Chapter:
            <select className="form-select"
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

          <label style={{ marginLeft: '10px' }}>
            Select Page:
            <select className="form-select"
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
    </div>
  );
};

export default ComicViewer;
