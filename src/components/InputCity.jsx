import { TextBox } from "../components/TextBox";
import { WeatherCard } from "./WeatherCard";
import { Button } from "../components/Button";
import { createSignal, Show } from "solid-js";

export const InputCity = () => {
  const [city, setCity] = createSignal("");
  const [weatherData, setWeatherData] = createSignal();

  const [bg, setBg] = createSignal(
    "linear-gradient(315deg,#c2d7f5,#99b3d7,#86b0ea,#6ba0eb,#5798f2,#6ba0eb,#86b0ea,#99b3d7,#c2d7f5)",
  );

  const setBackground = (main, icon) => {
    const day = icon.slice(-1) === "d" ? "day" : "night";
    const backgrounds = {
      Clear: `../assets/${day}/clear-${day}.webp`,
      Clouds: `../assets/${day}/cloudy-${day}.webp`,
      Snow: `../assets/${day}/snowy-${day}.webp`,
      Rain: `../assets/${day}/rainy-${day}.webp`,
      Haze: `../assets/${day}/hazy-${day}.webp`,
    };

    setBg(
      `url(${backgrounds[main] || "linear-gradient(315deg,#c2d7f5,#99b3d7,#86b0ea,#6ba0eb,#5798f2,#6ba0eb,#86b0ea,#99b3d7,#c2d7f5)"})`,
    );
  };

  const getCoordinates = async () => {
    if (city() === "") {
      alert("Please enter some value");
      return;
    }

    try {
      const res = await fetch("/api/getWeather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: city(),
        }),
      });
      const data = await res.json();
      setWeatherData(data);

      setBackground(
        data.weatherData.weather[0].main,
        data.weatherData.weather[0].icon,
      );
    } catch (error) {
      console.log(error);
    }
    setCity("");
  };

  return (
    <div
      style={{
        "background-image": bg(),
        "background-size": "cover",
        "min-height": "100dvh",
        "background-position": "center",
      }}
    >
      <div
        style="-webkit-backdrop-filter: blur(8px);"
        class="flex flex-col justify-around items-center p-2 px-3.5 mx-auto relative top-[7dvh] backdrop-blur-sm bg-white/20 rounded-xl h-fit w-fit shadow-[2px_2px_10px_#ffffff38] border border-white/5"
      >
        <h2 class="text-2xl font-bold m-3 text-[#ffffff]">Weather App</h2>
        <TextBox
          value={city()}
          onInput={(e) => setCity(e.target.value)}
          id="city"
          type="text"
          placeholder="Location name..."
          className="p-1.5 w-72 m-3 rounded border border-gray-200 placeholder-white/80 outline-none text-[#e9e9e9]"
        />
        <Button
          onClick={getCoordinates}
          btnText="Check the Sky"
          className="cursor-pointer bg-[#24a4ff9e] px-5 py-2 m-3 rounded-md backdrop-blur-sm text-[#e9e9e9] hover:shadow-[1px_1px_10px_#55b5f9d1]"
        />
        <Show when={weatherData()}>
          <WeatherCard data={weatherData()} />
        </Show>
      </div>
    </div>
  );
};
