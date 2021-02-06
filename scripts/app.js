const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const forecast = new Forecast();
const updateUi = (data) =>{

   const {cityDetalis, weather} = data;
   details.innerHTML = `
     <h5 class="my-3">${cityDetalis.EnglishName}</h5>
   <div class="my-3">${weather.WeatherText}</div>
     <div class="display-4 my-4">
         <span>${weather.Temperature.Metric.Value}</span>
         <span>&deg;C</span>
      </div>
    </div>
   `; 
   const imgsrc = `icons/${weather.WeatherIcon}.svg`;
   let timeScr = null;
   
 
    timeScr = weather.IsDayTime ?  'icons/day.svg' : 'icons/night.svg';
   icon.setAttribute('src', imgsrc);
   time.setAttribute('src', timeScr);

    if(card.classList.contains('d-none')){
     card.classList.remove('d-none');
     console.log('dont fuck me');
    }
   
}


form.addEventListener('submit', e => {
 e.preventDefault();

 const city = form.city.value.trim();

 form.reset();
 forecast.updateCity(city)
    .then(data => updateUi(data))
    .catch(err => console.log(err));

  localStorage.setItem('city',city);
});
if(localStorage.getItem('city')){
  forecast.updateCity(localStorage.getItem('city'))
  .then(data => updateUi(data))
  .catch(err => console.log(err));
}