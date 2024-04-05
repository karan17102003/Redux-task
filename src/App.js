import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppTemplate from './components/AppTemolate';
import Explore from './pages/Explore';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<AppTemplate/>}>
          <Route path='' element = {<Home/>} />
          <Route path='explore/:showType' element = {<Explore/>} />
          <Route path='movie/:movieId' element = {<MovieDetails/>}/>
          <Route path='search/:query' element = {<Search/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
