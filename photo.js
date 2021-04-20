// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//fonctionnalitées de la croix pour fermer le formulaire
document.getElementById('closeButton').addEventListener('click', (event) => {
  event.preventDefault();
  modalbg.style.display = 'none';
  });

  //clicking outside of the modalbg will close it
  window.onclick = function(event) {
    if (event.target == modalbg) {
      modalbg.style.display = "none";
    }
  }

  var clicks = 0;
        function updateClickCount() {
            document.getElementById("clickCount").innerHTML = clicks;
        }


fetch('https://ooxz.github.io/AdrienBrune_6_26112020/photographers.json')
.then(response => response.json())
.then(data => {
  const idPhotographer = getParamFromURL('id');
  console.log(idPhotographer);
  if(idPhotographer !== undefined){
    const photographer = getPhotographerFromData(data, idPhotographer);
    console.log(photographer);
    document.getElementById("modal__name").textContent =`Contactez-moi ${photographer.name}`;
    document.getElementById("photographer__name").textContent = photographer.name;
    document.getElementById("photographer__city").textContent = `${photographer.city},`;
    document.getElementById("photographer__country").textContent =photographer.country;
    document.getElementById("photographer__tagline").textContent = photographer.tagline;
    document.getElementById("photographer__tags").textContent = `${displayTags(photographer.tags)}`;
    var test = document.createElement("IMG");
    test.setAttribute("src", photographer.portrait);
    document.getElementById("photographer__photo").appendChild (test);
    const medias = getMediaFromData(data, idPhotographer);
    console.log(medias);
    let card = generatedCard(medias);
          document.getElementById('photographers__photos').innerHTML += card;
  }
})
.catch(error => console.error(error.message));

function getParamFromURL(param){
  // source : https://www.sitepoint.com/get-url-parameters-with-javascript/
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const result = urlParams.get(param);
  if(result === null) {
    console.error("Le paramètre n'a pas été trouvé");
    return undefined;
  }
  return result;
}

function getPhotographerFromData(data, id){
  return data.photographers.find(elt => elt.id == id);
}

function getMediaFromData(data, photographerId){
  return data.photographers.filter(elt => elt.photographerId == photographerId)
}
  


//fonction pour que les # se mettent devant les tags
function displayTags(tags){
  let stringTemplate = ``;
  tags.forEach(tag => {
    console.log(tag)
    stringTemplate += `#${tag} `
  });
  return stringTemplate
}

function generatedCard(item){
  const {id,price,image,title,likes,idPhotographer} = item;
  let createdCard = `<a class="main__frame" href="">
            <div class="card">
              <image class="photographs__pictures" src="photographer.html?id=${id}${image}" alt="FishEye photographers">
              <div class="photo__info">
              <p class"photo__title">item.id</p>
              <p class="photo__price">${price} €</p>
              <button id="btn" class="fas fa-heart fontIcon"></button>
              <p><span id="display">${likes}</span></p>
              </div>
              </a>
              </div>
              
              `
              return createdCard;
}

var count = 0;
        var btn = document.getElementById("btn");
        var disp = document.getElementById("display");
  
        btn.onclick = function () {
            count++;
            disp.innerHTML = count;
        }