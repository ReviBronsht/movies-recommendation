import Title from "../../title/title"

export default function Row({genre,titles, rownum}) {
  return (
    <div className="row-outer">
        <h3 className="title2">{genre}</h3>
    <div className="row-container">
      {titles ? titles.filter(title => title.listed_in.includes(genre)).slice(0, 5).map((title, index) => (
         <span key={index} ><Title 
            title={title.title} 
            description={title.description} 
            director={title.director} 
            cast={title.cast}
            img={title.image}
            genre={title.listed_in}
            page={"browse"}
            rownum={rownum}/>
        </span> 
      ))
      :""}
    </div>
    </div>
  )
}
