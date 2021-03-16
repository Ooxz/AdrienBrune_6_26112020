//adJson () 
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
        users.photographers.forEach(infos => {
          document.querySelector("#section2__title").innerHTML += `<image>${infos.portrait}</image`
          document.querySelector("#section2__title").innerHTML += `<h1>${infos.name}</h1`
          document.querySelector("#section2__title").innerHTML += `<h2>${infos.city}</h1`
          document.querySelector("#section2__title").innerHTML += `<h2>${infos.country}</h1`
          document.querySelector("#section2__title").innerHTML += `<h3>${infos.tagline}</h1`
          document.querySelector("#section2__title").innerHTML += `<h4>${infos.price}</h1`
          document.querySelector("#section2__title").innerHTML += `<h5>${infos.tags}</h1`
        })
        console.log(users);
    })
    .catch(function () {
        this.dataError = true;
    })
 
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


