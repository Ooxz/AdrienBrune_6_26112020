
window.onscroll = function () { scrollFunction() };

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
    let tagElements = Array.from(document.getElementsByClassName("tag"));
    tagElements.forEach(elt => {
      elt.addEventListener("click", (e) => {
        alert(e.target.textContent);
        e.preventDefault();
        e.target.textContent(`#${tag}`);
        e.target.remove('#');
      }) 
    })
  })
  .catch(function () {
    this.dataError = true;
  })

//scroll 10 px down and the div shows

function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    document.getElementById("scroll__div").style.display = "flex";
  } else {
    document.getElementById("scroll__div").style.display = "none";
  }
}


function generatedCard(item) {
  const { name, id, city, country, tags, tagline, price, portrait } = item;
  let createdCard = `<a class="main__frame" href="photographer.html?id=${id}">
            <div class="card">
              <div class="card__text">
              <image class="card__img" src="./FishEye_Photos/Sample_Photos/Photographers_ID_Photos/${portrait}" alt="FishEye photographers - ${name}">
              <h2 class="card__name">${name}</h2>
              <p class="card__city">${city}, ${country}</p>
              <p class="card__quote">${tagline}</p>
              <p class="card__price">${price}$/jour</p>
              <p class="card__tag">${displayTags(tags)}</p>
              </div>
              </a>
              </div>
              
              `
  return createdCard;
}

function displayTags(tags) {
  let stringTemplate = ``;
  tags.forEach(tag => {
    stringTemplate += `<a><span class="tag">#${tag}</span></a>`
  });
  return stringTemplate
}
