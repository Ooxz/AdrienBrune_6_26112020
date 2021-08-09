/* eslint-disable no-undef */
import Media from './media.class.js'
import { displayTags } from './functions.js'
/**
 *
 * DOM elements
 */
const modalbg = document.querySelector('.bground')
const modalBtn = document.querySelectorAll('.modal-btn')
let mediasFromData = []
let photographer = null
const lightboxbg = document.querySelector('.lightbox-background')
const lightboxCnt = document.querySelector('.lightbox-content')
let mediasToDisplay

/**
 *
 * launch modal event
 */
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal))

// fonctionnalitées de la croix pour fermer le formulaire
document.getElementById('closeButton').addEventListener('click', (event) => {
  event.preventDefault()
  modalbg.style.display = 'none'
})

// fonctionnalitées de la croix pour fermer la lightbox
document.getElementById('closeLightbox').addEventListener('click', (event) => {
  event.preventDefault()
  lightboxbg.style.display = 'none'
})

// clicking outside of the modalbg will close it
window.onclick = function (event) {
  if (event.target === modalbg) {
    modalbg.style.display = 'none'
  }
}

// click escape to close modal
window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    modalbg.style.display = 'none'
  }
})

// clicking outside of the lightboxbg will close it
window.onclick = function (event) {
  if (event.target === lightboxbg) {
    lightboxbg.style.display = 'none'
  }
}

// click escape to close lightbox
const escBox = 'lightbox-background'
window.onkeyup = function (event) {
  if (event.keyCode === 27) {
    document.getElementById(escBox).style.display = 'none'
  }
}

let selectedValue = ''

/**
*
* fetch
*/

fetch('./../photographers.json')
  .then(response => response.json())
  .then(data => {
    const idPhotographer = getParamFromURL('id')
    console.log(idPhotographer)
    if (idPhotographer !== undefined) {
      photographer = getPhotographerFromData(data, idPhotographer)
      const medias = getMediaFromData(data, photographer.id)
      mediasFromData = [...medias]
      console.log('media from data', mediasFromData)
      refreshDom()
    }
  })
  .catch(error => console.error(error.message))

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
      selectedValue = this.getAttribute('data-value')
      // Filter
      refreshDom()
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

/*
 * FUNCTIONS
 */

function refreshDom () {
  const orderedMedias = filterMedias(selectedValue)
  displayContent(photographer, orderedMedias)
  totalLikes(orderedMedias)
  likeEventListener()
  imageLightboxListener()
}

function displayContent (photographer, medias) {
  const photographerFolder = getPhotographerFolder(photographer.name)
  document.getElementById('modal__name').textContent = `Contactez-moi ${photographer.name}`
  document.getElementById('photographer__name').textContent = photographer.name
  document.getElementById('photographer__city').textContent = `${photographer.city},`
  document.getElementById('photographer__country').textContent = photographer.country
  document.getElementById('photographer__tagline').textContent = photographer.tagline
  document.getElementById('photographer__tags').innerHTML = `${displayTags(photographer.tags)}`
  const test = document.createElement('IMG')
  test.setAttribute('src', `${getDomainFromUrl()}/FishEye_Photos/Sample_Photos/Photographers_ID_Photos/${photographer.portrait}`)
  document.getElementById('photographer__photo').innerHTML = ''
  document.getElementById('photographer__photo').appendChild(test)
  document.getElementById('photographers__photos').innerHTML = ''
  medias.forEach(item => {
    const baseUrl = `${getDomainFromUrl()}/FishEye_Photos/Sample_Photos/${photographerFolder}/`
    const media = new Media(item, baseUrl)
    document.getElementById('photographers__photos').innerHTML += media.media.displayInList()
  })
}

/**
 *
 * launch modal form
 */
function launchModal () {
  modalbg.style.display = 'block'
}

/**
 *
 * launch lightbox
 */
