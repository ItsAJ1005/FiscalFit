document.addEventListener("DOMContentLoaded", function() {
    // Get context for the chart
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
            // Extract purchase price from the fetched data
            const purchasePrice = data.purchasePrice;

            // Interpolate purchase price data to cover 12 months using quadratic interpolation
            const interpolatedData = quadraticInterpolation(purchasePrice, 12);

            // Chart data
            const chartData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Purchase Price',
                    borderColor: 'rgb(255, 99, 132)',
                    data: interpolatedData,
                    fill: false
                }]
            };

            // Chart options
            const options = {
                responsive: true,
                title: {
                    display: true,
                    text: 'Real Estate Purchase Price Over One Year'
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
            new Chart(ctx, {
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

// Function to perform quadratic interpolation
function quadraticInterpolation(data, targetMonths) {
    const result = [];
    const step = Math.floor(data / (targetMonths - 1));
    for (let i = 0; i < targetMonths; i++) {
        result.push(i * i * step);
    }
    return result;
}
