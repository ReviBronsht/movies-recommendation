
import { useState } from 'react'
import './searchbar.css';

export default function SearchList({ title, setTitle, data, dofunc,  placeholder }) { // search from list for both ingredients and directions
   const [filteredData, setFilteredData] = useState([]);
  // const [title, SetTitle] = useState("");

  const handleFilter = (e) => {
    setTitle(e.target.value)
    const searchWord = e.target.value
    if (searchWord === "") {
      setFilteredData([]);
    }
    else {
      const newFilter = data.filter((value) => {
        return String(value).toLowerCase().includes(searchWord.toLowerCase());
      })
      setFilteredData(newFilter);
    }
  }



  function clickHandler(e) {
    e.preventDefault();
    setTitle(e.target.value);
    setFilteredData([]);
  }


  return (
    <div>
      <div className='search' >
        <div className="searchInput">
        <input type="text" placeholder={placeholder} value={title} onChange={handleFilter} />
        <button className='selectedbtn' style={{height:"30px"}} onClick={() => { setFilteredData([]); dofunc()}}>
            Get Recommendations {'>'}
             </button>
        </div>
        {filteredData.length !== 0 ?
          <div className='dataResult' >
            {filteredData.slice(0, 15).map((word) => <p key={word} className="dataItem">  <button onClick={clickHandler} value={word} > {word}
            </button></p>)}
          </div> : ""}
      </div>
    </div>
  )
}
