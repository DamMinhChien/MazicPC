import React from "react";
import CIcon from "@coreui/icons-react";
import { cilArrowTop, cilArrowBottom, cilOptions } from "@coreui/icons";
import {
  CWidgetStatsA,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";
import { CChartLine, CChartBar } from "@coreui/react-chartjs";

export default function DashboardWidget({
  color = "primary",
  title = "Widget title",
  value = "$0",
  percent = 0,
  trend = "up", // "up" | "down"
  chartType = "line", // "line" | "bar"
  chartData = [],
  chartColor = "rgba(255,255,255,.55)",
}) {
  const TrendIcon = trend === "up" ? cilArrowTop : cilArrowBottom;

  const chartElement =
    chartType === "line" ? (
      <CChartLine
        className="mt-3 mx-3"
        style={{ height: "70px" }}
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          datasets: [
            {
              backgroundColor: "transparent",
              borderColor: chartColor,
              pointBackgroundColor: chartColor,
              data: chartData,
            },
          ],
        }}
        options={{
          plugins: { legend: { display: false } },
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: { display: false },
              ticks: { display: false },
              border: { display: false },
            },
            y: {
              grid: { display: false },
              ticks: { display: false },
              border: { display: false },
            },
          },
          elements: {
            line: { borderWidth: 1, tension: 0.4 },
            point: { radius: 3, hitRadius: 10, hoverRadius: 4 },
          },
        }}
      />
    ) : (
      <CChartBar
        className="mt-3 mx-3"
        style={{ height: "70px" }}
        data={{
          labels: Array(chartData.length).fill(""),
          datasets: [
            {
              backgroundColor: "rgba(255,255,255,.2)",
              borderColor: chartColor,
              data: chartData,
              barPercentage: 0.6,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              grid: { display: false },
              ticks: { display: false },
              border: { display: false },
            },
            y: {
              grid: { display: false },
              ticks: { display: false },
              border: { display: false },
            },
          },
        }}
      />
    );

  return (
    <CWidgetStatsA
      className="mb-4"
      color={color}
      value={
        <>
          {value}{" "}
          <span className="fs-6 fw-normal">
            ({percent}% <CIcon icon={TrendIcon} />)
          </span>
        </>
      }
      title={title}
      action={
        <CDropdown alignment="end">
          <CDropdownToggle color="transparent" caret={false} className="p-0">
            <CIcon icon={cilOptions} className="text-white" />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem>Xem chi tiết</CDropdownItem>
            <CDropdownItem disabled>Đang cập nhật...</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      }
      chart={chartElement}
    />
  );
}
