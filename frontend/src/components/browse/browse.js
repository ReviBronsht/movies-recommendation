import { useState, useEffect } from "react"
import Row from "./components/row"
import './browse.css';
import axiosApp from "../../common/api";

export default function Browse({type}) {
  const [genres, setGenres] = useState([])
  const [titles, setTitles] = useState([])

  useEffect(() => {
    axiosApp
      .get("/"+type, {})
      .then((response) => {
        let res = JSON.parse(response.data.replaceAll(": NaN",`: ""`))
        console.log(res)
        setGenres(res.genres)
        setTitles(res.titles)
      })
      .catch((error) => {
        console.log(error);
      });

  
  },[type])
  return (
    <div>
      <h2>Browse {type}</h2>
      <br/>
      <br/>
      <div>
      {genres ? genres.map((genre, index) => (
        <div key={index} className="row-outer">
          <div >
          <Row genre={genre} titles={titles} rownum={index}/>
          </div>
          <br/>
          <br/>
        </div>
      )):""}
      </div>
    </div>
  )
}
