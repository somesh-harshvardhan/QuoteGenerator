//GET Quotes
const quoteContainer=document.getElementById("quote-container");
const quoteText=document.getElementById("quote");
const quoteAuthor=document.getElementById("quote-author");
const buttonContainer=document.getElementById("button-container");
const buttonNewQuote=document.getElementById("new-quote");
const twitterButton=document.getElementById("twitter");
const loader=document.getElementById("Loader");
console.log(buttonNewQuote)
console.log(twitterButton)
//LOAder
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
//Complete loader
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}
async function getQuote(){
    loading();
    const proxyUrl='https://rocky-plateau-66771.herokuapp.com/';
    const apiUrl='http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
try {
    const repsonse=await fetch(proxyUrl + apiUrl);
    const data=await repsonse.json();
    console.log(data);
   
   
    //IF Auhtor is  Unknown else Displa Author
    if(data.quoteAuthor===''){
        quoteAuthor.innerText="unknown"
    }
    else{
        quoteAuthor.textContent=data.quoteAuthor;
    }
    //Reduce fobnt size of long quote
    if(quoteText.innerText.length>120){
        quoteText.classList.add("long-quote");
    }else{
        quoteText.classList.remove("long-quote");
    }
    quoteText.innerText=data.quoteText;
    complete();
} catch (error) {
    getQuote();
    console.log("woops");
    
}

}
//Function TWEET
function tweetQuote(){
    const quote=quoteText.innerText;
    const author=quoteAuthor.innerText;
    const twitterUrl=`http://twitter.com/intent/tweet?text=${quote}-${author}`;
    window.open(twitterUrl,'_blank');
}
//Event Listener
buttonNewQuote.addEventListener("click",getQuote);
twitterButton.addEventListener("click",tweetQuote);
//OnLOAD
getQuote();
loading();