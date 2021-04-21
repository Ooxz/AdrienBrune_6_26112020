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
    const photographerFolder = getPhotographerFolder(photographer.name);
    document.getElementById("modal__name").textContent =`Contactez-moi ${photographer.name}`;
    document.getElementById("photographer__name").textContent = photographer.name;
    document.getElementById("photographer__city").textContent = `${photographer.city},`;
    document.getElementById("photographer__country").textContent =photographer.country;
    document.getElementById("photographer__tagline").textContent = photographer.tagline;
    document.getElementById("photographer__tags").textContent = `${displayTags(photographer.tags)}`;
    var test = document.createElement("IMG");
    test.setAttribute("src", `${getDomainFromUrl()}/FishEye_Photos/Sample_Photos/Photographers_ID_Photos/${photographer.portrait}`);
    document.getElementById("photographer__photo").appendChild (test);
    const medias = getMediaFromData(data, idPhotographer);
    console.log(medias);
    medias.forEach(media => {
      let card = generatedCard(media, photographerFolder);
      document.getElementById('photographers__photos').innerHTML += card;

    })
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
// function to get picture url
function getDomainFromUrl(){
  let url = new URL(window.location)
  console.log("url", url);
  return  url.origin
}

function getPhotographerFromData(data, id){
  return data.photographers.find(elt => elt.id == id);
}

function getMediaFromData(data, photographerId){
  console.log("data", data)
  return data.media.filter(elt => elt.photographerId == photographerId)
}

function getPhotographerFolder(photographer){
  let surname = photographer.split(' ')[0];
  let formalizedSurname = surname.replace('-', ('_'));
  console.log("foldername", formalizedSurname);
  return formalizedSurname;
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

function generatedCard(item, folder){
  console.log(item);
  const {id,price,image,title,likes,idPhotographer} = item;
  let createdCard = `<a class="main__card" href="">
            <div class="card__all">
              <image class="photographs__pictures" src="${getDomainFromUrl()}/FishEye_Photos/Sample_Photos/${folder}/${image}" alt="FishEye photographers">
              <div class="photo__info">
              <p class="photo__title">${title}</p>
              <p class="photo__price">${price}€</p>
              <p><span class="photo__likes" id="display">${likes}</span></p>
              <div id="btn" class="fontIcon">❤</div>
              </div>
              </a>
              </div>
              
              
              `
              return createdCard;
}

// Likes count
var count = 0;
        var btn = document.getElementById("btn");
        var disp = document.getElementById("display");
  
        btn.onclick = function () {
            count++;
            disp.innerHTML = count;
        }

// dropdown menu

for (const dropdown of document.querySelectorAll('.dropdown__main')) {
  dropdown.addEventListener('click', function () {
    this.querySelector('.dropdown__select').classList.toggle('open')
  })
}

for (const option of document.querySelectorAll('.dropdown__option')) {
  option.addEventListener('click', function () {
    if (!this.classList.contains('selected')) {
      this.parentNode.querySelector('.dropdown__option.selected').classList.remove('selected')
      this.classList.add('selected')
      this.closest('.dropdown__select').querySelector('.dropdown__trigger span').textContent = this.textContent
    }
  })
}

window.addEventListener('click', function (e) {
  for (const select of document.querySelectorAll('.dropdown__select')) {
    if (!select.contains(e.target)) {
      select.classList.remove('open')
    }
  }
})
