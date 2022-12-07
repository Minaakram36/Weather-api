// https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=cairo&days=3


//today references
let today = document.getElementById("today");
let todaydate= document.getElementById("today-date");
let todaylocation =document.getElementById("location");
let todaydegree =document.getElementById("today-degree");
let todayicon =document.getElementById("today-icon");
let todaydesciption=document.getElementById("today-description");
let todayhumidity =document.getElementById("humidty");
let todaywind =document.getElementById("wind");
let todaycompass =document.getElementById("compass");

//nextday class references

let nextday=document.getElementsByClassName("nextDay");
let nextdayicon=document.getElementsByClassName("nextDay-icon");
let nextdaymaxdegree=document.getElementsByClassName("max-degree");
let nextdaymindegree=document.getElementsByClassName("min-degree");
let nextdaydescription=document.getElementsByClassName("nextDay-description");


let response;
let data;

monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'],
   days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];

async function getdatafromapi(location="cairo"){
    response=  await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${location}&days=3`);
    data= await response.json();
    
    console.log(data);
    if (data.error)
    return;

   displayTodayWeather();
   displayNextDayWeather();
};
getdatafromapi();

function displayTodayWeather(){
    let date= new Date();
today.innerHTML=days[date.getDay()];
todaydate.innerHTML=`${date.getDate()} ${monthName[date.getMonth()]}`;
todaylocation.innerHTML=data.location.name;
todaydegree.innerHTML=data.current.temp_c;
todayicon.setAttribute("src",`http:${data.current.condition.icon}`)
todaydesciption.innerHTML=data.current.condition.text;
todayhumidity.innerHTML=data.current.humidity;
todaywind.innerHTML=data.current.wind_kph;
todaycompass.innerHTML=data.current.wind_dir;
};

function displayNextDayWeather(){
    for (let i = 0; i < 2; i++) {
        nextday[i].innerHTML=days[new Date(data.forecast.forecastday[i+1].date).getDay()];
        nextdayicon[i].setAttribute("src",`http:${data.forecast.forecastday[i+1].day.condition.icon}`)
        nextdaymaxdegree[i].innerHTML=data.forecast.forecastday[i+1].day.maxtemp_c;
        nextdaymindegree[i].innerHTML=data.forecast.forecastday[i+1].day.mintemp_c;
        nextdaydescription[i].innerHTML=data.forecast.forecastday[i+1].day.condition.text;
    }
 
};

   

let search=document.getElementById("search").addEventListener('keyup',function(){
    getdatafromapi(this.value);
});

