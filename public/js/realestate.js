document.addEventListener("DOMContentLoaded", function() {
    // Get context with jQuery - using jQuery's .get() method.
    const ctx = document.getElementById('priceChart').getContext('2d');
  
    // Sample data for demonstration
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Purchase Price',
        borderColor: 'rgb(255, 99, 132)',
        data: [250000, 255000, 260000, 262000, 265000, 270000, 275000, 280000, 285000, 290000, 295000, 300000],
        fill: false
      }, {
        label: 'Today Price',
        borderColor: 'rgb(54, 162, 235)',
        data: [255000, 260000, 265000, 268000, 272000, 275000, 280000, 285000, 290000, 295000, 300000, 305000],
        fill: false
      }]
    };
  
    const options = {
      responsive: true,
      title: {
        display: true,
        text: 'Real Estate Prices Over One Year'
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Price ($)'
          }
        }]
      }
    };
  
    // Create the chart
    const myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });
  });
  