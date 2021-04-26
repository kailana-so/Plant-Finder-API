import './PlantCard.css'
const axios = require('axios')

export default function PlantCard(props) {
    console.log(props)

    const handleInsertToDb = () => {
        console.log('button clicked')
        // console.log(props.id)
        // console.log(props.result.plant_name)

        axios.post('/api/plants', { 
            props
        })
    }

    return (
        <section className="card">
            <div>
                <h2>{props.result.plant_name}</h2>
                <h5>Common Names:</h5>
                <p>{props.result.plant_details.common_names[0]},  {props.result.plant_details.common_names[1]} </p>
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
            <button onClick={handleInsertToDb}> mark as sighting </button>
        </section>
    )
}