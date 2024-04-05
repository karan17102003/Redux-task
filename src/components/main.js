import React from "react"
import './main.css'
const Main = () => {
    return(
        <div className="main-top">
        <h1>Welcome.</h1>
        <p>Millions of movies, TV shows and people to discover. Explore now.</p>
        <input type="text" placeholder="Search for a movie or tv show..."/>
        <button>Search</button>
        </div>
    )
}
export default Main