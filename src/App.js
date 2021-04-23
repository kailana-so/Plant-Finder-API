import './App.css';
import Nav from './Nav.js'
import Search from './Search.js'

function App() {
  return (
    <div className="App">
      <Nav /> {/* nav - search text search upload*/}
      {/* MAP */}
      {/* SEARCH - pull out and in nav once your setting up you browser routes */}
      <Search />
    </div>
  );
}

export default App;
