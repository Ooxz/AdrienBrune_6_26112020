// import { photo } from 'js\photo.js'

// const lightboxbg = document.querySelector(".lightbox-background");
// const lightboxCnt = document.querySelector(".lightbox-content");
// let lightboxBtn = document.querySelectorAll(".photographs__pictures");

// //fonctionnalitées de la croix pour fermer la lightbox
// document.getElementById('closeLightbox').addEventListener('click', (event) => {
// 	event.preventDefault();
// 	lightboxbg.style.display = 'none';
//   });

//   //clicking outside of the lightboxbg will close it
// window.onclick = function (event) {
// 	if (event.target == lightboxbg) {
// 	  lightboxbg.style.display = "none";
// 	}
//   }

//   //click escape to close lightbox
//   let boxid = "lightbox-background";
//    window.onkeyup = function (event) {
// 	if (event.keyCode == 27) {
// 	  document.getElementById(boxid).style.display="none";
// 	}
//    }

//    /**
//  *
//  * launch lightbox
//  */
// function launchLightbox(elt) {
// 	console.log("mediasFromData", mediasFromData);
// 	const photographerFolder = getPhotographerFolder(photographer.name);
// 	let baseUrl = `${getDomainFromUrl()}/FishEye_Photos/Sample_Photos/${photographerFolder}/`
// 	let mediasToDisplay = pickUpMediasToDisplay(elt.dataset.id);
// 	let media = mediasToDisplay.media;
// 	document.querySelector(".lightbox__prev").dataset.id = mediasToDisplay.previous;
// 	document.querySelector(".lightbox__next").dataset.id = mediasToDisplay.next;
// 	// const lightboxBtn = document.querySelectorAll(".photographs__pictures");
// 	lightboxbg.style.display = "block";
// 	lightboxCnt.style.display = "block";

// 	// lightboxBtn.style.display = "flex";
// 	if(media.image){
// 	  document.querySelector(".lightbox__container").innerHTML = `<img src="${baseUrl}/${media.image}" style="width:100%"><p>${media.title}</p>`;

// 	}else{
// 	  document.querySelector(".lightbox__container").innerHTML = `<video  controls src="${baseUrl}/${media.title}" style="width:100%" type="video/mp4"></video>`;
// 	}
// 	// photographerTitle.innerHTML = `${photographer.title}`;
//   }
//   // image apparait au click
//   function imageLightboxListener() {
// 	const lightboxBtn = document.querySelectorAll(".photographs__pictures");
// 	lightboxBtn.forEach((image) => image.addEventListener("click", (e) => {launchLightbox(e.target)}));
//   }

//   // Navigation prochaine et précédente (souris et clavier)
//   document.querySelector(".lightbox__next").addEventListener('click', (e) => launchLightbox(e.target))
//   document.querySelector(".lightbox__prev").addEventListener('click', (e) => launchLightbox(e.target))

//   document.addEventListener('keydown', (e) => {
// 	const keyCode = e.key
// 	if (keyCode === 'ArrowRight') {
// 	  goToNextSlide()
// 	} else if (keyCode === 'ArrowLeft') {
// 	  goToPreviousSlide()
// 	}
//   })

