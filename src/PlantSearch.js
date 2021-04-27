import './PlantSearch.css'
import { useState } from 'react'
import PlantCard from './PlantCard.js'
const axios = require('axios')

// this is doing a direct inout search with isn't very good. refactor it to pul all the data dn then process it client side you you can do more natural  queries

export default function PlantSearch() {

    // create a useState component to hold the input
    const [input, setInput] = useState('')
    const [results, setResults] = useState([])
    console.log(results)

    const handleInput = (e) => {

        e.preventDefault()

        console.log('submit')
        console.log(input)

        axios.get('/api/plants', { 
            params: { input } // pass in the params
        })
        .then(response => {// get back the params as a response
            // console.log(response)
            let results = response.data
            // console.log(results.plant_name)
            setResults(results)}) // set the state with the response so you can work with it
        .catch((error) => {
            console.error('Error:', error)
        })
    }
    return (

        <section className="plant-search">
            <div>
                <form className="plant-search-form">
                    <input type="text" onChange={(e) => setInput(e.target.value)} value={input} /> 
                    <button className="search-btn" type="button" onClick={handleInput}>search</button>
                </form>

            </div>
                <section>
                    {results.length === 0 ? "" : <PlantCard results={results}/> }

                </section>
        </section>
    )
}