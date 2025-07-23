import { CityWeather } from "./components/CityWeather";
import { TimeRangeSelector } from "./components/TimeRangeSelector";
import "./styles.css";
import { useState } from "react";

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
        {cities.map((city) => (
          <CityWeather
            key={city.name}
            name={city.name}
            latitude={city.latitude}
            longitude={city.longitude}
            hours={hours}
          />
        ))}
      </div>
    </div>
  );
}
