import { displayTags } from './functions.js'

window.onscroll = function () { scrollFunction() }

// http://localhost:8080
fetch('https://ooxz.github.io/AdrienBrune_6_26112020/photographers.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status)
    }
    return response.json()
  })
  .then(json => {
    const users = json
    users.photographers.forEach(photographer => {
      const card = generatedCard(photographer)
      document.getElementById('photographs').innerHTML += card // récupérer la fonction generatedCard et display les cards
    })
    addTagsListener('.bloc_page', users)
  })
  .catch(function () {
    this.dataError = true
  })

// on créé un tableau de tag
function addTagsListener (container, users) {
  const tagElements = Array.from(document.querySelector(container).getElementsByClassName('tag'))

  // pour chaque element du tableau de tags
  tagElements.forEach(elt => {
    elt.addEventListener('click', (e) => {
      e.preventDefault()
      const tag = e.target.textContent.substring(1).toLowerCase() // on défini tag en enlevant # (substring) et en mettant tout en minuscule
      const filtredArray = users.photographers.filter(elt => elt.tags.includes(tag)) // on créé notre filtre
      console.log('tags', tag)
      document.getElementById('photographs').innerHTML = '' // on vide les photos

      // on fait apparaitre les photographes qui comprennent le tag cliqué
      filtredArray.forEach(photographer => {
        const card = generatedCard(photographer)
        document.getElementById('photographs').innerHTML += card
        addTagsListener('#photographs', users)
      })
    })
  })
}

// Affichage des photographes par tag // _________________________________________________________________

// scroll 30 px down and the div shows
function scrollFunction () {
  const scrollDown = document.querySelector('.contenu__link')
  if (window.scrollY > 190) {
    scrollDown.style.display = 'flex'
  } else {
    scrollDown.style.display = 'none'
  }
}
// function scrollFunction () {
//   if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
//     document.getElementById('scroll__div').style.display = 'flex'
//   } else {
//     document.getElementById('scroll__div').style.display = 'none'
//   }
// }

function generatedCard (item) {
  const { name, id, city, country, tags, tagline, price, portrait } = item
  const createdCard = `<a class="main__frame" href="photographer.html?id=${id}">
  <div class="card">
  <div class="card__text">
  <image class="card__img" src="FishEye_Photos/Sample_Photos/Photographers_ID_Photos/${portrait}" alt="FishEye photographers - ${name}">
  <h2 class="card__name">${name}</h2>
  <p class="card__city">${city}, ${country}</p>
  <p class="card__quote">${tagline}</p>
  <p class="card__price">${price}$/jour</p>
  <p class="card__tag">${displayTags(tags)}</p>
  </div>
  </div>
  </a>`

  return createdCard
}

document.addEventListener('keyup', () => {
  console.log(document.querySelector(':focus'))
})
