import React from 'react';

import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "a4f8274d174ed95781bf495f6bc1f3f3";

class App extends React.Component {
    state={
      temperature: undefined,
      city:undefined,
      country:undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    }
  getWeather = async (e)=>{
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if(city && country){
      console.log(data);
      this.setState({
        temperature: data.main.temp ,
        city: data.name,
        country: data.sys.country ,
        humidity: data.main.humidity ,
        description: data.weather[0].description ,
        error: ""
      });
    } else{
      this.setState({
        temperature: undefined ,
        city: undefined,
        country: undefined ,
        humidity: undefined ,
        description: undefined ,
        error: "Please enter the value"
      });
  }
}
render() {
  return (
    <div>
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-md-5 title-container">
                <Title />
              </div>
              <div className="col-md-7 form-container">
                <Form getWeather={this.getWeather} />
                <Weather 
                  temperature={this.state.temperature} 
                  humidity={this.state.humidity}
                  city={this.state.city}
                  country={this.state.country}
                  description={this.state.description}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
};



export default App;
