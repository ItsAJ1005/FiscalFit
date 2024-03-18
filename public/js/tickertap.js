// css styles for the stocks list
const styles = `
.stocks-list {
    max-height: 200px; /* Limit the height to enable scrolling */
    overflow-y: auto; /* Enable vertical scrolling */
}

.stocks-list ul {
    padding: 0;
    list-style-type: none;
}

.stocks-list li {
    padding: 8px;
    border-bottom: 1px solid #ddd;
}
`;

// function to fetch stock data and update list items
function fetchAndRenderStocks() {
    fetch('https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js')
        .then(response => response.json())
        .then(data => {
            const stocksList = document.getElementById('stocks-list-items');
            data.symbols.forEach(symbol => {
                const listItem = document.createElement('li');
                listItem.textContent = `${symbol.title}: ${symbol.proName}`;
                stocksList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching stock data:', error);
        });
}

// function to inject CSS styles into the document
function injectStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
}

// initial fetch of stocks when the page loads
fetchAndRenderStocks();

// implement CSS
injectStyles();
