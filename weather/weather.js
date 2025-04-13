const weather = document.querySelector(".weather");
const inpCity = document.querySelector(".city");
const  container = document.querySelector(".container");
const apiKey ="39d34ac4058165b8ccc9ab99219dc3e6";

weather.addEventListener("submit", async event=>{

    event.preventDefault();
    
    const city = inpCity.value;
    if(city){

        try{
            const weatherData = await getData(city);
            info(weatherData);

        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Enter a city.");
    }

});

async function getData(city){

   const apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ apiKey}`; 
   const response = await fetch(apiCity);
  
   if(!response.ok){
    throw new Error("Could not fetch weather data");
   }
   return await response.json();
}

function info(data){

    const{name: city,
         main:{temp, humidity},
         weather: [{description, id}]} = data;

         container.textContent = "";
         container.style.display = "flex";

         const myH1 = document.createElement("h1");
         const myTemp = document.createElement("p");
         const myHumid = document.createElement("p");
         const myDesc = document.createElement("p");
         const myEmoji = document.createElement("p");

         myH1.textContent = city;
        myTemp.textContent = `${(temp -273.15).toFixed(1)}°C`;
        myHumid.textContent = `Humidity:${humidity}%`;
        myDesc.textContent = description;
        myEmoji.textContent = emoji(id);

        
         myH1.classList.add("h1");
        myTemp.classList.add("myTemp");
        myHumid.classList.add("myHumid");
        myDesc.classList.add("myDesc");
        myEmoji.classList.add("myEmoji");

         container.appendChild(myH1);
         container.appendChild(myTemp);
         container.appendChild(myHumid);
         container.appendChild(myDesc);
         container.appendChild(myEmoji);


     

}

function emoji(weatherId){

    switch(true){
        case(weatherId >=200 && weatherId <300):
        return "⛈️";

        case(weatherId >=300 && weatherId <400):
        return "🌧️";

        case(weatherId >=500 && weatherId <600):
        return "🌧️";

        case(weatherId >=600 && weatherId <700):
        return "❄️";

        case(weatherId >=700 && weatherId <800):
        return "🌁";

        case(weatherId === 800):
        return "☀️ ";

        case(weatherId >=801 && weatherId <810):
        return "🌫️";

        default :
        return "";

    }





}

function displayError(error){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = error;
    errorDisplay.classList.add("myError");
    
    container.textContent="";
    container.style.display = "flex";
    container.appendChild(errorDisplay);
}