import React from 'react'

const WeatherBox = ({weather}) => {
    console.log(weather) /* console을 안찍으면 확인이 어려워서 켜놓아야 되는듯 */
  return (
    <div className ="weather-box">
          <div>{weather&& weather.name}</div>
        <h2>{weather?.main.temp}C/{weather?.main.temp*8/5+32}F</h2>
        <h3>{weather?.weather[0].description}</h3>

    </div>
  )
}

export default WeatherBox