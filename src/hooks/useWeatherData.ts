import { useEffect, useState } from "react";
import { fetchTemperature } from "../utils/fetchWeather";

export const useWeatherData = (
  latitude: number,
  longitude: number,
  hours = 24
) => {
  const [data, setData] = useState<{ time: string; temperature: number }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    fetchTemperature(latitude, longitude, hours)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoad(false));
  }, [latitude, longitude, hours]);

  return { data, error, loading };
};
