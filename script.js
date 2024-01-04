const API_KEY = "7e33d144206048c6b5fb01ba08f3ce14";
const url= "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query) {
 const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
 const data= await res.json();
 
 bindData(data.articles);
}

function bindData(articles){
    const cardsContainer= document.getElementById('cards-container');
    const templateCard= document.getElementById('templateCard');
    cardsContainer.innerHTML = "";
    
    articles.forEach(article => {

        if(!article.urlToImage){
            return;
        }
        const cardClone = templateCard.content.cloneNode(true);
        fillDataCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}


function fillDataCard(cardClone, article){

    const newsImg= cardClone.querySelector('#news-img');
    const newsHeading= cardClone.querySelector('#news-heading');
    const newssrc= cardClone.querySelector('#news-src');
    const newsdesc= cardClone.querySelector('#news-desc');
    
    newsImg.src = article.urlToImage;
    newsHeading.innerHTML=article.title;
    newsdesc.innerHTML=article.description;
   

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Kolkata"
    })
    newssrc.innerHTML=`${article.source.name} → ${date}` ;
    
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url, "_blank");
    })

}

let curSelItem = null;

function onNavItemClick (id)
{
   fetchNews(id);
   const navItem = document.getElementById(id);
   curSelItem?.classList.remove('active');
curSelItem= navItem;
curSelItem.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText= document.getElementById('news-input');

searchButton.addEventListener('click', ()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelItem?.classList.remove('active');
curSelItem= navItem;
});

function reload () {
    window.location.reload();
}



