import React, { useRef,useEffect } from "react";

const Canvas = ({height,width}) =>{
  const canvasRef = useRef(null);
  const PreviousPoint = useRef(null);
  const IsDrawing = useRef(false);
  const mouseMoveRef = useRef(null);
  useEffect(() => {
    if(canvasRef.current){
      initMousemoveEvent();
    }
    return ()=>{
      if(mouseMoveRef.current){
        window.removeEventListener('mousemove',mouseMoveRef);
      }
    }
  }, [])
  function Draw (start,end,ctx,color,width) {
    start = start?? end ;
    //draw line
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle= color;
    ctx.moveTo(start.x,start.y);
    ctx.lineTo(end.x,end.y);
    ctx.stroke();

    //draw arc
    ctx.beginPath();
    ctx.fillStyle='#00000';
    ctx.arc(start.x,start.y,2,0,2*Math.PI);
    ctx.fill();
  }
  function initMousemoveEvent(){
    const EventHandler = (e) =>{
      if(!IsDrawing.current){return;}
      const CurrPos = calcRectPos(e.clientX,e.clientY);
      console.log(CurrPos.x,CurrPos.y);
      const ctx = canvasRef.current.getContext('2d');
      Draw(PreviousPoint.current,CurrPos,ctx,'#00000',5);
      PreviousPoint.current= CurrPos;
    }
    mouseMoveRef.current= EventHandler;
    window.addEventListener('mousemove',EventHandler);
  }
  function calcRectPos (clientX,clientY) {
    const pos = canvasRef.current.getBoundingClientRect();
    const x = clientX-pos.left;
    const y = clientY - pos.top;
    return {x,y};
  }
  function handleMouseDown(){
    IsDrawing.current= true;
  }
  function handleMouseup(){
    IsDrawing.current= false;
    PreviousPoint.current= null;
  }
  return (
    <canvas 
    height={height}
    width={width}
    className='style-canvas'
    ref={canvasRef}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseup}
    >
    </canvas>
  )
}

export default Canvas;
