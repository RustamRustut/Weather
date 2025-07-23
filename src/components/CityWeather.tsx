import { useWeatherData } from "../hooks/useWeatherData";
import { WeatherChart } from "./WeatherChart";

export const CityWeather = ({
  name,
  latitude,
  longitude,
  hours,
}: {
  name: string;
  latitude: number;
  longitude: number;
  hours: number;
}) => {
  const { data, error, loading } = useWeatherData(latitude, longitude, hours);

  return (
    <WeatherChart title={name} data={data} error={error} loading={loading} />
  );
};
