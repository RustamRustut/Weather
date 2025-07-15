type TimeRangeSelectorProps = {
  value: number;
  onChange: (hours: number) => void;
};

export const TimeRangeSelector = ({ value, onChange }: TimeRangeSelectorProps) => {
  return (
    <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
      <option value={6}>6 часов</option>
      <option value={12}>12 часов</option>
      <option value={24}>1 день</option>
      <option value={72}>3 дня</option>
      <option value={168}>7 дней</option>
    </select>
  );
};
