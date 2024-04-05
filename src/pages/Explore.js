import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Select from 'react-select';
import {useSelector} from 'react-redux'
import fetchData from '../apiCall';

import store from '../store/store';
import {setGenres, setMovieData, setTotalPages, setTvOrMovieData} from '../slice/movieSlice';
import MovieCard from '../components/MovieCard';

const Explore = () => {

    const data = useParams();

    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const [page,setPage] = useState(1);

    const genres = useSelector((state) => state.movieSlice.genres);
    const tvOrMovieData = useSelector((state) => state.movieSlice.tvOrMovieData)



    const sortBy  = [
      {defaultValue  : null , label : "Select"},
      { value: 'popularity.desc', label: 'Popularity Decending' },
      { value: 'popularity.asc', label: 'Popularity Ascending' },
      { value: 'vote_average.desc', label: 'Rating Decending' },
      { value: 'vote_average.asc', label: 'Rating Ascending' },
      { value: 'primary_release_date.desc', label: 'Release Date Decending' },
      { value: 'primary_release_date.asc', label: 'Release Date Ascending' },
      { value: 'original_title.asc', label: 'Title A-Z' },
    ]
    const pageType = {
      movie : "movie",
      tvShow : "tv"
    }

    async function fetchGenerList(){
      const genereUrl = `https://api.themoviedb.org/3/genre/${pageType[data.showType]}/list`

      const res = await fetchData(genereUrl);

      const mapedGeners = res.data.genres.map((elem)=>{
        return {
          value : elem.id,
          label : elem.name
        }
      })
      store(setGenres(mapedGeners));
    }

    async function fetchMovieOrTvData(){

      const selectedOptionString = selectedOption && selectedOption.map((elem)=>{
        return elem.value;
      }).join(",");

      // const movieOrTvShowUrl = `https://api.themoviedb.org/3/discover/${pageType[data.showType]}?${selectedOption === null ? "with_genres=": `with_genres=${selectedOptionString}`}&${selectedSortOption === null ? "sort_by=":`sort_by=${selectedSortOption}`}`;

      const movieOrTvShowUrl = `https://api.themoviedb.org/3/discover/${pageType[data.showType]}?${selectedOption === null ? "with_genres=": `with_genres=${selectedOptionString}`}&${selectedSortOption === null ? "sort_by=":`sort_by=${selectedSortOption.value}`}`

      const res = await fetchData(movieOrTvShowUrl);

      // console.log(selectedSortOption)
      store(setTvOrMovieData(res.data.results))

      // fetchData(movieOrTvShowUrl)
      // .then((res) =>{
      //   console.log(typeof(res.data.results));
      //   store(Object(res.data.results));
      // })

      // const newMovieOrTvShowData = [...movieData , ...res.data.results]
      // console.log(movieData,res.data.results)

      // store(res.data.results);
      // store(setTotalPages(res.data.total_pages))
      // console.log(res.data.results);
    }

    useEffect(()=>{
      setSelectedOption(null);
      fetchGenerList();
      // fetchMovieOrTvData();
    },[data.showType])

    useEffect(()=>{
      fetchMovieOrTvData()
    },[data.showType,selectedOption,selectedSortOption])


  return (
    <main className='p-4 bg-slate-900 text-white '>
      <div className='flex justify-between items-center mb-6'>
        <h2>Explore {data.showType === "movie" ? "Movies" : "TV Shows"}</h2>
        <div className='text-black flex gap-2 w-1/2 justify-end'>
          <Select
            className='w-1/2 '
            isMulti
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={genres}
          />
          <Select
            className='w-1/3'
            defaultValue={selectedSortOption}
            onChange={setSelectedSortOption}
            options={sortBy}
          />
        </div>
      </div>
      <div className='flex flex-wrap'>
        {
          tvOrMovieData.map((elem)=>{
            return <MovieCard movieDetails={elem}/>
          })
        }
      </div>
      <div className='flex w-full justify-center items-center'>
            <button onClick={()=>{
                setPage((prev) => {
                    return prev + 1;
                })
            }}>Load More</button>
        </div>
    </main>
  )
}

export default Explore