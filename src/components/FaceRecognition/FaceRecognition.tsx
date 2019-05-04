import React from 'react';
import './FaceRecognition.css';
import {IBoxes} from '../../App'

const FaceRecognition = ({ imageUrl, boxes }:{imageUrl:string, boxes:[IBoxes]}) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
        {boxes.map((box, i)=> {
        	return  <div className='bounding-box' key={i} style={{top: box.topRow, right: box.rightCol, 
        	bottom: box.bottomRow, left: box.leftCol}}></div>
        	})}
      </div>
    </div>
  );
}

export default FaceRecognition;
