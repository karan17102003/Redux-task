import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import fetchData from '../apiCall';
import { setMovieData, setTotalPages } from '../slice/movieSlice';
import MovieCard from '../components/MovieCard';
import  store  from '../store/store';



//TODO
// FIND OUT WHY INIFINITE SCROLL LIBRARY IS NOT WORKING AND FIX IT
const Search = () => {

    const {query} = useParams();
    const searchResults = useSelector((state)=> state.movieSlice.searchResults);
    const totalPages = useSelector((state)=>state.movieSlice.totalPages);
    const movieData = useSelector((state)=>state.movieSlice.movieData)
    const [page, setPage] = useState(1);

    async function fetchMoviePerPage(){
        const queryAndPageBasedUrl = `https://api.themoviedb.org/3/search/multi?query=${query}&page=${page}`;
        const res = await fetchData(queryAndPageBasedUrl);

        const newMovieData = [...movieData, ...res.data.results];
        store(setMovieData(newMovieData));
        // setPage((prev) => prev + 1);
        store(setTotalPages(res.data.total_pages));
    }

    useEffect(()=>{
        return()=> store(setMovieData([]));
    },[])

    useEffect(()=>{
        console.log(page)
        fetchMoviePerPage()
    },[page])


  return (
    <main className='p-4 bg-slate-900 text-white'>
        <h2 className='mb-4 text-2xl font-bold'>Search results for '{query}'</h2>

        {/* <InfiniteScroll
            dataLength={totalPages} //This is important field to render the next data
            next={fetchMoviePerPage}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
                </p>
            }
            >
            {
                <div className='flex flex-wrap'>
                    {
                        movieData.map((elem)=>{
                            return(
                                <MovieCard movieDetails={elem}/>
                            )
                        })
                    }
                </div>
            }
        </InfiniteScroll> */}

        <div className='flex flex-wrap'>
            {
                movieData.map((elem)=>{
                    return(
                        <MovieCard movieDetails={elem}/>
                    )
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

export default Search