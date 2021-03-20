
window.onscroll = function() {scrollFunction()};
//click on div to go to the top of the page
var scroll__topbtn = document.getElementById("scroll__topbtn");
var rootElement = document.documentElement;
scroll__topbtn.addEventListener("click", scrollToTop)
//adJson () 
    // http://localhost:8080
    fetch('https://ooxz.github.io/AdrienBrune_6_26112020/photographers.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(json => {
        let users = json;
        users.photographers.forEach(photographer => {
          let card = generatedCard(photographer);
          document.getElementById('photographs').innerHTML += card;
        })
        console.log(users);
    })
    .catch(function () {
        this.dataError = true;
    })
 
//scroll 10 px down and the div shows
      
function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    document.getElementById("scroll__div").style.top = "0";
  } else {
    document.getElementById("scroll__div").style.top = "-50px";
  }
}

//click on div to go to the top of the page
function scrollToTop() {
  // Scroll to top logic
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}

function generatedCard(item){
  const {name,id,city,country,tags,tagline,price,portrait} = item;
  card = `<a href="photographer.html?id=${id}">
            <div class="card">
              <image class="card__img" src="./FishEye_Photos/Sample_Photos/Photographers_ID_Photos/${portrait}" alt="FishEye photographers - ${name}">
              <div class="card__text">
              <h2 class="card__name">${name}</h2>
              <p class="card__city">${city}, ${country}</p>
              <p class="card__quote">${tagline}</p>
              <p class="card__price">${price}$/jour</p>
              <p class="card__tag">${tags}</p>
              </div>
              </div>
              </a>
              `
              return card;
}
