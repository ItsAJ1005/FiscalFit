// const sampleData = [
//     { dateOfPurchase: '2023-01-01', principalAmount: 3000, interestRate: 9, tenure: 30},
// ];

// const labels = [];
// const dataValues = [];
// sampleData.forEach(data => {
//     const months = data.tenure * 12;
//     let currentAmount = data.principalAmount;
//     for (let i = 0; i <= months; i++) {
//         const interest = (currentAmount * data.interestRate) / (100 * 12);
//         currentAmount += interest;
//         labels.push(i); 
//         dataValues.push(currentAmount);
//     }
// });


// const ctx = document.getElementById('fixedDepositChart').getContext('2d');
// const fixedDepositChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: labels,
//         datasets: [{
//             label: 'Fixed Deposit Growth',
//             data: dataValues,
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 2,
//             fill: false
//         }]
//     },
    
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: false,
//                 title: {
//                     display: true,
//                     text: 'Amount'
//                 }
//             },
//             x: {
//                 title: {
//                     display: true,
//                     text: 'Tenure (in months)'
//                 }
//             }
//         }
//     },
//     plugins: {
//         zoom:{
//             pan: {
//                 enabled: true,
//                 mode: 'xy',
//             },
//             limits: {
//                 x: {min: 0, max: 1000000},
//                 y: {min: 0}
//             },
//             zoom: {
//                 drag: {
//                   enabled:true,
//                 },
//                 wheel: {
//                   enabled: true,
//                 },
//                 pinch: {
//                   enabled: true,
//                 },
//                 mode: 'xy',
//                 sensitivity: 0.1
//               }
//         }
//     }
// });
