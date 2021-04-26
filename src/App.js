import { Switch, Route } from 'react-router-dom'
import './App.css';
import Nav from './Nav.js'
import ImageSearch from './ImageSearch.js'
import MapContainer from './MapContainer.js'
import SlideUp from './SlideUp.js'
import PlantSearch from './PlantSearch';



function App() {
  return (
    <div className="App" >
      <Nav /> {/* nav - search text search upload nav holds the icons and switch below fakes the routes*/}
      <Switch>
        
        <Route path="/image-search">
          <ImageSearch />
        </Route>
        <Route exact path="/">
          <MapContainer />
        </Route>
        <Route exact path="/plant-search">
          <PlantSearch />
        </Route>

      </Switch>
      {/* MAP */}
      {/* ImageSearch - pull out and in nav once your setting up you browser routes */}
      {/* <Search /> */}

      {/* menu links and app switches routes */}
      <SlideUp />
    </div>
  );



}

export default App;
