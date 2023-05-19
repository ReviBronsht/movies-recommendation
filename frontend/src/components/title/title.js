import './title.css';

export default function Title({img, title, description, director, cast,genre,rownum,page}) {
  return (
    <div className="title-contianer">
      <img className="title-img" src={img? img : "/img/noimg.jpg"} alt="poster"/>
      <div className='title-details'
      >
        <h3 className='title2' style={{margin:"8px"}}>{title}</h3>
        <span style={{fontSize:"95%"}}>{director}</span>
        <br/>
        <span style={{fontSize:"80%"}}>{cast}</span>
        <br/>
        <br/>
        <span style={{fontSize:"95%"}}>{description}</span>
        <br/>
        <span style={{fontSize:"95%"}}>{genre}</span>
      </div>
    </div>
  )
}
