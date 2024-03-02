import axios from "axios";

const Urls = [
  "https://financialmodelingprep.com/api/v3/quote/AAPL?apikey=gzjqCQh7oWUC0StElLf633BAGyBbAgqO",
  "https://financialmodelingprep.com/api/v3/quote/AMZN?apikey=gzjqCQh7oWUC0StElLf633BAGyBbAgqO",
  "https://financialmodelingprep.com/api/v3/quote/NFTY?apikey=gzjqCQh7oWUC0StElLf633BAGyBbAgqO",
  "https://financialmodelingprep.com/api/v3/quote/TCS?apikey=gzjqCQh7oWUC0StElLf633BAGyBbAgqO",
  "https://financialmodelingprep.com/api/v3/quote/TSLA?apikey=gzjqCQh7oWUC0StElLf633BAGyBbAgqO",
  "https://financialmodelingprep.com/api/v3/quote/MSFT?apikey=gzjqCQh7oWUC0StElLf633BAGyBbAgqO",
  "https://financialmodelingprep.com/api/v3/quote/META?apikey=gzjqCQh7oWUC0StElLf633BAGyBbAgqO",
  "https://financialmodelingprep.com/api/v3/quote/UBER?apikey=gzjqCQh7oWUC0StElLf633BAGyBbAgqO",
];

const fetchData = async (Url) => {
  try {
    const res = await axios.default.get(Url);
    const { data } = res;
    return {
      name: data[0].name,
      price: data[0].price,
      changesPercentage: data[0].changesPercentage,
    };
  } catch (e) {
    console.error(e);
  }
};

const fetchAll = async () => {
  try {
    const res = await Promise.all(Urls.map(fetchData));
    const List = document.getElementsByClassName("tag-list");
    res.forEach((data) => {
      const newLi = document.createElement("li");
      newLi.textContent = `${data.name} ${data.price} ${data.changesPercentage}%`;
      const newDiv = document.createElement("div");
      if (data.changesPercentage <= 0) {
        newDiv.style.display = "inline-block";
        newDiv.style.width = "0";
        newDiv.style.height = "0";
        newDiv.style.borderRight = "10px solid transparent";
        newDiv.style.borderLeft = "10px solid transparent";
        newDiv.style.borderTop = "10px solid red";
      } else {
        newDiv.style.display = "inline-block";
        newDiv.style.width = "0";
        newDiv.style.height = "0";
        newDiv.style.borderRight = "10px solid transparent";
        newDiv.style.borderLeft = "10px solid transparent";
        newDiv.style.borderBottom = "10px solid green";
      }
      newLi.appendChild(newDiv);
      List[0].appendChild(newLi.cloneNode(true));
      List[1].appendChild(newLi.cloneNode(true));
    });
  } catch (e) {
    console.error(e);
  }
};

fetchAll();
