readJson () 
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
    })
 

