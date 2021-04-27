import './PlantCard.css'

export default function PlantCard(props) {
    console.log(props)
    return (
        <section className="plant-card">
            <h2>{props.results.plant_name}</h2>
            <h5>Common Names:</h5>
            <p>
                {props.results.common_name.join(', ')} 
            </p>

            <h5>Description:</h5>
            <p> {props.results.description === null ? "This plant has no info" : props.results.description}</p>

            <h5>Taxonomy</h5>
            <p>Class: {props.results.class} </p>
            <p>Genus: {props.results.genus}</p>
            <p>Species: {props.results.species}</p>
            <h5>More images: </h5>
            <section className="image-wrapper">
                <img src={props.results.image_url} alt=""/>
            </section>

        </section>
    )
}