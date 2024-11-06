import { useEffect, useState } from 'react';
import ComicViewer from './components/comicViewer';


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://justinepham.github.io/react-comic-viewer/src/data/comicData.json')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <ComicViewer comicData={data} />
    </div>
  );
}

export default App;
