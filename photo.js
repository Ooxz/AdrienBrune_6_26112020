import Media from './media.class.js';

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
    medias.forEach(item => {
      let baseUrl = `${getDomainFromUrl()}/FishEye_Photos/Sample_Photos/${photographerFolder}/`
      let media = new Media(item, baseUrl)
      document.getElementById('photographers__photos').innerHTML += media.media.displayInList();
      
      
      
    })
    totalLikes(medias);
    likeEventListener();
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

//likes

class Photographer {
  constructor(name, id, city, country, tags, tagline, price, portrait, media) {
    this.name = name,
    this.id = id,
    this.city = city,
    this.country = country,
    this.tags = tags,
    this.tagline = tagline,
    this.price = price,
    this.portrait = portrait,
    this.media = media
  }
}


/**
 * 
 * @param {Array} medias 
 */
function totalLikes(medias) {
  const totalLikesNb = document.querySelector('.infos__likes__number')
  let number = 0;
  for (let i = 0; i < medias.length; i++) {
    number += medias[i].likes;
  }
  totalLikesNb.innerHTML = number;
}
// totalLikes(totalLikesNb);
// console.log(totalLikes());



// let btn = document.getElementById("btn");
                 
// let disp = document.getElementById("display");

// btn.addEventListener('click', () => {
// display.value = parseInt(input.likes) + 1;
// });
// Likes count
function likeEventListener (){
  let likesElts = document.querySelectorAll(".pic_like");
  let likesEltsArray = Array.from(likesElts);
  likesEltsArray.forEach(likeBtn =>{
    likeBtn.onclick = function (e) {
      let parentElt =  e.target.parentNode; // on recup le parent
      let likeElt = parentElt.querySelector('.photo__likes');
      console.log(likeElt)
      let likes = parseInt(likeElt.textContent);
      likeElt.textContent = ++likes;
      const totalLikesNb = document.querySelector('.infos__likes__number');
      let totalLikes = parseInt(totalLikesNb.textContent);
      totalLikesNb.textContent = ++totalLikes;
  }
  })
}
        

        
// sort by date/title/popularité
let popularity = document.getElementById('option1');
let date = document.getElementById('option2');
let titre = document.getElementById('option3');

popularity.addEventListener('click', () => popularitySort(photographer.media))
popularity.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    popularitySort(photographer.media)
  }
})
function popularitySort(media) {
  function tri(a,b) {
    return ((a.likes < b.likes) ? 1 : (a.likes == b.likes) ? 0 : -1)
  }
  media.sort(tri)
  
}
date.addEventListener('click', () => dateSort(photographer.media))
date.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    dateSort(photographer.media)
  }
})
function dateSort(media) {
  function tri(a,b) {
    let dateA = new Date(a.date)
    let dateB = new Date(b.date)
    return ((dateA < dateB) ? 1 : (dateA == dateB) ? 0 : -1)
  }
  media.sort(tri)
  
}
titre.addEventListener('click', () => titleSort(photographer.media))
titre.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    titleSort(photographer.media)
  }
})
function titleSort(media) {
  function tri(a,b) {
    let titleA = a.alt.split(' ').join('')
    a = titleA.toLowerCase()
    let titleB = b.alt.split(' ').join('')
    b = titleB.toLowerCase()
    return (a < b) ? -1 : 1
  }
  media.sort(tri)
  
}


// popularity.addEventListener('click', () => popularitySort(photographerId.media));
// popularity.addEventListener('keypress', (e) => {
//   if (e.keyCode === 13) {
//     popularitySort(photographerId.media);
//   }
// });


// Array.sort(function allLikes(a, b) {
//   return a.likes - b.likes;
// })


// Array.sort(function allTitles(a, b) {
//   if (a.title.toLowerCase() < b.title.toLowerCase()) 
//   return -1;
//   if(a.title.toLowerCase() > b.title.toLowerCase())
//   return 1;
//   return 0;
// })

// Array.sort(function allDates(a, b) {
//   return a.date - b.date;
// })

// export function mediaListSort(target) {
//   //target is the selected criterion element
//   switch (target.innerText) {
//     case "Popularité":
//       Media.sort((a, b) => b.likes - a.likes); // sort from the more liked to the less liked
//       break;
//     case "Date":
//       Media.sort((a, b) => new Date(b.date) - new Date(a.date)); //sort form newest to oldest
//       break;
//     case "Titre":
//       Media.sort(function (a, b) {
//         // sort form 1st to last in alphabetical order
//         if (a.title.toLowerCase() < b.title.toLowerCase()) {
//           return -1;
//         }
//         if (a.title.toLowerCase() > b.title.toLowerCase()) {
//           return 1;
//         } else {
//           return 0;
//         }
//       });
//       break;
//   }
// }