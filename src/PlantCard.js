import './PlantCard.css'

export default function PlantCard(props) {
    console.log(props)

    return (
        <section className="card">
            <div>
                <h4> {props.result.plant_name}</h4>
            </div>

            <p> {props.result.plant_details.structured_name.genus}</p>
            <p> {props.result.plant_details.structured_name.species}</p>
            <p> {props.result.plant_details.wiki_description === null ? "This plant has no info" : props.result.plant_details.wiki_description.value}</p>

            <p>{(props.result.probability * 100).toFixed(2)}% match </p>
            <h4> More images: </h4>
            <section className="image-wrapper">
                <img src={props.result.similar_images[0].url} alt=""/>
                <img src={props.result.similar_images[1].url} alt=""/>
            </section>
        </section>
    )
}