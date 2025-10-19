import { CChart } from "@coreui/react-chartjs";

const MyBarChart = ({
  data = [],
  xKey = "label",
  yKeys = [],
  labels = [],
  colors = [],
  title = "",
}) => {
  if (!data || data.length === 0) {
    return <p>Không có dữ liệu</p>;
  }

  const xLabels = data.map((item) => item[xKey]);

  const datasets = yKeys.map((key, index) => ({
    label: labels[index] || key,
    backgroundColor: colors[index] || "#007bff",
    data: data.map((item) => item[key]),
  }));

  const chartData = { labels: xLabels, datasets };

  const options = {
    plugins: {
      legend: { display: true, position: "top" },
      title: title
        ? {
            display: true,
            text: title,
          }
        : undefined,
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  return <CChart type="bar" data={chartData} options={options} />;
};

export default MyBarChart;