function launchLightbox (id) {
  console.log('mediasFromData', mediasFromData)
  const photographerFolder = getPhotographerFolder(photographer.name)
  const baseUrl = `${getDomainFromUrl()}/FishEye_Photos/Sample_Photos/${photographerFolder}/`
  mediasToDisplay = pickUpMediasToDisplay(id)
  const media = mediasToDisplay.media
  document.querySelector('.lightbox__prev').dataset.id = mediasToDisplay.previous
  document.querySelector('.lightbox__next').dataset.id = mediasToDisplay.next
  // const lightboxBtn = document.querySelectorAll(".photographs__pictures");
  lightboxbg.style.display = 'block'
  lightboxCnt.style.display = 'block'

  // lightboxBtn.style.display = "flex";
  if (media.image) {
    document.querySelector('.lightbox__container').innerHTML = `<img src="${baseUrl}/${media.image}" style="width:100%"><p class="lightbox__title">${media.title}</p>`
  } else {
    document.querySelector('.lightbox__container').innerHTML = `<video  controls src="${baseUrl}/${media.video}" style="width:100%" type="video/mp4"></video><p class="lightbox__title">${media.title}</p>`
  }
  // photographerTitle.innerHTML = `${photographer.title}`;
}
// image apparait au click
function imageLightboxListener () {
  const lightboxBtn = document.querySelectorAll('.photographs__pictures')
  lightboxBtn.forEach((image) => image.addEventListener('click', (e) => { launchLightbox(e.target.dataset.id) }))
}

// Navigation prochaine et précédente (souris et clavier)
document.querySelector('.lightbox__next').addEventListener('click', (e) => launchLightbox(e.target.dataset.id))
document.querySelector('.lightbox__prev').addEventListener('click', (e) => launchLightbox(e.target.dataset.id))

document.addEventListener('keydown', (e) => {
  const keyCode = e.key
  if (keyCode === 'ArrowRight') {
    launchLightbox(mediasToDisplay.next)
  } else if (keyCode === 'ArrowLeft') {
    launchLightbox(mediasToDisplay.previous)
  } else if (keyCode === 'Enter') {
    const selectedElt = document.querySelector(':focus')
    console.log(selectedElt)
    if (selectedElt.dataset.id !== undefined && !selectedElt.classList.contains('pic_like')) {
      launchLightbox(selectedElt.dataset.id)
    } else if (selectedElt.classList.contains('dropdown__trigger')) {
      document.querySelector('.dropdown__select').classList.toggle('open')
    } else if (selectedElt.classList.contains('dropdown__option')) {
      selectedValue = selectedElt.getAttribute('data-value')
      // Filter
      refreshDom()
      selectedElt.closest('.dropdown__select').querySelector('.dropdown__trigger span').textContent = selectedElt.textContent
      document.querySelector('.dropdown__select').classList.toggle('open')
    } else if (selectedElt.dataset.id !== undefined && selectedElt.classList.contains('pic_like')) {
      const pic = mediasFromData.find(media => media.id === parseInt(selectedElt.dataset.id))
      pic.likes++
      console.log(pic)
      refreshDom()
      window.setTimeout(function () {
        const selected = document.querySelector(':focus')
        console.log(selected, selectedElt)
        selectedElt.focus()
      }, 0)
    }
  }
})

/**
 *
 * @param {Array} medias
 */
function totalLikes (medias) {
  const totalLikesNb = document.querySelector('.infos__likes__number')
  const photographerPrice = document.querySelector('.infos__price')
  let number = 0
  for (let i = 0; i < medias.length; i++) {
    number += medias[i].likes
  }
  totalLikesNb.innerHTML = `${number} ❤`
  photographerPrice.innerHTML = `${photographer.price} € / jour`
}

// Likes count
function likeEventListener () {
  const likesElts = document.querySelectorAll('.pic_like')
  const likesEltsArray = Array.from(likesElts)
  likesEltsArray.forEach(likeBtn => {
    likeBtn.onclick = function (e) {
      const picId = likeBtn.getAttribute('data-id') // on récupère l'id de la photo
      const pic = mediasFromData.find(media => media.id === parseInt(picId)) // on récup l'image
      pic.likes++
      refreshDom()
    }
  })
}

function getParamFromURL (param) {
  // source : https://www.sitepoint.com/get-url-parameters-with-javascript/
  const queryString = window.location.search
  console.log(queryString)
  const urlParams = new URLSearchParams(queryString)
  const result = urlParams.get(param)
  if (result === null) {
    console.error("Le paramètre n'a pas été trouvé")
    return undefined
  }
  return result
}
// function to get picture url
function getDomainFromUrl () {
  const url = new URL(window.location)
  console.log('url', url)
  return url.origin
}

function getPhotographerFromData (data, id) {
  return data.photographers.find(elt => elt.id === parseInt(id))
}