//   function goToNextSlide() {
// 	const photographerFolder = getPhotographerFolder(photographer.name);
// 	let baseUrl = `${getDomainFromUrl()}/FishEye_Photos/Sample_Photos/${photographerFolder}/`
// 	let id =  document.querySelector(".lightbox__next").dataset.id;
// 	console.log("mediasFromData", mediasFromData);
// 	let previousId;
// 	let nextId;
// 	let mediaIndex = mediasFromData.findIndex(media => media.id == id);
// 	if(mediaIndex == 0){
// 	  previousId = mediasFromData[mediasFromData.length - 1].id; // le dernier item
// 	  nextId = mediasFromData[1].id;
// 	}else if(mediaIndex == (mediasFromData.length - 1)){
// 	  previousId = mediasFromData[mediasFromData.length - 2].id;
// 	  nextId = mediasFromData[0].id;
// 	}else{
// 	  previousId = mediasFromData[mediaIndex - 1].id;
// 	  nextId = mediasFromData[mediaIndex + 1].id;
// 	}
// 	document.querySelector(".lightbox__next").dataset.id = nextId;
// 	document.querySelector(".lightbox__prev").dataset.id = previousId;
// 	console.log(id, previousId, nextId);
// 	// const lightboxBtn = document.querySelectorAll(".photographs__pictures");
// 	lightboxbg.style.display = "block";
// 	lightboxCnt.style.display = "block";
// 	// lightboxBtn.style.display = "flex";
// 	if(mediasFromData[mediaIndex].image){
// 	  document.querySelector(".lightbox__container").innerHTML = `<img src="${baseUrl}/${mediasFromData[mediaIndex].image}" style="width:100%">`;
// 	}else{
// 	  document.querySelector(".lightbox__container").innerHTML = `<video  controls src="${baseUrl}/${mediasFromData[mediaIndex].video}" style="width:100%" type="video/mp4"></video>`;
// 	}
//   }
//   function goToPreviousSlide() {
// 	const photographerFolder = getPhotographerFolder(photographer.name);
// 	let baseUrl = `${getDomainFromUrl()}/FishEye_Photos/Sample_Photos/${photographerFolder}/`
// 	let id =  document.querySelector(".lightbox__prev").dataset.id;
// 	console.log("mediasFromData", mediasFromData);
// 	let previousId;
// 	let nextId;
// 	let mediaIndex = mediasFromData.findIndex(media => media.id == id);
// 	if(mediaIndex == 0){
// 	  previousId = mediasFromData[mediasFromData.length - 1].id; // le dernier item
// 	  nextId = mediasFromData[1].id;
// 	}else if(mediaIndex == (mediasFromData.length - 1)){
// 	  previousId = mediasFromData[mediasFromData.length - 2].id;
// 	  nextId = mediasFromData[0].id;
// 	}else{
// 	  previousId = mediasFromData[mediaIndex - 1].id;
// 	  nextId = mediasFromData[mediaIndex + 1].id;
// 	}
// 	document.querySelector(".lightbox__next").dataset.id = nextId;
// 	document.querySelector(".lightbox__prev").dataset.id = previousId;
// 	console.log(id, previousId, nextId);
// 	// const lightboxBtn = document.querySelectorAll(".photographs__pictures");
// 	lightboxbg.style.display = "block";
// 	lightboxCnt.style.display = "block";
// 	// lightboxBtn.style.display = "flex";
// 	if(mediasFromData[mediaIndex].image){
// 	  document.querySelector(".lightbox__container").innerHTML = `<img src="${baseUrl}/${mediasFromData[mediaIndex].image}" style="width:100%">`;
// 	}else{
// 	  document.querySelector(".lightbox__container").innerHTML = `<video  controls src="${baseUrl}/${mediasFromData[mediaIndex].video}" style="width:100%" type="video/mp4"></video>`;
// 	}
//   }

//   function pickUpMediasToDisplay(id){
// 	let previous;
// 	let next;
// 	let mediaIndex = mediasFromData.findIndex(media => media.id == id);
// 	if(mediaIndex == 0){
// 	  previous = mediasFromData[mediasFromData.length - 1].id; // le dernier item
// 	  next = mediasFromData[1].id;
// 	}else if(mediaIndex == (mediasFromData.length - 1)){
// 	  previous = mediasFromData[mediasFromData.length - 2].id;
// 	  next = mediasFromData[0].id;
// 	}else{
// 	  previous = mediasFromData[mediaIndex - 1].id;
// 	  next = mediasFromData[mediaIndex + 1].id;
// 	}
// 	return{
// 	  previous,
// 	  media : mediasFromData[mediaIndex],
// 	  next
// 	}
//   }

//   export { lightbox }
