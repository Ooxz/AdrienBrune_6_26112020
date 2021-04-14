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
    document.getElementById("photographer__name").textContent = photographer.name;
    document.getElementById("photographer__city").textContent = `${photographer.city},`;
    document.getElementById("photographer__country").textContent =photographer.country;
    document.getElementById("photographer__tagline").textContent = photographer.tagline;
    document.getElementById("photographer__tags").textContent = `${displayTags(photographer.tags)}`;
    const medias = getMediaFromData(data, idPhotographer);
    console.log(medias);
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
  
// function generatedCard(item){
//   const {name,id,city,country,tags,tagline,price,portrait} = item;
//   card = `<a class="main__frame" href="photographer.html?id=${id}">
//             <div class="card">
//               <image class="card__img" src="./FishEye_Photos/Sample_Photos/Photographers_ID_Photos/${portrait}" alt="FishEye photographers - ${name}">
//               <div class="card__text">
//               <h2 class="card__name">${name}</h2>
//               <p class="card__city">${city}, ${country}</p>
//               <p class="card__quote">${tagline}</p>
//               <p class="card__price">${price}$/jour</p>
//               </div>
//               </a>
//               <p class="card__tag">${displayTags(tags)}</p>
//               </div>
              
//               `
//               return card;
// }

function displayTags(tags){
  let stringTemplate = ``;
  tags.forEach(tag => {
    console.log(tag)
    stringTemplate += `#${tag}`
  });
  return stringTemplate
}