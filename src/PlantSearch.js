import './PlantSearch.css'
import { useState, useEffect } from 'react'
import PlantCard from './PlantCard.js'
const axios = require('axios')

// this is doing a direct inout search with isn't very good. refactor it to pul all the data dn then process it client side you you can do more natural  queries

export default function PlantSearch() {

    // create a useState component to hold the input
    const [input, setInput] = useState('')
    const [results, setResults] = useState([])
    console.log(results)
    
    const [message, setMessage] = useState('Hi there!');

    useEffect(() => {
        console.log('trigger use effect hook');

        setTimeout(() => {
        setMessage("Search for a plant and I\'ll see if we have it");
        }, 2000)

        // axios.get('/api/plants', { 
           
        // })
        // .then(response => {// get back the params as a response
        //     // console.log(response)
        //     let results = response.data
        //     // console.log(results.plant_name)
        //     setResults(results)}) // set the state with the response so you can work with it
        // .catch((error) => {
        //     console.error('Error:', error)
        // })

    })

      const handleInput = e => {
        e.preventDefault()

        setInput({content: e.target.value})
        console.log(input)

        // console.log('submit')
        // console.log(input)

        // axios.get('/api/plants', { 
        //     params: { input } // pass in the params
        // })
        // .then(response => {// get back the params as a response
        //     // console.log(response)
        //     let results = response.data
        //     // console.log(results.plant_name)
        //     setResults(results)}) // set the state with the response so you can work with it
        // .catch((error) => {
        //     console.error('Error:', error)
        // })
    }

    const handleQuery = e => {
        e.preventDefault()

        console.log('submit')
        console.log(input)
    }
    return (

        <section className="plant-search">
            {message}
            <div>
                <form className="plant-search-form">
                    <input type="text" onChange={handleInput}/> 
                    <button className="search-btn" type="button" onClick={handleQuery}>search</button>
                </form>

            </div>
                <section>
                    {/* {results.length === 0 ? "" : <PlantCard results={results}/> } */}

                </section>
        </section>
    )
}