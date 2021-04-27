import './ImageCard.css'
import { useState } from 'react'
import { Button, Confirm } from "semantic-ui-react";
import { Link } from 'react-router-dom'


const axios = require('axios')


export default function PlantCard(props) {
    // console.log(props)

    const [ state, setState ] = useState({ open: false })
    const [ location, setLocation ] = useState()
    console.log(location)

    const handleInsertToDb = () => {
        console.log('button clicked')
        console.log(props.id)
        
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

    const show = () => setState({ open: true })
    const handleConfirm = () => {
        setState({ open: false })
        handleInsertToDb()
    }
    const handleCancel = () => setState({ open: false })

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

            {/* when the user list the marking grab the geo location */}
            <footer>
                <Button onClick={show}>Mark sighting</Button>
                    <Confirm
                        className="confirm-dialog"
                        open={state.open}
                        cancelButton="no"
                        confirmButton="yes"
                        onCancel={handleCancel}
                        onConfirm={handleConfirm}
                    />
            </footer>
        </section>
    )
}