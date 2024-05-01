document.addEventListener("DOMContentLoaded", function() {
    // Fetch data from the API endpoint
    fetch('/api/assets/fdDetails')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Process the fetched data
            const processedData = processData(data);

            // Generate chart after processing the data
            generateChart(processedData);
        })
        .catch(error => {
            // Handle any errors that occur during the fetch
            console.error('There was a problem fetching the data:', error);
        });
});

// Function to process the fetched data
function processData(data) {
    // Extracting attributes from the fetched data
    const dateOfPurchase = data.dateOfPurchase;
    const principalAmount = data.principalAmount;
    const interestRate = data.interestRate;
    const tenure = data.tenure;

    // Return processed data
    return {
        dateOfPurchase: dateOfPurchase,
        principalAmount: principalAmount,
        interestRate: interestRate,
        tenure: tenure
    };
}

// Function to generate the chart
function generateChart(data) {
    const labels = [];
    const dataValues = [];
    const months = data.tenure * 12;
    let currentAmount = data.principalAmount;
    
    for (let i = 0; i <= months; i++) {
        const interest = (currentAmount * data.interestRate) / (100 * 12);
        currentAmount += interest;
        labels.push(i); 
        dataValues.push(currentAmount);
    }

    const ctx = document.getElementById('fixedDepositChart').getContext('2d');
    const fixedDepositChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Fixed Deposit Growth',
                data: dataValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Amount'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Tenure (in months)'
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
                        x: {min: 0, max: 1000000},
                        y: {min: 0}
                    },
                    zoom: {
                        drag: {
                            enabled: true,
                        },
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true,
                        },
                        mode: 'xy',
                        sensitivity: 0.1
                    }
                }
            }
        }
    });
}
