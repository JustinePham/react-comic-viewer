import { useEffect, useState } from 'react';
import ComicViewer from './components/comicViewer';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://justinepham.github.io/comic-pages//comicData.json')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Comic Page Viewer</h1>
      <ComicViewer comicData={data} />
    </div>
  );
}

export default App;
