import { createMemo } from "solid-js";

export const WeatherCard = (props) => {
  const weather = createMemo(() => props.data.weatherData);
  const geo = createMemo(() => props.data.geoData);

  let lat = geo()[0].lat
  let lon = geo()[0].lon
  lat = lat.toFixed(2)
  lon = lon.toFixed(2)  

  const formatTime = (unixTime) =>{
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString([],{
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div class="flex flex-col w-80 gap-4 p-2">
      {/* Row 1 */}
      <div class="flex justify-between">
        <div class="flex flex-col items-center justify-evenly">
          <h2 class="text-2xl font-bold text-white/90">{geo()[0].name}</h2>
          <div class="flex gap-2.5">
            <p class="text-sm text-white/70 italic font-semibold">{lat}°N</p>
            <p class="text-sm text-white/70 italic font-semibold">{lon}°E</p>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center">
          <img src={`https://openweathermap.org/img/w/${weather().weather[0].icon}.png`} alt="" />
          <p class="w-25 text-center text-wrap text-xs text-white/70 italic font-bold">
            {weather().weather[0].description}
          </p>
        </div>
      </div>

      {/* Row 2 */}
      <div class="flex flex-col self-center items-center gap-2">
        <h1 class="text-6xl text-white/90 font-black">
          {Math.floor(weather().main.temp)}°C
        </h1>
        <p class="text-sm text-white/70 italic">
          Feels like {Math.floor(weather().main.feels_like)}°C
        </p>
        <div class="flex gap-3">
          <p class="text-sm text-white/90">
            Max {Math.floor(weather().main.temp_max)}°C
          </p>
          <p class="text-sm text-white/90">
            Min {Math.floor(weather().main.temp_min)}°C
          </p>
        </div>
      </div>

      {/* Row 3 */}
      {/* Humidity */}
      <div class="flex justify-between items-center">
        <div class="flex flex-col items-center">
          <p class="text-base text-white/90">Humidity</p>
          <p class="text-xs text-white/80 italic">{weather().main.humidity}%</p>
        </div>

        {/* Wind */}
        <div class="flex items-center gap-2">
          <div class="flex flex-col">
            <p class="text-base text-white/90">Wind</p>
            <p class="text-xs text-white/80 italic">{weather().wind.speed} m/s</p>
          </div>

          <div class="relative w-15 h-15 flex items-center justify-center border-2 border-white/60 rounded-[50%]">
            {/* Compass */}
            <div class="absolute text-white/70 text-xs w-full h-full flex items-center justify-center">
              <span class="absolute top-0">N</span>
              <span class="absolute right-0.5">E</span>
              <span class="absolute bottom-0">S</span>
              <span class="absolute left-0.5">W</span>
            </div>

            {/* Arrow */}
            <svg
              class="absolute w-6 h-6 transition-transform"
              style={{ transform: `rotate(${weather().wind.deg}deg)` }}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M12 2 L16 10 H13 V22 H11 V10 H8 Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>

      {/* Row 4 */}
      <div class="flex justify-between px-1">
        <div class="flex flex-col items-center">
          <p class="text-base text-white/90">Sunrise</p>
          <p class="text-xs text-white/80 italic">{formatTime(weather().sys.sunrise)}</p>
        </div>
        <div class="flex flex-col items-center">
          <p class="text-base text-white/90">Sunset</p>
          <p class="text-xs text-white/80 italic">{formatTime(weather().sys.sunset)}</p>
        </div>
      </div>
    </div>
  );
};
