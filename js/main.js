const form = document.querySelector('#testDataForm')
console.log(form)

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let query_zipcode = document.querySelector('#zipcode').value 
    load_data(query_zipcode)
    console.log(event)
})

const getData = async (zipcode) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=0516224ab7f106c970f4298bf462e246&units=imperial`)
    console.log(response.data)
    return response.data
}

const DOM_Elements = {
    weather_list: '.weather-list'
}

const create_list = (zipcode, high, low, forecast, humidity) => {
    const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" zipcode="${zipcode}"> ${zipcode}</a>`;
    const html2 = `<div class="card" style="width: 30%" id="high">
    <div class="card-header" >
      High Temp (°F)
    </div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>${high}</p>
      </blockquote>
    </div>
  </div>
  <br>
  <div class="card" style="width: 30%", id="low">
    <div class="card-header">
      Low Temp (°F)
    </div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>${low}</p>
      </blockquote>
    </div>
  </div>
  <br>
  <div class="card" style="width: 30%", id="forecast">
    <div class="card-header">
      Forecast
    </div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>${forecast}</p>
      </blockquote>
    </div>
  </div>
  <br>
  <div class="card" style="width: 30%", id="humidity">
    <div class="card-header">
      Humidity (%)
    </div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>${humidity}</p>
      </blockquote>
    </div>
  </div>`
  document.querySelector(DOM_Elements.weather_list).insertAdjacentHTML('beforeend', html2)
}

const load_data = async (query_zipcode) => {
    const results = await getData(query_zipcode);
    
    create_list(
        results.zipcode,
        results.main.temp_max,
        results.main.temp_min,
        results.weather[0].description,
        results.main.humidity)
}

const clear_data = async () =>{
  window.location.reload() 
}

