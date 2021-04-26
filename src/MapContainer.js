import { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import InfoWindowEx from './InfoWindowEx.js'
const axios = require('axios')

export class MapContainer extends Component {

    // use state to hold the markers array of objects
    state = {
        markers: [
            {   
                name: 'flannel',
                lat: '-33.409685',
                lng: '150.306726',
                url: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Acaciacultriformis.jpg'
            },
            {   
                name: 'brush',
                lat: '-33.945501',
                lng: '151.263698',
                url: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Acaciacultriformis.jpg'
            }
        ], 
        showingInfoWindow: false,
        activeMarker: {},
        selectedName: ''
    }

    // making axious call on mount /page load
    componentDidMount = () => {
        
        axios.get('/plants', {
        }).then(response => {// get back the params as a response
            // console.log(response)
            let results = response.data
            console.log(results.lat, results.lng, results.plant_name, results.image_url)

            this.setState(prevState => ({
                markers: [                 // object that we want to update
                    ...prevState.markers,    // retain existing
                    {   
                        name: results.plant_name, 
                        lat: results.lat, 
                        lng: results.lng,
                        url: results.image_url
                    }    // update the values
                ]
            }))

            console.log(this.state.markers)

        }) // set the state with the response so you can work with it
        .catch((error) => {
            console.error('Error:', error)
        })
        // console.log('component did mount')
        // console.log(this.state.markers)
    }

    // transforming marker array of objects into componenet to display on the map
    displayMarkers = () => {
        return this.state.markers.map((marker, idx ) => {
                return  <Marker 
                            onClick={this.onMarkerClick}
                            key={marker.name} 
                            plant={marker.name}
                            id={idx} 
                            position={{ lat: marker.lat, lng: marker.lng}}      
                        />
            })
    }
    
    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedName: props.plant,
            activeMarker: marker,
            showingInfoWindow: true
        })
        console.log(this.state)
    }
    
    render() {

        const style = {
            width: '80%',
            height: '75%',
            margin: '5% 10%'
        }

        const { selectedName } = this.state
        
        console.log(selectedName)

        return (
          <Map
              google={this.props.google}
              zoom={8}
              style={style}
              initialCenter={{ lat: -33.949501, lng: 151.243698 }}
          >
            {this.displayMarkers()}

            <InfoWindowEx
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
            >
                <div>
                    <h3>{selectedName}</h3>
                    {/* <img src={this.state.markers.url} alt="plant" width="60" height="60"/> */}
                </div>
          </InfoWindowEx>
        
         </Map>
        );
   }
}

export default GoogleApiWrapper({
  apiKey:process.env.REACT_APP_MAPS_API_KEY
})(MapContainer)

// console.log(process.env.REACT_APP_MAPS_API_KEY)

        // const setLocation = () => {
            //     if(navigator.geolocation) {
            //         navigator.geolocation.getCurrentPosition(
            //             (position) => {
            //                 this.setState({currentLocation: [{lat:position.coords.latitude,lng:position.coords.longitude}]})
            //             }
            //         )
            //     }
    
            //     console.log(this.state)
            //     return this.state.currentLocation[0]
            // }