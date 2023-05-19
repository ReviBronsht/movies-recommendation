import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';

export default function Navbtn({linkto, selected}) {
  return (
    <div className={`navbtn ${selected}`}>
      {linkto === "home" ? <SearchIcon/> : ""}
      {linkto === "movies" ? <LocalMoviesIcon/> : ""}
      {linkto === "shows" ? <TvIcon/> : ""}
    </div>
  )
}
