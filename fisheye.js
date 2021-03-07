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


/*adJson () 
    // http://localhost:8080
    fetch('https://ooxz.github.io/AdrienBrune_6_26112020/photographers.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(json => {
        this.users = json;
        //console.log(this.users);
    })
    .catch(function () {
        this.dataError = true;
    })*/
 
    /*var requestURL = 'https://ooxz.github.io/AdrienBrune_6_26112020/photographers.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var photographers = request.response;
        populateHeader(photographers);
        showPhotographers(photographers);
      }
      function populateHeader(jsonObj) {
        var myH1 = document.createElement('h1');
        myH1.textContent = jsonObj['photographers'];
        header.appendChild(myH1);
      }

      function showPhotographers(jsonObj) {
        var photographers = jsonObj['members'];
      
        for (var i = 0; i < photographers.length; i++) {
          var myArticle = document.createElement('article');
          var myH2 = document.createElement('h2');
          var myPara1 = document.createElement('p');
          var myPara2 = document.createElement('p');
          var myPara3 = document.createElement('p');
          var myList = document.createElement('ul');
      
          myH2.textContent = photographers[i].name;
          myPara1.textContent = 'city: ' + photographers[i].city;
          myPara2.textContent = 'country: ' + photographers[i].country;
          myPara3.textContent = 'Superpowers:';
      
          var superPhoto = photographers[i].powers;
          for (var j = 0; j < superPhoto.length; j++) {
            var listItem = document.createElement('li');
            listItem.textContent = superPhoto[j];
            myList.appendChild(listItem);
          }
      
          myArticle.appendChild(myH2);
          myArticle.appendChild(myPara1);
          myArticle.appendChild(myPara2);
          myArticle.appendChild(myPara3);
          myArticle.appendChild(myList);
      
          section.appendChild(myArticle);
        }
      }*/

      /*fetch('photographers.json')
      .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
  function appendData(data) {
    var mainContainer = document.getElementById("myData");
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = 'photographers: ' + data[i].name + ' ' + data[i].city;
        mainContainer.appendChild(div);
    }
}*/
//scroll 10 px down and the div shows
      window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    document.getElementById("scroll__div").style.top = "0";
  } else {
    document.getElementById("scroll__div").style.top = "-50px";
  }
}

//click on div to go to the top of the page
var scroll__topbtn = document.getElementById("scroll__topbtn")
var rootElement = document.documentElement

function scrollToTop() {
  // Scroll to top logic
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}
scroll__topbtn.addEventListener("click", scrollToTop)