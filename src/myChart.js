import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

function getTags(taskCommon) {
  let tagsArr = [];
  taskCommon.map((task)=>{
    tagsArr.push(task.tags.join());
  });

  tagsArr = tagsArr.join().split(`,`);

  let tagsResult = tagsArr.reduce(function (acc, el) {
    if (el !== ``) {
      acc[el] = (acc[el] || 0) + 1;

    }
    return acc;
  }, {});

  return tagsResult;
}

function getColors(taskCommon) {
  let colorArr = [];

  taskCommon.map((task)=>{
    colorArr.push(task.color);
  });

  colorArr = colorArr.join().split(`,`);
  let colorResult = colorArr.reduce(function (acc, el) {
    if (el !== ``) {
      acc[el] = (acc[el] || 0) + 1;

    }
    return acc;
  }, {});

  return colorResult;
}

export default function getChart(taskCommon) {
  const tagsCtx = document.querySelector(`.statistic__tags`);
  const colorsCtx = document.querySelector(`.statistic__colors`);
  // В разрезе тегов
  (() => new Chart(tagsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: Object.keys(getTags(taskCommon)),
      datasets: [{
        data: Object.values(getTags(taskCommon)),
        backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: TAGS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  }))();

  // В разрезе цветов
  (() =>new Chart(colorsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: Object.keys(getColors(taskCommon)),
      datasets: [{
        data: Object.values(getColors(taskCommon)),
        backgroundColor: Object.keys(getColors(taskCommon))
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: COLORS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  }))();
}

