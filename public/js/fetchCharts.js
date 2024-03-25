
const chartsData = {
    "cards": [
      {
        "heading": "BTCUSD",
        "sub-heading": "BITCOIN / U.S. DOLLAR",
        "current": "61894",
        "date": "2024, Mar"
      },
      {
        "heading": "USDINR",
        "sub-heading": "U.S. DOLLAR / INDIAN",
        "current": "82.8700",
        "date": "2024, Mar"
      },
      {
        "heading": "MSFT",
        "sub-heading": "MICROSOFT / CORP",
        "current": "416.42",
        "date": "2024, Mar"
      },
      {
        "heading": "AMZN",
        "sub-heading": "AMAZON.COM, INC",
        "current": "174.42",
        "date": "2024, Mar"
      },
      {
        "heading": "MSFT",
        "sub-heading": "MICROSOFT / CORP",
        "current": "416.42",
        "date": "2024, Mar"
      },
      {
        "heading": "MSFT",
        "sub-heading": "MICROSOFT / CORP",
        "current": "416.42",
        "date": "2024, Mar"
      },
    ]
  }


function fetchWidgetData() {
    return {
        "symbols": [
            {
                "proName": "FOREXCOM:SPXUSD",
                "title": "S&P 500 Index"
            },
            {
                "proName": "FOREXCOM:NSXUSD",
                "title": "US 100 Cash CFD"
            },
            {
                "proName": "FX_IDC:EURUSD",
                "title": "EUR to USD"
            },
            {
                "proName": "BITSTAMP:BTCUSD",
                "title": "Bitcoin"
            },
            {
                "proName": "BITSTAMP:ETHUSD",
                "title": "Ethereum"
            }
        ],
        "showSymbolLogo": false,
        "isTransparent": true,
        "displayMode": "regular",
        "colorTheme": "dark",
        "locale": "en"
    };
}

const widgetData = fetchWidgetData();
console.log(widgetData);

function fetchMiniChartData() {
    return {
        "width": "1380",
        "height": "610",
        "symbol": "FX_IDC:INRUSD",
        "interval": "D",
        "timezone": "Asia/Kolkata",
        "theme": "dark",
        "style": "9",
        "locale": "en",
        "enable_publishing": false,
        "withdateranges": true,
        "allow_symbol_change": true,
        "details": true,
        "hotlist": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
    };
}

const advancedChartData = fetchAdvancedChartData();
console.log(advancedChartData);

function fetchMiniSymbolOverviewData() {
    return {
        "symbol": "BITSTAMP:BTCUSD",
        "width": "100%",
        "height": "100%",
        "locale": "en",
        "dateRange": "3M",
        "colorTheme": "dark",
        "isTransparent": true,
        "autosize": true,
        "largeChartUrl": ""
    };
}

const miniSymbolOverviewData = fetchMiniSymbolOverviewData();
console.log(miniSymbolOverviewData);

//Accessing data of charts
module.eport = chartsData;
