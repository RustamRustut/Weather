/* eslint-disable react-hooks/rules-of-hooks */
import "./styles.css";
import { useState } from "react";
import { TimeRangeSelector } from "./components/TimeRangeSelector";
import { WeatherChart } from "./components/WeatherChart";
import { useWeatherData } from "./hooks/useWeatherData"; // подключаем хук

const cities = [
  { name: "Амстердам", latitude: 52.3676, longitude: 4.9041 },
  { name: "Нью-Йорк", latitude: 40.7128, longitude: -74.006 },
  { name: "Токио", latitude: 35.6762, longitude: 139.6503 },
];

export function App() {
  const [hours, setHours] = useState(24);

  return (
    <div>
      <div style={{ textAlign: "center", margin: "1rem" }}>
        <TimeRangeSelector value={hours} onChange={setHours} />
      </div>
      <div className="container">
        {cities.map((city) => {
          const { data, error, loading } = useWeatherData(
            city.latitude,
            city.longitude,
            hours
          );

          return (
            <WeatherChart
              key={city.name}
              title={city.name}
              data={data}
              error={error}
              loading={loading}
            />
          );
        })}
      </div>
    </div>
  );
}
