document.addEventListener("DOMContentLoaded", async function () {
  const ctx = document.getElementById("stockGrowthChart").getContext("2d");

  const stockValuesResponse = await fetch("api/assets/stock-values");
  const stockValuesData = await stockValuesResponse.json();
  stockValuesData.stockValues.forEach((stock) => {
    stock.totalInvestment *= 85;
  });

  const stockProfitResponse = await fetch("api/assets/stock/profit");
  const stockProfitData = await stockProfitResponse.json();

  const data = {
    labels: [],
    datasets: [
      {
        label: "Total Investment",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        data: [],
      },
      {
        label: "Profit",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        data: [],
      },
    ],
  };

  stockValuesData.stockValues.forEach((stockValue) => {
    const stockName = stockValue.stockName;
    const totalInvestment = stockValue.totalInvestment;
    const profit = stockProfitData[stockName];

    if (profit !== undefined) {
      data.labels.push(stockName);
      data.datasets[0].data.push(totalInvestment);
      data.datasets[1].data.push(profit);
    }
  });

  const options = {
    responsive: true,
    legend: {
      display: true,
      position: "top",
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  // Render the chart
  const myChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: options,
  });
});
