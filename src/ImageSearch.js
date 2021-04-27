import './ImageSearch.css'
import { useState, useEffect } from 'react'
import ImageCard from './ImageCard.js'

export default function ImageSearch() {

    // create a useState component to hold the file temp - not needed right tbh
    // const [selectedFile, setSelectedFile] = useState(null)
    // console.log(selectedFile)

    // create a useState component to hold the results!
    const [searchResults, setSearchResults] = useState()

    const [message, setMessage] = useState('Hi there!');

    useEffect(() => {
        console.log('trigger use effect hook');

        setTimeout(() => {
        setMessage("Upload an image and I\'ll try ID it");
        }, 2000)

    })
    
    const handleSendIdentification = () => {

        console.log('click works!')
        const files = [...document.querySelector('input[type=file]').files]
        const promises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const res = event.target.result;
                    // console.log(res);
                    resolve(res)
                }
                reader.readAsDataURL(file)
            })
        })
        console.log('promises made...')

        Promise.all(promises).then((base64files) => {
            // console.log(base64files)
            const data = {
                images: base64files,
                }
            fetch('/api/image-search', { // this is where the client send the data to your server which makes the post req to the api
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // this is the envelope that contains the body
            }) 
            .then(response => response.json()) 
            .then(data => { //this is where the data comes back to the client
                // console.log('Success:', data)
                // console.log(data)
                const results = data.suggestions
                // console.log(results)

                // save the results to use then as a value in you component
                setSearchResults(results)

            })
            .catch((error) => {
                console.error('Error:', error)
                })
        })
    }

    // console.log(searchResults)

    // remove search function once you diplay the results
    return (

        <section className="image-search">
            {message}
            <form className="image-search-form">
            <div>
                <input type="file"/>
                <button className="search-btn" type="button" onClick={handleSendIdentification} >search</button>
            </div>
            </form>
            <h5> {searchResults === undefined ? "" : `Showing ${searchResults.length} matches`}  </h5>

            {/* INDIVIDUAL PLANT COMPONENTS */}
            {/* show number of results searchResults.length  */}

            {/* if the the array is undefined display "please wait" else display the items */}
            {searchResults === undefined 
            ? ""
            : searchResults.map((result, idx) => ( <ImageCard className="card" result={result} id={idx} key={idx}/> ))
            }
        </section>
    )
}