import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
    movieData : [],
    trending : [],
    configurations : "",
    popular:[],
    topRated:[],
    totalPages : 0,
    genres : [],
    tvOrMovieData : []
}

const movieSlice = createSlice({
    name : "movies",
    initialState,
    reducers : {
        setMovieData : (state,action) => {
            state.movieData = action.payload
        },
        setTrending : (state,action) => {
            state.trending = action.payload
        },
        setConfigurations : (state, action) => {
            state.configurations = action.payload;
        },
        setPopular : (state, action) =>{
            state.popular = action.payload
        },
        setTopRated : (state, action) =>{
            state.topRated = action.payload
        },
        setTotalPages : (state, action) =>{
            state.totalPages = action.payload
        },
        setGenres : (state, action)=>{
            state.genres = action.payload
        },
        setTvOrMovieData : (state,action) => {
            state.tvOrMovieData = action.payload
        }
    }
})

export const {setMovieData, setTrending, setConfigurations, setPopular, setTopRated, setTotalPages,setGenres,setTvOrMovieData} = movieSlice.actions;

export default movieSlice.reducer