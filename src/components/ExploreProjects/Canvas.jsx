
import React from 'react';



export const Canvas = (props) => {
    return (
      <svg 
      viewBox={props.viewBox}
      style={{
        border: "2px solid gold"
      }} />
    )
  }