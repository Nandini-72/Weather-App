/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "21c11a46046202cb19b382708340d313";
// Create a new date instance dynamically with JS
let d = new Date();
let i = d.getMonth() + 1;
let newDate = i +'.'+ d.getDate()+'.'+ d.getFullYear();

const cityElem = document.getElementById("city");
const feelingsElem = document.getElementById("feelings");
const generateBtn = document.getElementById("generate");

const getWeatherInfo = async (q)=>{
    return await fetch(`${baseUrl}?q=${q}&units=metric&APPID=${apiKey}`);

}

const takeEntry = async ({ temperature, date, feeling ,imgIcon}) =>
    await fetch("/api/v1/entry", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ temperature, date, feeling,imgIcon })
    });

const updateUI = async () => {
      const request = await fetch('/api/v1/entry');

      try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = 'Date: ' + allData.date;
        document.getElementById('temp').innerHTML = 'Temperature: ' + allData.temperature;
        document.getElementById('content').innerHTML = 'Note: ' + allData.userResponse;
        icon = allData.imgIcon
        document.getElementById("icon").src = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      } catch (error) {
        console.log("error", error);
      }
    };

generateBtn.addEventListener('click',async ()=>{
    generateBtn.textContent = "Loading";
    const city = cityElem.value;
    const feeling = feelingsElem.value;
    try{
    const res = await getWeatherInfo(city);
    const weatherData = await res.json();
    const data = {
      temperature: weatherData.main.temp,
      date: newDate,
      feeling: feeling,
      imgIcon:weatherData.weather[0].icon
    }
    await takeEntry(data);
    await updateUI();
  }
  catch(err){
    alert("You entered wrong city");

    document.getElementById('date').innerHTML = 'Date: '  ;
    document.getElementById('temp').innerHTML = 'Temperature: '  ;
    document.getElementById('content').innerHTML = 'Note: ' ;
  }
    generateBtn.textContent = "Generate";
})
