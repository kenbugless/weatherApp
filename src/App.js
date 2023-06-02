import './App.css';
import { useEffect,useState } from 'react';
import WeatherBox from './components/WeatherBox'; 
import WeatherButton from './components/WeatherButton';
import 'bootstrap/dist/css/bootstrap.min.css';  /* 부트스트랩 css 가져옴 */
import ClipLoader from "react-spinners/ClipLoader";



//1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다.=> 앱이 실행되자마자, useEffect()(처음 짝 mount,update 될때 실행이 된다.)
//2. 날씨 정보에는 도시, 섭씨 화씨 날씨 상태
//3. 5개의 버튼이 있다.(1개는 현재위치, 4개는 다른 도시)
//4. 도시 버튼을 클릭할 때 마다 도시별 날씨가 나온다.
//5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
//6. 데이터를 들고오는 동안, 로딩 스페너가 돈다.

//실행 되자마자, 바로 useEffect-> getCurrentLocation ->  getWeeatherByCurrentLocation을 호출 => 

  function App() {

    const [city,setCity] =useState('')
    const [loading,setLoading]=useState(false);

/* ui가 렌더링 후에 작동을 함 return 뒤에 값 */
    useEffect(()=>{ 
      if(city ==='') {
        getCurrentLocation();
      }  else {
        getWeatherByCity();
      }
    }, [city]) /* []안에 아무것도 안주면, 렌더후 바로 발동한다. []가 비웠으면, api를 일반적으로 불러온다고 생각하기!=> componentDidMount  */


    const getCurrentLocation = () => {
      //현재 위치를 가져와야 된다. getCurrentLocation javascript =>
      //https://www.w3schools.com/jsref/met_geo_getcurrentposition.asp
      navigator.geolocation.getCurrentPosition((position)=>{
        let lat = position.coords.latitude ;
        let lon = position.coords.longitude;
        getWeatherByCurrentLocation(lat,lon);
      });
    };
  
    const getWeatherByCurrentLocation = async (lat,lon) => {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2606baed16756e84ecab9c23d346ee4f&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data); //데이터가 왔을 때 data가 들어간다.
      setLoading(false);
    };
  

    const [weather,setWeather] =useState(null); /* 처음 값은 모르므로, null이라고 넣음 */
    const cities = ['paris','new york','tokyo','seoul'];
  


  /*   useEffect(()=>{
      getWeatherByCity()
    },[city]) */
    
    const getWeatherByCity = async() => {
      setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2606baed16756e84ecab9c23d346ee4f&units=metric` //{city}는 state다. useEffect후에 호출하는 것이니, 비동기, 기다림 필요 x
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data); //에러가 나는 이유는, useEffect(getWeatherByCity)는 array값이 있다면은 바뀔때마다 실행이 된다. //city처음 값이 ''이기 때문에 계속 에러가 난다. useEffect를 하나로 합쳐야 한다.
    setLoading(false);




  }

  return (
    <div>
      {loading ? <ClipLoader color="#f88c6b" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader"/> :   <div className="container"> 
      <WeatherBox weather={weather}/>
      <WeatherButton cities={cities} setCity={setCity}/>  </div>}
    </div>
  );
}

export default App;
