import Title from "../../title/title"

export default function Recommendations({recs}) {
  return (
    <div >
      <h3 className="title2"> Your recommended titles are:</h3>
      <div className="recs-container">
      {recs ? recs.map((rec, index) => (
        <span key={index}>
            <span  className="title-idx" style={{float:"left"}}>
                {index +1}
            </span>
            <Title 
            title={rec.title} 
            description={rec.description} 
            director={rec.director} 
            cast={rec.cast}
            img={rec.image}
            genre={rec.listed_in}
            page={"recs"}/>
        </span>
      ))
      :""}
      </div>
    </div>
  )
}
