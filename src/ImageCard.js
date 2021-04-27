import './ImageCard.css'
import { useState } from 'react'
const axios = require('axios')

export default function PlantCard(props) {
    // console.log(props)

    const [ searchResults, setSearchResults ] = useState(props)
    const [ location, setLocation ] = useState()


    const handleInsertToDb = () => {
        console.log('button clicked')
        // console.log(searchResults)
        // console.log(location)
        // console.log(props.result.plant_name)
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position.coords)
                const location = {
                    lat:position.coords.latitude, 
                    lng:position.coords.longitude
                }
                axios.post('/api/plants', { 
                    props, location
                })
                setLocation({
                    lat:position.coords.latitude, 
                    lng:position.coords.longitude
                })
            }
		)
    
    }
    // const getUserLocation = () => { /// this is a custom obj so to work with it pull out the data and store it first
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             setLocation({
    //                     lat:[position.coords.latitude], 
    //                     lng:[position.coords.longitude]
    //             })
    //         }
	// 	)
    // //     setTimeout(handleInsertToDb, 8000)
    // }

    return (
        <section className="image-card">
            <div>
                <h2>{props.result.plant_name}</h2>
                <h5>Common Names:</h5>
                <p>{props.result.plant_details.common_names === null 
                    ? "No common names found" 
                    : props.result.plant_details.common_names.join(', ')} </p>
            </div>

            <h5>Description:</h5>
            <p> {props.result.plant_details.wiki_description === null ? "This plant has no info" : props.result.plant_details.wiki_description.value}</p>

            <h5>Taxonomy</h5>
            <p>Class: {props.result.plant_details.taxonomy.class} </p>
            <p>Genus: {props.result.plant_details.structured_name.genus}</p>
            <p>Species: {props.result.plant_details.structured_name.species}</p>

            <h5>Match:</h5>
            <p>{(props.result.probability * 100).toFixed(2)}% </p>
            <h5>More images: </h5>
            <section className="image-wrapper">
                <img src={props.result.similar_images[0].url} alt=""/>
                <img src={props.result.similar_images[1].url} alt=""/>
            </section>

            {/* when the user list the marking grabb the geo location */}
            <button onClick={handleInsertToDb}> mark location </button>
            {/* <p>{location === undefined 
            ? "loading location" 
            : location.lat[0] + "and" + location.lng[1]}</p> */}
        </section>
    )
}