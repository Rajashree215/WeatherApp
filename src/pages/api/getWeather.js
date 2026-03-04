export const prerender = false;

export const POST = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const API_KEY = import.meta.env.WEATHER_API_KEY;

    const body = await request.json();
    const city = body.city;

    //Gecoding part
    try {
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`,
      );
      const geoData = await geoResponse.json();
      if (!geoData.length) {
        return new Response(JSON.stringify({ error: "City not found" }), {
          status: 404,
        });
      }
      const lat = geoData[0].lat;
      const lon = geoData[0].lon;

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      );
      const weatherData = await weatherResponse.json();

      return new Response(
        JSON.stringify({
          geoData: geoData,
          weatherData: weatherData,
        }),
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: `Error getting Weather data ${error}`,
        }),
      );
    }
  }

  return new Response(null, { status: 400 });
};
