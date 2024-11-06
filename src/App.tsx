import { useEffect, useState } from 'react';
import ComicViewer from './components/comicViewer';
import { Route, Routes } from 'react-router-dom';


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://justinepham.github.io/react-comic-viewer/data/comicData.json')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
       <Route path="/" element={<ComicViewer comicData={data} />}></Route>
    </Routes>
    
  );
}

export default App;

