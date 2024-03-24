// Data based on the asset schema
const data = {
    labels: ["Equity", "Gold", "Fixed Deposit", "Real Estate"],
    datasets: [{
      data: [30, 20, 25, 25], // Values corresponding to each label
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
      borderWidth: 2 // Increase border width for better visibility
    }]
  };

// Configuration options
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
const ctx = document.getElementById('ring-chart').getContext('2d');
const ringChart = new Chart(ctx, {
  type: 'doughnut',
  data: data,
  options: options
});
  