import React, { Component } from "react";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(...registerables);

class DayChart extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      plugins: [{
        beforeDraw(chart) {
          const { ctx } = chart;
          const { chartArea } = chart;
          ctx.save();
          ctx.fillStyle = "rgb(90, 132, 179)";
          ctx.fillRect(
            chartArea.left,
            chartArea.top,
            chartArea.right - chartArea.left,
            chartArea.bottom - chartArea.top,
          );
          ctx.restore();
        },
      }],
      type: "line",
      options: {

        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: this.props.title,
            font: {
              size: 24,
            },
          },
        },
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
            },
            grid: {
              color: "#d4d4d4",
            },

          },
          y: {
            grid: {
              color: "#d4d4d4",
            },
            min: 0,
          },
        },
      },
      data: {
        labels: this.props.dataSet.map((itm) => itm.x),
        datasets: [{
          data: this.props.dataSet.map((itm) => itm.y),
          backgroundColor: "#fff",
          borderColor: "#fff",
        }],
      },
    });
  }

  componentDidUpdate() {
    console.log("update");
    console.log(this.props);
    console.log(this.myChart.data);
    this.myChart.data.datasets.pop();
    this.myChart.data.labels.pop();
    this.myChart.data.labels = this.props.dataSet.map((itm) => itm.x);
    this.myChart.data.datasets.push({
      data: this.props.dataSet.map((itm) => itm.y),
      backgroundColor: "#fff",
      borderColor: "#fff",
      borderWidth: 5,
      pointBorderColor: "rgba(163,163,163,1)",
      pointRadius: 5,
      pointBorderWidth: 2,
      fill: false,
    });
    this.myChart.update();
    console.log(this.myChart.data);
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}

export default DayChart;
