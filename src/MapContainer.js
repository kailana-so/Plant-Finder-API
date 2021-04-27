import { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { InfoWindow } from "google-maps-react";

const axios = require('axios')

export class MapContainer extends Component {

    // use state to hold the markers array of objects
    state = {
        markers: [], 
        showingInfoWindow: false,
        activeMarker: {},
        selectedName: '',
        selectedImg: '',
        selectedDescription: '',
    }

    // making axious call on mount /page load
    componentDidMount = () => {
        
        axios.get('/plants', {
        }).then(response => {// get back the params as a response
            // console.log(response)
            let results = response.data
            // console.log(results.lat, results.lng, results.plant_name, results.image_url)

            this.setState({
                markers: results
            })

            console.log(this.state.markers)

        }) // set the state with the response so you can work with it
        .catch((error) => {
            console.error('Error:', error)
        })

    }

    // transforming marker array of objects into componenet to display on the map
    displayMarkers = () => {
        return this.state.markers.map((marker) => {
    
            return  <Marker 
                        onClick={this.onMarkerClick}
                        key={marker.id} 
                        plant={marker.plant_name}
                        description={marker.description}
                        url={marker.image_url}
                        id={marker.id} 
                        position={{ lat: marker.lat, lng: marker.lng}}      
                    />
            })
    }
    
    onMarkerClick = (props, marker, id) => {
        console.log(id)
        this.setState({
            selectedName: props.plant,
            selectedImg: props.url,
            selectedDescription: props.description,
            activeMarker: marker,
            showingInfoWindow: true
        })
        console.log(this.state)
    }
    
    render() {

        const style = {
            width: '80%',
            height: '75%',
            margin: '5% 10%',
        }
        const imgStyle = {
            width: '35%',
        }

        const { selectedName, selectedImg, selectedDescription } = this.state
        
        console.log(selectedName)

        return (
          <Map
              google={this.props.google}
              zoom={6}
              style={style}
              initialCenter={{ lat: -33.949501, lng: 151.243698 }}
          >
            {this.displayMarkers()}

            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
            >
                <div>
                    <h3>{selectedName}</h3>
                    <p>{selectedDescription}</p>
                    <img src={selectedImg} style={imgStyle} alt={selectedName}/>
                </div>
          </InfoWindow>
        
         </Map>
        );
   }
}

export default GoogleApiWrapper({
  apiKey:process.env.REACT_APP_MAPS_API_KEY
})(MapContainer)
