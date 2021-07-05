import Media from './media.class.js';

/**
 * 
 * DOM elements
 */
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
let mediasFromData = [];
let photographer = null;
const lightboxbg = document.querySelector(".lightbox-background");
const lightboxCnt = document.querySelector(".lightbox-content");
let lightboxBtn = document.querySelectorAll(".photographs__pictures");
let mediasToDisplay;

/**
 * 
 * launch modal event
 */
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));



//fonctionnalitées de la croix pour fermer le formulaire
document.getElementById('closeButton').addEventListener('click', (event) => {
  event.preventDefault();
  modalbg.style.display = 'none';
});

//fonctionnalitées de la croix pour fermer la lightbox
document.getElementById('closeLightbox').addEventListener('click', (event) => {
  event.preventDefault();
  lightboxbg.style.display = 'none';
});

//clicking outside of the modalbg will close it
window.onclick = function (event) {
  if (event.target == modalbg) {
    modalbg.style.display = "none";
  }
}

//click escape to close modal
window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    modalbg.style.display = 'none'
  }
})

//clicking outside of the lightboxbg will close it
window.onclick = function (event) {
  if (event.target == lightboxbg) {
    lightboxbg.style.display = "none";
  }
}

//click escape to close lightbox
let escBox = "lightbox-background";
 window.onkeyup = function (event) {
  if (event.keyCode == 27) {
    document.getElementById(escBox).style.display="none";
  }
 }
 //enter to open lightbox image
//  let enterOpen = "lightbox-background";
//  window.onkeyup = function (event) {
//   if (event.keyCode == 13) {
//     document.getElementById(enterOpen).style.display="flex";
//   }
//  }

let selectedValue = "";

/**
* 
* fetch
*/

fetch('https://ooxz.github.io/AdrienBrune_6_26112020/photographers.json')
  .then(response => response.json())
  .then(data => {
    const idPhotographer = getParamFromURL('id');
    console.log(idPhotographer);
    if (idPhotographer !== undefined) {
      photographer = getPhotographerFromData(data, idPhotographer);
      const medias = getMediaFromData(data, photographer.id);
      mediasFromData = [...medias];
      console.log("media from data", mediasFromData);
      // displayContent(photographer, medias);
      // totalLikes(medias);
      // likeEventListener();
      // imageLightboxListener();
      refreshDom();
    }
  })
  .catch(error => console.error(error.message));

/**
 * 
 * dropdown menu
 */

document.querySelector('.dropdown__main').addEventListener('click', function () {
  this.querySelector('.dropdown__select').classList.toggle('open')
})


