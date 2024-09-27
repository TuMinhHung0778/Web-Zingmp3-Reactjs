import React, { memo, useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";
import { SongItem } from "./";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

const ChartRank = ({isChartHome}) => {
  const [data, setData] = useState(null);
  const { chart, rank, chartdata } = useSelector((state) => state.app);
  const chartRef = useRef();
  const navi = useNavigate();
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });
  const [selected, setSelected] = useState(null);
  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: "rgba(255,255,255,0.1)", drawTicks: false },
        min: chart?.minScore,
        max: chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: "white" },
        grid: { color: "transparent" },
      },
    },

    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: ({ tooltip }) => {
          if (!chartRef || !chartRef.current) return;
          if (tooltip.opacity === 0) {
            if (tooltipState.opacity !== 0)
              setTooltipState((prev) => ({ ...prev, opacity: 0 }));
            return;
          }
          const couters = [];
          for (let i = 0; i < 3; i++) {
            couters.push({
              data: chart?.items[Object.keys(chart?.items)[i]]
                ?.filter((item) => +item.hour % 2 === 0)
                ?.map((item) => item.counter),
              encodeId: Object.keys(chart?.items)[i],
            });
          }
          //   console.log(+tooltip.body[0]?.lines[0]?.replace('.',''))
          const rs = couters.find((i) =>
            i.data.some(
              (n) => n === +tooltip.body[0]?.lines[0]?.replace(".", "")
            )
          );
          setSelected(rs.encodeId);
          const newTooltipData = {
            opacity: 1,
            top: tooltip.caretX,
            left: tooltip.caretY,
          };
          if (!_.isEqual(tooltipState, newTooltipData))
            setTooltipState(newTooltipData);
        },
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };
  // console.log(chart, rank)
  useEffect(() => {
    const labels = chart?.times
      ?.filter((item) => +item.hour % 2 === 0)
      ?.map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]
            ?.filter((item) => +item.hour % 2 === 0)
            ?.map((item) => item.counter),
          borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          tension: 0.2,
          borderWidth: 2,
          pointHoverRadius: 4,
          poinBackgroundColor: "white",
          pointHitRadius: 5,
          pointBorderColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          animation: false,
          pointHoverBorderWidth: 4,
        });
      }
      // console.log({datasets })
      // console.log(datasets)
      setData({ labels, datasets });
    }
  }, [chart]);
  // console.log(chartdata)
  return (
    <div className={isChartHome ? 'chart_f': 'chartRank'}>
      <div className={isChartHome ? 'chartTitle_home' : 'chart_title'}>
        <h3>#zingchart</h3>
      </div>
      <div className="chart_content">
        <div className="rank_song" style={isChartHome ? {display : 'none'}: {}}>
          {rank
            ?.filter((i, index) => index < 3)
            ?.map((item, index) => (
              <SongItem
                songData={item}
                order={(index += 1)}
                percent={Math.round((item.score * 100) / +chart?.totalScore)}
                isChart={true}
                key={index}
              />
            ))}
        </div>
        <div className={isChartHome ? 'chartline_home' : 'chart_line'}>
          {data && (
            <Line
              data={data}
              ref={chartRef}
              options={options}
              className="chart_positon"
            />
          )}
          <div
            style={{
              top: tooltipState.top,
              left: tooltipState.left,
              opacity: tooltipState.opacity,
              position: "absolute",
            }}
          >
            <SongItem
              songData={rank?.find((i) => i.encodeId === selected)}
              percent={Math.round(
                (rank?.find((i) => i.encodeId === selected)?.score * 100) /
                  +chart?.totalScore
              )}
              isChart={true}
              isTooltip={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChartRank);
