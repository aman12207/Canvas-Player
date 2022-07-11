import { useEffect, useRef } from "react"

export function useOnDraw() {
  const canvasRef = useRef(null);
  let isDrawingRef = false;
  const MousemoveRef = useRef (null);
  const MouseupRef = useRef (null);
  const MousedownRef = useRef (null);
  const PreviousPointRef = useRef(null);

  useEffect(()=>{
    return ()=>{
      if(MouseupRef.current){
        window.removeEventListener('mouseup',MouseupRef);
      }
      if(MousedownRef.current){
        window.removeEventListener('mousedown',MousedownRef);
      }
      if(MousemoveRef.current){
        window.removeEventListener('mousemove',MousedownRef);
      }
    }
  },[])

  function getRef(ref) {
    if(!ref){
      return;
    }
      canvasRef.current = ref;
      initMousedownEvent();
      initMouseupEvent();
      initMousemoveEvent();
  }
  function drawLine(start,end,ctx,color,width){
    //for line
    start = start?? end ;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle= color;
    ctx.moveTo(start.x,start.y);
    ctx.lineTo(end.x,end.y);
    ctx.stroke();

    //for circle
    ctx.beginPath();
    ctx.fillStyle='#000000';
    ctx.arc(start.x,start.y,2,0,2*Math.PI)    // 2*Math.PI = 360 degree
    ctx.fill();
  }
  function initMousemoveEvent(){
    const handlemouseEvent = (e) =>{
        if(isDrawingRef){
        const{x,y} = actualPositionInCanvas(e.clientX, e.clientY);
        const ctx = canvasRef.current.getContext('2d');
        drawLine(PreviousPointRef.current,{x,y},ctx,'#00000',5)
        console.log(x,y);
        PreviousPointRef.current= {x,y};
      }
    }
    window.addEventListener("mousemove",handlemouseEvent)
  }

  function initMousedownEvent(){
    const listener = ()=> {
      isDrawingRef=true
    }
    window.addEventListener('mousedown',listener)
    MousedownRef.current= listener;
  }
  
  function initMouseupEvent(){
    const listener = ()=>{
      isDrawingRef=false;
      PreviousPointRef.current= null;
    }
    window.addEventListener('mouseup',listener)
    MouseupRef.current = listener;
  }

  function actualPositionInCanvas (clientX,clientY){
    const pos = canvasRef.current.getBoundingClientRect();
    const x = clientX-pos.left;
    const y = clientY-pos.top;
    return{
      x,y
    }
  }
  return getRef;
}