for (const option of document.querySelectorAll('.dropdown__option')) {
  option.addEventListener('click', function () {
    if (!this.classList.contains('selected')) {
      this.parentNode.querySelector('.dropdown__option.selected').classList.remove('selected')
      this.classList.add('selected')
      selectedValue = this.getAttribute("data-value");
      // Filter
      refreshDom();
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

// document.addEventListener('keydown', (e) => {
//   const lightboxBtn = document.querySelectorAll(".photographs__pictures");      
//   const keyCode = e.code
//   if (keyCode === 'Enter') {
//     lightboxBtn.forEach((image) => image.addEventListener("click", (e) => {launchLightbox(e.target)}));
//   }
// })
function imageLightboxListeners() {
  const lightboxBtns = document.querySelectorAll(".photographs__pictures");
  lightboxBtns.forEach((image) => image.addEventListener("keydown", (e) => {launchLightbox(e.target.dataset.id)}));
}
/*
 * FUNCTIONS
 */

function refreshDom() {
  let orderedMedias = filterMedias(selectedValue);
  displayContent(photographer, orderedMedias);
  totalLikes(orderedMedias);
  likeEventListener();
  imageLightboxListener();
}

function displayContent(photographer, medias) {
  const photographerFolder = getPhotographerFolder(photographer.name);
  document.getElementById("modal__name").textContent = `Contactez-moi ${photographer.name}`;
  document.getElementById("photographer__name").textContent = photographer.name;
  document.getElementById("photographer__city").textContent = `${photographer.city},`;
  document.getElementById("photographer__country").textContent = photographer.country;
  document.getElementById("photographer__tagline").textContent = photographer.tagline;
  document.getElementById("photographer__tags").textContent = `${displayTags(photographer.tags)}`;
  var test = document.createElement("IMG");
  test.setAttribute("src", `${getDomainFromUrl()}/FishEye_Photos/Sample_Photos/Photographers_ID_Photos/${photographer.portrait}`);
  document.getElementById("photographer__photo").innerHTML = '';
  document.getElementById("photographer__photo").appendChild(test);
  document.getElementById('photographers__photos').innerHTML = '';
  medias.forEach(item => {
    let baseUrl = `${getDomainFromUrl()}/FishEye_Photos/Sample_Photos/${photographerFolder}/`
    let media = new Media(item, baseUrl)
    document.getElementById('photographers__photos').innerHTML += media.media.displayInList();
  })
}

/**
 * 
 * launch modal form
 */
function launchModal() {
  modalbg.style.display = "block";
}

/**
 * 
 * launch lightbox
 */
function launchLightbox(id) {
  console.log("mediasFromData", mediasFromData);
  const photographerFolder = getPhotographerFolder(photographer.name);
  let baseUrl = `${getDomainFromUrl()}/FishEye_Photos/Sample_Photos/${photographerFolder}/`
  mediasToDisplay = pickUpMediasToDisplay(id);
  let media = mediasToDisplay.media;
  document.querySelector(".lightbox__prev").dataset.id = mediasToDisplay.previous;
  document.querySelector(".lightbox__next").dataset.id = mediasToDisplay.next;
  // const lightboxBtn = document.querySelectorAll(".photographs__pictures");
  lightboxbg.style.display = "block";
  lightboxCnt.style.display = "block";
  
  // lightboxBtn.style.display = "flex";
  if(media.image){
    document.querySelector(".lightbox__container").innerHTML = `<img src="${baseUrl}/${media.image}" style="width:100%"><p>${media.title}</p>`;
    
  }else{
    document.querySelector(".lightbox__container").innerHTML = `<video  controls src="${baseUrl}/${media.title}" style="width:100%" type="video/mp4"></video><p>${media.title}</p>`;
  }
  // photographerTitle.innerHTML = `${photographer.title}`;
}
// image apparait au click
function imageLightboxListener() {
  const lightboxBtn = document.querySelectorAll(".photographs__pictures");
  lightboxBtn.forEach((image) => image.addEventListener("click", (e) => {launchLightbox(e.target.dataset.id)}));
}

// Navigation prochaine et précédente (souris et clavier)
document.querySelector(".lightbox__next").addEventListener('click', (e) => launchLightbox(e.target.dataset.id))
document.querySelector(".lightbox__prev").addEventListener('click', (e) => launchLightbox(e.target.dataset.id))

document.addEventListener('keydown', (e) => {
  const keyCode = e.key
  if (keyCode === 'ArrowRight') {
    launchLightbox(mediasToDisplay.next)
  } else if (keyCode === 'ArrowLeft') {
    launchLightbox(mediasToDisplay.previous)
  } 
    else if (keyCode === 'Enter'){
      let selectedElt = document.querySelector(":focus");
      console.log(selectedElt);
      if (selectedElt.dataset.id != undefined){
        launchLightbox(selectedElt.dataset.id);
      }
      else if (selectedElt.classList.contains("dropdown__trigger")){
        selectedElt.classList.toggle('open');
      }
    }
})

// function goToNextSlide() {
//   const photographerFolder = getPhotographerFolder(photographer.name);
//   let baseUrl = `${getDomainFromUrl()}/FishEye_Photos/Sample_Photos/${photographerFolder}/`
//   let id =  document.querySelector(".lightbox__next").dataset.id;
//   console.log("mediasFromData", mediasFromData);
//   let previousId;
//   let nextId;
//   let mediaIndex = mediasFromData.findIndex(media => media.id == id);
//   if(mediaIndex == 0){
//     previousId = mediasFromData[mediasFromData.length - 1].id; // le dernier item
//     nextId = mediasFromData[1].id;
//   }else if(mediaIndex == (mediasFromData.length - 1)){
//     previousId = mediasFromData[mediasFromData.length - 2].id;
//     nextId = mediasFromData[0].id;
//   }else{
//     previousId = mediasFromData[mediaIndex - 1].id;
//     nextId = mediasFromData[mediaIndex + 1].id;
//   }
//   document.querySelector(".lightbox__next").dataset.id = nextId;
//   document.querySelector(".lightbox__prev").dataset.id = previousId;
//   console.log(id, previousId, nextId);
//   // const lightboxBtn = document.querySelectorAll(".photographs__pictures");
//   lightboxbg.style.display = "block";
//   lightboxCnt.style.display = "block";
//   // lightboxBtn.style.display = "flex";
//   if(mediasFromData[mediaIndex].image){
//     document.querySelector(".lightbox__container").innerHTML = `<img src="${baseUrl}/${mediasFromData[mediaIndex].image}" style="width:100%">`;
//   }else{
//     document.querySelector(".lightbox__container").innerHTML = `<video  controls src="${baseUrl}/${mediasFromData[mediaIndex].video}" style="width:100%" type="video/mp4"></video>`;
//   }
// }
// function goToPreviousSlide() {
//   const photographerFolder = getPhotographerFolder(photographer.name);
//   let baseUrl = `${getDomainFromUrl()}/FishEye_Photos/Sample_Photos/${photographerFolder}/`
//   let id =  document.querySelector(".lightbox__prev").dataset.id;
//   console.log("mediasFromData", mediasFromData);
//   let previousId;
//   let nextId;
//   let mediaIndex = mediasFromData.findIndex(media => media.id == id);
//   if(mediaIndex == 0){
//     previousId = mediasFromData[mediasFromData.length - 1].id; // le dernier item
//     nextId = mediasFromData[1].id;
//   }else if(mediaIndex == (mediasFromData.length - 1)){
//     previousId = mediasFromData[mediasFromData.length - 2].id;
//     nextId = mediasFromData[0].id;
//   }else{
//     previousId = mediasFromData[mediaIndex - 1].id;
//     nextId = mediasFromData[mediaIndex + 1].id;
//   }
//   document.querySelector(".lightbox__next").dataset.id = nextId;
//   document.querySelector(".lightbox__prev").dataset.id = previousId;
//   console.log(id, previousId, nextId);
//   // const lightboxBtn = document.querySelectorAll(".photographs__pictures");
//   lightboxbg.style.display = "block";
//   lightboxCnt.style.display = "block";
//   // lightboxBtn.style.display = "flex";
//   if(mediasFromData[mediaIndex].image){
//     document.querySelector(".lightbox__container").innerHTML = `<img src="${baseUrl}/${mediasFromData[mediaIndex].image}" style="width:100%">`;
//   }else{
//     document.querySelector(".lightbox__container").innerHTML = `<video  controls src="${baseUrl}/${mediasFromData[mediaIndex].video}" style="width:100%" type="video/mp4"></video>`;
//   }
// }

// const setNodeAttributes = (lastItem, currentItem) => {
//   lastItem.style.display = 'none'
//   currentItem.style.display = 'flex'
//   lastItem.setAttribute('aria-hidden', 'true')
//   currentItem.setAttribute('aria-hidden', 'false')
// }


/**
 * 
 * @param {Array} medias 
 */
function totalLikes(medias) {
  const totalLikesNb = document.querySelector('.infos__likes__number')
  const photographerPrice = document.querySelector('.infos__price')
  let number = 0;
  for (let i = 0; i < medias.length; i++) {
    number += medias[i].likes;
  }
  totalLikesNb.innerHTML = `${number} ❤`;
  photographerPrice.innerHTML = `${photographer.price} € / jour`;
}

// Likes count
function likeEventListener() {
  let likesElts = document.querySelectorAll(".pic_like");
  let likesEltsArray = Array.from(likesElts);
  likesEltsArray.forEach(likeBtn => {
    likeBtn.onclick = function (e) {
      let picId = likeBtn.getAttribute("data-id"); // on récupère l'id de la photo
      let pic = mediasFromData.find(media => media.id == picId); // on récup l'image
      pic.likes++;
      refreshDom();
    }
  })
}


function getParamFromURL(param) {
  // source : https://www.sitepoint.com/get-url-parameters-with-javascript/
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const result = urlParams.get(param);
  if (result === null) {
    console.error("Le paramètre n'a pas été trouvé");
    return undefined;
  }
  return result;
}
// function to get picture url
function getDomainFromUrl() {
  let url = new URL(window.location)
  console.log("url", url);
  return url.origin
}

function getPhotographerFromData(data, id) {
  return data.photographers.find(elt => elt.id == id);
}

function getMediaFromData(data, photographerId) {
  console.log("data", data)
  return data.media.filter(elt => elt.photographerId == photographerId)
}

function getPhotographerFolder(photographer) {
  let surname = photographer.split(' ')[0];
  let formalizedSurname = surname.replace('-', ('_'));
  console.log("foldername", formalizedSurname);
  return formalizedSurname;
}


//fonction pour que les # se mettent devant les tags
function displayTags(tags) {
  let stringTemplate = ``;
  tags.forEach(tag => {
    console.log(tag)
    stringTemplate += `#${tag} `
  });
  return stringTemplate
}

function filterMedias(selectedValue) {
  let orderedMedias = null;
  switch (selectedValue) {
    case "popularity":
      orderedMedias = mediasFromData.sort(compareByPopularity);
      break;
    case "date":
      orderedMedias = mediasFromData.sort(compareByDate);
      break;
    case "title":
      orderedMedias = mediasFromData.sort(compareByTitle);
      break;

    default:
      orderedMedias = mediasFromData;
  }

  return orderedMedias;
}

function compareByPopularity(a, b) {
  let likesA = a.likes;
  let likesB = b.likes;
  let comparison = 0;
  if (likesA < likesB) {
    comparison = 1;
  } else if (likesA > likesB) {
    comparison = -1;
  }
  return comparison;
}

function compareByDate(a, b) {
  let dateA = new Date(a.date).getTime();
  let dateB = new Date(b.date).getTime();
  let comparison = 0;
  if (dateA < dateB) {
    comparison = 1;
  } else if (dateA > dateB) {
    comparison = -1;
  }
  return comparison;
}

function compareByTitle(a, b) {
  let titleA = a.title;
  a = titleA.toLowerCase()
  let titleB = b.title;
  b = titleB.toLowerCase()
  let comparison = 0;
  if (titleA > titleB) {
    comparison = 1;
  } else if (titleA < titleB) {
    comparison = -1;
  }
  return comparison;
}

function pickUpMediasToDisplay(id){
  let previous;
  let next;
  let mediaIndex = mediasFromData.findIndex(media => media.id == id);
  if(mediaIndex == 0){
    previous = mediasFromData[mediasFromData.length - 1].id; // le dernier item
    next = mediasFromData[1].id;
  }else if(mediaIndex == (mediasFromData.length - 1)){
    previous = mediasFromData[mediasFromData.length - 2].id;
    next = mediasFromData[0].id;
  }else{
    previous = mediasFromData[mediaIndex - 1].id;
    next = mediasFromData[mediaIndex + 1].id;
  }
  return{
    previous,
    media : mediasFromData[mediaIndex],
    next
  }
}
