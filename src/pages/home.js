
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setConfigurations, setPopular, setTopRated, setTrending } from '../slice/movieSlice';
import { dispatch } from '../store/store';
import CardsContainer from '../components/CardsCountainer';
import fetchData from '../apiCall';
import { NavLink } from 'react-router-dom';

const Header = () => {

  const [searchInput, setSearchInput] = useState("");
  const inputRef = useRef()

  return(
    <div className='h-[76.5vh] flex flex-col justify-center items-center'>
        <h1 className='mb-5 text-5xl font-bold'>Welcome</h1>
        <p className='mb-10'>Millions of movies, TV shows and people to discover. Explore now.</p>
        <div className='flex justify-center items-center w-full'>
          <input ref={inputRef} placeholder='enter movie or show name' type='text'className='px-4 py-2 border border-slate-500 w-1/2 h-12 rounded-l-lg text-black' onChange={(e)=>{
            setSearchInput(e.target.value)
          }} />
          <NavLink to={`/search/${searchInput}`}>
          <button className='px-8 py-2 bg-blue-500 text-white cursor-pointer h-12 rounded-r-lg'>Search</button>

          </NavLink>
        </div>
    </div>
  )
}

const Home = () => {


  const trendingFilterOptions = ["Day" , "Week"]
  const popularFilterOptions = ["Movies","TV Shows"]

  const dispatch = useDispatch();

  const [trendingFilter , setTrendingFilter] = useState("day")
  const [popularFilter, setPopularFilter] = useState("movies")
  const [topRatedFilter, setTopRatedFilter] = useState("movies")

  const popularType = {
    movies : "movie",
    "tv shows" : "tv"
  }

  async function fetchConfigData(){
    const configurationsUrl = 'https://api.themoviedb.org/3/configuration'
    const res = await fetchData(configurationsUrl,setConfigurations)

    dispatch(setConfigurations(res.data))
  }

  async function fetchTrendingData(){
    const trendingUrl = `https://api.themoviedb.org/3/trending/movie/${trendingFilter}`

    const res = await fetchData(trendingUrl);
    dispatch(setTrending(res.data.results));

  }

  async function fetchPopularData(){
    const popularUrl = `https://api.themoviedb.org/3/${popularType[popularFilter]}/popular`;

    const res = await fetchData(popularUrl);
    dispatch(setPopular(res.data.results))
  }

  async function fetchTopRated(){
    const topRatedUrl = `https://api.themoviedb.org/3/${popularType[topRatedFilter]}/top_rated`;

    const res = await fetchData(topRatedUrl);
    dispatch(setTopRated(res.data.results));
  }

  useEffect(()=>{
    fetchConfigData()
  },[])

  useEffect(()=>{
    fetchTrendingData()
  },[trendingFilter])

  useEffect(()=>{
    fetchPopularData();
  },[popularFilter])

  useEffect(()=>{
    fetchTopRated()
  },[topRatedFilter])

  
  return (
    <main className='p-4 bg-slate-900 text-white '>

      <Header/>

      <CardsContainer containerType = {"Trending"} filterOptions = {trendingFilterOptions} dataStoredIn = 'trending' setFilter = {setTrendingFilter} />

      <CardsContainer containerType={"What's Popular"} dataStoredIn="popular" setFilter={setPopularFilter} filterOptions={popularFilterOptions}/>

      <CardsContainer containerType={"Top Rated"} dataStoredIn="topRated" setFilter={setTopRatedFilter} filterOptions={popularFilterOptions} />

    </main>
  )
}

export default Home