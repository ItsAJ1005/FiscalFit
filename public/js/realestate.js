document.addEventListener("DOMContentLoaded", function() {
    // Get context with jQuery - using jQuery's .get() method.
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    // Fetch purchase price data from the API endpoint
    fetch('api/assets/userRealEstateInvestment')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Once data is fetched successfully, interpolate to cover 12 months
            const purchasePriceData = data.purchasePrice;
            const interpolatedData = interpolateData(purchasePriceData, 12);

            // Sample data for demonstration (Today Price)
            const todayPriceData = [255000, 260000, 265000, 268000, 272000, 275000, 280000, 285000, 290000, 295000, 300000, 305000];

            // Combined data for the chart
            const chartData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Purchase Price',
                    borderColor: 'rgb(255, 99, 132)',
                    data: interpolatedData,
                    fill: false
                }, {
                    label: 'Today Price',
                    borderColor: 'rgb(54, 162, 235)',
                    data: todayPriceData,
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
                data: chartData,
                options: options
            });
        })
        .catch(error => {
            // Handle any errors that occur during the fetch
            console.error('There was a problem fetching the data:', error);
        });
});

// Function to interpolate data to cover specified number of months
function interpolateData(data, targetMonths) {
    const result = [];
    const interval = Math.floor(data.length / targetMonths);
    for (let i = 0; i < data.length; i += interval) {
        result.push(data[i]);
    }
    return result;
}
