import { useState, useEffect } from "react";
import Canvas from "./components/canvas";

function App() {
  const [urlId,setUrlId] = useState('');
  const [val,setVal] = useState('https://www.youtube.com/watch?v=Ke90Tje7VS0&ab_channel=ProgrammingwithMosh');
  const handleVideo = () =>{ 
    let paramIdx = val.lastIndexOf('?');
    const params = val.slice(paramIdx+1);
    let Url = new URLSearchParams(params);
    for(var param of Url.entries()){
      if(param[0]==='v'){
        setUrlId(param[1]);
      }
      // console.log(param[0],param[1]);
    }
  }
  const handleSubmit = (event) =>{
    event.preventDefault();
    handleVideo()
  }
  useEffect(() => {
    handleVideo();
  }, [])
  
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input onChange={(e) => setVal(e.target.value)} className="search-bar" placeholder="Enter URL" type='text' />
        <button className="btn" type='submit' >Search</button> 
      </form> 
      <section className="section">
        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${urlId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <Canvas
          height= "600px"
          width= "522px"
        />
      </section>
    </div>
  );
}


export default App;