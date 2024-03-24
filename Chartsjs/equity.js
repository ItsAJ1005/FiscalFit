document.addEventListener("DOMContentLoaded", function() {
  const ctx = document.getElementById('stockGrowthChart').getContext('2d');

  // Sample data for demonstration
  const stockData = [
    {
      stockName: 'Stock A',
      growth: [5, 8, 12, 15] // Growth over the last 4 months
    },
    {
      stockName: 'Stock B',
      growth: [7, 10, 14, 17] // Growth over the last 4 months
    },
    {
      stockName: 'Stock C',
      growth: [9, 12, 16, 19] // Growth over the last 4 months
    },
    {
      stockName: 'Stock D',
      growth: [6, 9, 13, 16] // Growth over the last 4 months
    },
    {
      stockName: 'Stock E',
      growth: [8, 11, 15, 18] // Growth over the last 4 months
    },
    {
      stockName: 'Stock F',
      growth: [10, 13, 17, 20] // Growth over the last 4 months
    }
  ];

  // Filter out stocks A to E
  const desiredStocks = ['Stock A', 'Stock B', 'Stock C', 'Stock D', 'Stock E'];
  const filteredStockData = stockData.filter(stock => desiredStocks.includes(stock.stockName));

  const data = {
    labels: ['Stock A', 'Stock B', 'Stock C', 'Stock D'],
    datasets: []
  };

  filteredStockData.forEach((stock) => {
    const dataset = {
      label: stock.stockName,
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`,
      borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
      borderWidth: 2,
      data: stock.growth
    };
    data.datasets.push(dataset);
  });

  const options = {
    responsive: true,
    legend: {
      display: true,
      position: 'right' // Show legend on the right side
    },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      bodyFontSize: 14,
      bodySpacing: 10
    },
    scales: {
      xAxes: [{
        stacked: false, // Change to false for displaying stocks individually
        ticks: {
          beginAtZero: true
        }
      }],
      yAxes: [{
        stacked: false, // Change to false for displaying stocks individually
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  const myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  });
});
