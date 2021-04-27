import './PlantSearch.css'
import { useState, useEffect } from 'react'
import PlantCard from './PlantCard.js'
const axios = require('axios')
//  include the Keyword Extractor
const keyword_extractor = require("keyword-extractor");

// this is doing a direct inout search with isn't very good. refactor it to pul all the data dn then process it client side you you can do more natural  queries

export default function PlantSearch() {

    // create a useState component to hold the input
    const [input, setInput] = useState('')
    const [dbResults, setDbResults] = useState([])
    const [matches, setMatches] = useState('')
    const [message, setMessage] = useState('Hi there!');
    const keywords = []

    useEffect(() => {
        console.log('trigger use effect hook');

        setTimeout(() => {
        setMessage("Search for a plant and I'll see if we have it");
        }, 2000)

        axios.get('/api/plants', {})
        .then(response => {
            // get back the params as a response
            let results = response.data
            setDbResults(results)
        }) // set the state with the response so you can work with it
        .catch((error) => {
            console.error('Error:', error)
        })

    },[])
    // this is the list of dependencies - as an array
    // empty array means it'll only happen once
    // if you wnat tit to change on trigger of other functions... add them here


    const handleInput = e => {
        e.preventDefault()
        setInput({content: e.target.value})
        // console.log(input)
    }

    const handleQuery = e => {

        console.log(input)
        
        //  Extract the keywords
        const extraction_result =
        keyword_extractor.extract(input.content,{
            language:"english",
            remove_digits: true,
            return_changed_case:true,
            remove_duplicates: false

        });

        console.log(extraction_result)

        // let keywords = []

        dbResults.forEach((dbresult) => {
            let plantDesciption = dbresult.description.toLowerCase()

            if (new RegExp(extraction_result.join("|")).test(plantDesciption)) {
                console.log(dbresult.id)
                keywords.push(dbresult)
            }
        })

        setMatches(keywords)
    }

    console.log(matches.length)

    return (

        <section className="plant-search">
            {message}
            <div>
                <form className="plant-search-form">
                    <input type="text" onChange={handleInput} cols="35" rows="5"/> 
                    <button className="search-btn" type="button" onClick={handleQuery}>search</button>
                </form>

            </div>
                <section>
                    <h5>{matches.length === 0 ? "" : `Showing ${matches.length} matches` }</h5>

                    {matches.length === 0 
                    ? "" 
                    : matches.map((match, idx) => ( <PlantCard results={match} id={match.id} key={idx}/> ))}


                </section>
        </section>
    )
}