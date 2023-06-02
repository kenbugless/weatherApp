import React from 'react'
import { Button } from 'react-bootstrap';
 

const WeatherButton = ({cities,setCity}) => {
  console.log(cities)


  return (
    <div>
        <Button variant="warning">Current Location</Button>{' '}
        
        {cities.map((item,index)=>(
          <Button variant="warning" onClick={()=>setCity(item)}>{item}</Button>
        ))}
    </div>
  )
}

export default WeatherButton


//map함수 사용q