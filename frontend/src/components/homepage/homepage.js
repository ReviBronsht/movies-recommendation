import './homepage.css';
import { useEffect, useState } from 'react';
import SearchList from './components/searchlist';
import Recommendations from './components/recommendations';
import axiosApp from "../../common/api";

export default function Homepage() {
    const [type, setType] = useState("Movie")
    const [title, setTitle] = useState("")
    const [err, setErr] = useState("")
    const [showRecs, setShowRecs] = useState(false)
    const [mTitles, setMTitles] = useState([])
    const [sTitles, setSTitles] = useState([])
    const [recs, setRecs] = useState([])

    useEffect(() => {
      axiosApp
      .get("/homepage", {})
      .then((response) => {
        let res = response.data
        console.log(res)
        let temp_movies = res.filter(title => title.type === "Movie")
        temp_movies = temp_movies.map((movie) => movie.title)
        setMTitles(temp_movies)
        let temp_shows = res.filter(title => title.type === "TV Show")
        temp_shows = temp_shows.map((show) => show.title)
        setSTitles(temp_shows)
      })
      .catch((error) => {
        console.log(error);
      });
    },[])

    function getRecs() {
      setShowRecs(false)
        if (title === "")
        {
          setErr("Please enter a title.")
        }
        else if ((type === "Movie" && !mTitles.includes(title)) || (type === "TV Show") && !sTitles.includes(title))
        {  
        setErr("Please select a title from the list.")
        }
        else {
          setErr("");
          let resData = {"type":type, "title":title}
          console.log(resData)
          axiosApp
        .post("/homepage", resData)
        .then((res) => {
          console.log(res);
          setShowRecs(true);
          setRecs(res.data)
        })
        .catch((err) => {
          console.log(err.response);
        });
          
        }
    }
  return (
    <div className="home-content">
      <div className="banner" style={{backgroundImage:`url("/img/banner.jpg")`}}>
        <h3 className='title2'>Find recommendations for Netflix movies and TV shows,</h3>
        <h4 className='title2'>based on your favorite titles.</h4>
        </div>
        <br/>
        <button className={type === "Movie" ? "selectedbtn" : ""} onClick={() => setType("Movie")}>
        Find Movies
        </button>
        &nbsp;
        <button className={type === "TV Show" ? "selectedbtn" : ""} onClick={() => setType("TV Show")}>
        Find TV Shows
        </button>
        <br/>
        <br/>
        <span>Enter the name of your favorite {type}</span>
        <br/>
        <br/>
        <SearchList data={type==="Movie" ? mTitles : sTitles} dofunc={getRecs} title={title} setTitle={setTitle} placeholder="title..."/>
        <br/>
        <span className='err'>{err}</span>
        {showRecs ? <Recommendations recs={recs}/> : ""}
    </div>
  )
}
