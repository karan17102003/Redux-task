import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
//TODO
// when clicking on a card a new page opens show data on that page
const MovieCard = ({movieDetails}) => {

  const imageBaseUrl = useSelector((state)=>state.movieSlice?.configurations?.images?.base_url)
  const imageSize = useSelector((state)=>state.movieSlice?.configurations?.images?.poster_sizes[6])

  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const date =new Date(movieDetails.release_date || movieDetails.first_air_date);

  return (
    <div className=' w-[188px] text-white mr-3'>
        <NavLink to={`/movie/${movieDetails.id}`}>
            <img src={`http://image.tmdb.org/t/p/original${movieDetails.poster_path}`} className=' h-[280px]'/>
            <div className='h-20'>
                <p className='text-nowrap overflow-hidden'>{movieDetails.title || movieDetails.name}</p>
                <p>{`${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}</p>
            </div>
        </NavLink>
    </div>
        
  )
}

export default MovieCard