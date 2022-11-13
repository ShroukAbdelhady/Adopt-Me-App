import { ReactElement, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props ={
  children : ReactElement;
}

const Modal = ({children}:Props)=>{
    
    const eleRef = useRef<HTMLElement|null>(null);

    if(!eleRef.current){
    eleRef.current = document.createElement('div');
    }

    useEffect(()=> {
    const modalRoot = document.getElementById('modal');
    if(modalRoot && eleRef.current){
    modalRoot.appendChild(eleRef.current);
    }
    return()=>{
      if(modalRoot && eleRef.current){
        modalRoot.removeChild(eleRef.current);
      }
    } 
    }, []);

  return createPortal(children,eleRef.current);
};

export default Modal;