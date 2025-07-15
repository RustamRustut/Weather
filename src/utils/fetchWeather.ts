import axios from "axios";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

type HourlyData = {
  time: string[];
  temperature_2m: number[];
};

type ApiResponse = {
  hourly: HourlyData;
};

type TemperatureEntry = {
  time: string;
  temperature: number;
};

export const fetchTemperature = async (
  latitude: number,
  longitude: number,
  hours: number = 24
): Promise<TemperatureEntry[]> => {
  try {
    const now = new Date();
    const past = new Date(now.getTime() - hours * 60 * 60 * 1000);

    const response = await axios.get<ApiResponse>(BASE_URL, {
      params: {
        latitude,
        longitude,
        hourly: "temperature_2m",
        start: past.toISOString(),
        end: now.toISOString(),
        timezone: "auto",
      },
    });

    const data = response.data.hourly;

    const raw: { time: Date; temperature: number }[] = data.time.map(
      (t, i) => ({
        time: new Date(t),
        temperature: data.temperature_2m[i],
      })
    );

    if (hours > 24) {
      const grouped: Record<string, number[]> = {};
      raw.forEach(({ time, temperature }) => {
        const day = time.toISOString().split("T")[0];
        if (!grouped[day]) grouped[day] = [];
        grouped[day].push(temperature);
      });

      return Object.entries(grouped).map(([day, temps]) => ({
        time: new Date(day).toLocaleDateString(),
        temperature: +(temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(
          1
        ),
      }));
    }

    return raw.map(({ time, temperature }) => ({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      temperature,
    }));
  } catch {
    throw new Error("Ошибка при получении данных с OpenMeteo API");
  }
};
