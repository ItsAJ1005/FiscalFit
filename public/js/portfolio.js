// Function to calculate sums using fetch
async function calculateSums() {
  try {
    // Fetch data from the backend routes
    const equityResponse = await fetch("/api/assets/stock/profit");
    const goldResponse = await fetch("/api/assets/gold/profit");
    const fdResponse = await fetch("api/assets/fd-difference");
    const realEstateResponse = await fetch("api/assets/real-estate-difference");

    // Extract JSON data from the responses
    const equityData = await equityResponse.json();
    const goldData = await goldResponse.json();
    const fdData = await fdResponse.json();
    const realEstateData = await realEstateResponse.json();

    // Calculate sum of stock values
    let stockSum = 0;
    for (const stock in equityData) {
      stockSum += equityData[stock];
    }

    // Calculate sum of scaled gold costs
    let goldSum = goldData.scaledGoldCost.reduce((acc, curr) => acc + curr, 0);

    // Use FD difference directly
    let fdSum = fdData.difference;

    // Use real estate difference directly
    let realEstateSum = realEstateData.difference;

    // Update chart data with the calculated sums
    const data = {
      labels: ["Equity", "Gold", "Fixed Deposit", "Real Estate"],
      datasets: [{
        data: [stockSum/100, goldSum, fdSum, realEstateSum], // Updated with calculated sums
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)', // Red
          'rgba(255, 206, 86, 0.8)', // Yellow
          'rgba(54, 162, 235, 0.8)', // Blue
          'rgba(75, 192, 192, 0.8)', // Green
        ],
        borderColor: [
          'rgba(255, 0, 0, 1)', // Red border
          'rgba(0, 0, 255, 1)', // Blue border
          'rgba(255, 255, 0, 1)', // Yellow border
          'rgba(0, 128, 0, 1)' // Green border
        ],
        borderWidth: 2 
      }]
    };

    const options = {
      responsive: true,
      aspectRatio: 1, // Keep aspect ratio 1:1 for a circular chart
      cutout:'60%',
      plugins: {
               legend: {
                 display: false // Hide legend
               },
               tooltip: {
                 enabled: true, // Ensure tooltips are enabled
                 bodyFont: {
                   size: 20 // Adjust tooltip font size
                 }
               }
        }
    };

    // Create ring chart
    const ctx = document.getElementById('ringChart').getContext('2d');
    const ringChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: options
    });

  } catch (error) {
    console.error("Error:", error.message);
  }
}

calculateSums();
