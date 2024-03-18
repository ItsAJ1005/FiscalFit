// function to fetch screener data and populate the table
function fetchAndPopulateScreenerData() {
    fetch('https://s3.tradingview.com/external-embedding/embed-widget-screener.js')
        .then(response => response.text())
        .then(scriptText => {
            // Extract data from the script text
            const jsonData = scriptText.match(/{[^]*}/)[0];
            const data = JSON.parse(jsonData);

            // Extract headings from data
            const headings = Object.keys(data.data[0]);

            // Get the table element
            const table = document.querySelector('.screener');

            // Create table header row
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            headings.forEach(heading => {
                const th = document.createElement('th');
                th.textContent = heading.toUpperCase();
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Create table body rows
            const tbody = document.createElement('tbody');
            data.data.forEach(rowData => {
                const row = document.createElement('tr');
                headings.forEach(heading => {
                    const td = document.createElement('td');
                    td.textContent = rowData[heading];
                    row.appendChild(td);
                });
                tbody.appendChild(row);
            });
            table.appendChild(tbody);
        })
        .catch(error => {
            console.error('Error fetching and populating screener data:', error);
        });
}

// Fetch and populate screener data when the page loads
document.addEventListener('DOMContentLoaded', fetchAndPopulateScreenerData);