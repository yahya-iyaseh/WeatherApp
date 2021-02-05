// to get the form with form tag because we have one form in project
const form = document.querySelector('form');
// to get the card div with card class 
const card = document.querySelector('.card');
// to get the details div with details class
const details = document.querySelector('.details');
// to get the img(for day and night)
const time = document.querySelector('img.time');
// to get the img(for icon)
const icon = document.querySelector('.icon img');

//for update the form details and data  
const updateUi = (data) =>{
 //to get the data for city details and weather 
   // const cityDets = data.cityDetalis;
   // const weather = data.weather;

   const {cityDetalis, weather} = data;
   // update the template
   details.innerHTML = `
     <h5 class="my-3">${cityDetalis.EnglishName}</h5>
   <div class="my-3">${weather.WeatherText}</div>
     <div class="display-4 my-4">
         <span>${weather.Temperature.Metric.Value}</span>
         <span>&deg;C</span>
      </div>
    </div>
   `; 
   // set the icon based on the WeatherIcon from the api 
   const imgsrc = `icons/${weather.WeatherIcon}.svg`;
   let timeScr = null;
   
 
   // if(weather.IsDayTime){
   //   timeScr = 'icons/day.svg';
   // } else{
   //  timeScr= 'icons/night.svg';
   // }
   // decide the img(day or night) based in IsDayTime from the api
    timeScr = weather.IsDayTime ?  'icons/day.svg' : 'icons/night.svg';
// set the imgs for the img(src) in the form
   icon.setAttribute('src', imgsrc);
   time.setAttribute('src', timeScr);

    if(card.classList.contains('d-none')){
     card.classList.remove('d-none');
     console.log('dont fuck me');
    }
   
}

// to call finction getCity and getWeather from forecast.js to get the data about the city that we pass her name 
const updateCity = async city =>{

    const cityDetalis = await getCity(city);
    const weather = await getWeather(cityDetalis.Key);
    
   return {cityDetalis, weather};
 };
// add eventListner to the form when we submit the form 
form.addEventListener('submit', e => {
 // let us in the same page when we submit
 e.preventDefault();

 // to get city name and trim any space from firt and last of the string
 const city = form.city.value.trim();

 // to reset the form input (delete the value that we put it in the input)
 form.reset();
 //call updateCity and passes the name that we take it from the input 
 updateCity(city)
 .then(data => {
// call the updateUi function that responsible to replace the form data and details
  updateUi(data);
  
 })
 .catch(err => console.log(err));

  // store city in local Storage
  localStorage.setItem('city',city);
});
// if we have a city in the local Storage we update the page without 
// have user to enter city names
if(localStorage.getItem('city')){
  updateCity(localStorage.getItem('city'))
  .then(data => updateUi(data))
  .catch(err => console.log(err));
}