import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type WeatherChartProps = {
  data: { time: string; temperature: number }[];
  title: string;
  error?: string | null;
};

export const WeatherChart = ({
  data,
  title,
  error,
  loading,
}: WeatherChartProps & { loading: boolean }) => {
  return (
    <div className="chart-container">
      <h3>{title}</h3>
      {loading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="time" />
            <YAxis unit="°C" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#007bff"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
