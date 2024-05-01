// Fetch data from the API endpoint
fetch('api/assets/gold/profit')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Once data is fetched successfully, you can process it and create the chart
    const scaledGoldCosts = data.scaledGoldCost;

    // Generating labels for months (1st month, 2nd month, etc.)
    const months = Array.from({ length: scaledGoldCosts.length }, (_, i) => `${i + 1}st month`);

    const ctx = document.getElementById('goldCostsChart').getContext('2d');

    const goldCostsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Scaled Gold Costs',
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color for the line fill
                data: scaledGoldCosts,
                fill: true // Fill the area under the line
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category',
                    labels: months,
                    grid: {
                        display: false
                    }
                },
                y: {
                    suggestedMin: 0,
                    beginAtZero: true,
                    ticks: {
                        callback: function (value, index, values) {
                            return value.toFixed(2);
                        }
                    }
                }
            },
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'xy',
                    },
                    limits: {
                        x: { min: 0, max: 1000000 }, // Set the maximum limit of x-axis zoom to 10000
                        y: { min: 0 } // Set the minimum limit of y-axis zoom to 0
                    },
                    zoom: {
                        drag: {
                            enabled: true,
                        },
                        wheel: {
                            enabled: true, // Enable zoom via mouse wheel
                        },
                        pinch: {
                            enabled: true, // Enable zoom via pinch gesture
                        },
                        mode: 'xy', // Enable zooming in both directions
                        sensitivity: 0.1 // Adjust sensitivity for smooth zooming
                    }
                },
                animation: {
                    numbers: { duration: 0 },
                    colors: {
                        type: "color",
                        duration: 1000,
                        from: "transparent",
                    }
                }
            }
        }
    });
  })
  .catch(error => {
    // Handle any errors that occur during the fetch
    console.error('There was a problem fetching the data:', error);
  });