function getMediaFromData (data, photographerId) {
  console.log('data', data)
  return data.media.filter(elt => elt.photographerId === photographerId)
}

function getPhotographerFolder (photographer) {
  const surname = photographer.split(' ')[0]
  const formalizedSurname = surname.replace('-', ('_'))
  console.log('foldername', formalizedSurname)
  return formalizedSurname
}

function filterMedias (selectedValue) {
  let orderedMedias = null
  switch (selectedValue) {
    case 'popularity':
      orderedMedias = mediasFromData.sort(compareByPopularity)
      break
    case 'date':
      orderedMedias = mediasFromData.sort(compareByDate)
      break
    case 'title':
      orderedMedias = mediasFromData.sort(compareByTitle)
      break

    default:
      orderedMedias = mediasFromData
  }

  return orderedMedias
}

function compareByPopularity (a, b) {
  const likesA = a.likes
  const likesB = b.likes
  let comparison = 0
  if (likesA < likesB) {
    comparison = 1
  } else if (likesA > likesB) {
    comparison = -1
  }
  return comparison
}

function compareByDate (a, b) {
  const dateA = new Date(a.date).getTime()
  const dateB = new Date(b.date).getTime()
  let comparison = 0
  if (dateA < dateB) {
    comparison = 1
  } else if (dateA > dateB) {
    comparison = -1
  }
  return comparison
}

function compareByTitle (a, b) {
  const titleA = a.title
  a = titleA.toLowerCase()
  const titleB = b.title
  b = titleB.toLowerCase()
  let comparison = 0
  if (titleA > titleB) {
    comparison = 1
  } else if (titleA < titleB) {
    comparison = -1
  }
  return comparison
}

function pickUpMediasToDisplay (id) {
  let previous
  let next
  const mediaIndex = mediasFromData.findIndex(media => media.id === parseInt(id))
  if (mediaIndex === 0) {
    previous = mediasFromData[mediasFromData.length - 1].id // le dernier item
    next = mediasFromData[1].id
  } else if (mediaIndex === (mediasFromData.length - 1)) {
    previous = mediasFromData[mediasFromData.length - 2].id
    next = mediasFromData[0].id
  } else {
    previous = mediasFromData[mediaIndex - 1].id
    next = mediasFromData[mediaIndex + 1].id
  }
  return {
    previous,
    media: mediasFromData[mediaIndex],
    next
  }
}

// function to indicate errors in the form linked with checkradio checkstring checklenght
function validate () {
  let isValid = true
  isValidSurname = checkString(document.getElementById('first'), 'Prénom', (document.getElementById('missFirst')))
  isValidName = checkString(document.getElementById('last'), 'Nom', (document.getElementById('missLast')))
  isValidEmail = checkString(document.getElementById('email'), 'e-mail', (document.getElementById('missEmail')))
  isValidFirstLength = checkLength(document.getElementById('first'), (document.getElementById('missFirstNbr')))
  isValidLastLength = checkLength(document.getElementById('last'), (document.getElementById('missLastNbr')))
  isValidForm = checkForm(document.getElementById('formId'))
  isValid = isValidSurname && isValidName && isValidEmail && isValidFirstLength && isValidForm && isValidLastLength && isValidForm
  return isValid
}

// make sure email is valid
function validateEmail (sEmail) {
  const reEmail = /^(?:[\w!#$%&'*+\-/=?^`{|}~]+\.)*[\w!#$%&'*+\-/=?^`{|}~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/

  if (!sEmail.match(reEmail) && document.reserve.email.value !== '') {
    badEmail.textContent = 'E-mail non conforme'
    badEmail.style.color = 'red'
    document.reserve.email.focus()
    return false
  }

  return true
}

function checkString (entryElt, entryName, errorElt) {
  let isValid = true
  // checkEmpty
  console.log(entryElt)
  if (entryElt.value === '') {
    errorElt.textContent = `${entryName} manquant!`
    errorElt.style.color = 'red'
    entryElt.focus()
    isValid = false
  }
  return isValid
}

function checkLength (entryElt, errorElt) {
  let isValid = true
  // check Less Than 2
  if (entryElt.value.length <= 2 && entryElt.value !== '') {
    errorElt.textContent = 'Il faut plus de 2 caractères!'
    errorElt.style.color = 'red'
    entryElt.focus()
    isValid = false
  }
  return isValid
}
