
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


function generatedCard(item) {
  const { name, id, city, country, tags, tagline, price, portrait } = item;
  let createdCard = `<a class="main__frame" href="photographer.html?id=${id}">
            <div class="card">
              <image class="card__img" src="./FishEye_Photos/Sample_Photos/Photographers_ID_Photos/${portrait}" alt="FishEye photographers - ${name}">
              <div class="card__text">
              <h2 class="card__name">${name}</h2>
              <p class="card__city">${city}, ${country}</p>
              <p class="card__quote">${tagline}</p>
              <p class="card__price">${price}$/jour</p>
              </div>
              </a>
              <p class="card__tag">${displayTags(tags)}</p>
              </div>
              
              `
  return createdCard;
}

function displayTags(tags) {
  let stringTemplate = ``;
  tags.forEach(tag => {
    stringTemplate += `<a><span>#${tag}</span></a>`
  });
  return stringTemplate
}


// // Affichage des photographes par tag // _________________________________________________________________

// const navTags = Array.from(document.querySelectorAll('.header__navlink')) // tous les tags du nav
// // accessibilité; aria-current = false pour tous les tags
// navTags.forEach((tag) => {
//   tag.setAttribute('aria-current', 'false') 
// })
// // liste des différents tags
// const arrayTags = [
//   'portrait',
//   'art',
//   'mode',
//   'architecture',
//   'voyage',
//   'sport',
//   'animaux',
//   'evenements',
// ]
// // Affichage des photographes par tag //
// function hashChanged(photographers) {
//   for (let tag of arrayTags) {
//     if (location.hash === `#${tag}`) {
//       // accessibilité; aria-current = page pour la 'page' affichée
//       navTags.forEach((tag) => {
//         tag.setAttribute('aria-current', 'false')
//       })
//       let targetTag = document.getElementById(`${tag}`)
//       targetTag.setAttribute('aria-current', 'page')
//       // affichage des photographes avec le bon tag et dissimulation des autres
//       for (let i = 0; i < photographers.length; i++) {
//         let article = document.getElementById(`article${photographers[i].id}`)
//         const arrayTagPhotographer = photographers[i].tags
//         const index = arrayTagPhotographer.indexOf(tag)
//         if ((index < 0)) {
//           article.style.display = 'none'
//         } else {
//           article.style.display = 'flex'
//         }
//       }
//     }
//   }
// }

// //_____________________________________________________________________________________________________________
