/*adJson () 
    // http://localhost:8080
    fetch('/Reading/api/file')
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
 
    var requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
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
      
          var superPowers = photographers[i].powers;
          for (var j = 0; j < superPowers.length; j++) {
            var listItem = document.createElement('li');
            listItem.textContent = superPowers[j];
            myList.appendChild(listItem);
          }
      
          myArticle.appendChild(myH2);
          myArticle.appendChild(myPara1);
          myArticle.appendChild(myPara2);
          myArticle.appendChild(myPara3);
          myArticle.appendChild(myList);
      
          section.appendChild(myArticle);
        }
      }