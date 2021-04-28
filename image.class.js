export default class PhotographerImage {
    constructor(item){
        this.id = item.id;
        this.photographerId = item.photographerId;
        this.imageUrl = item.imageUrl;
        this.title = item.title;
        this.tags = item.tags;
        this.likes = item.likes;
        this.date = item.dates;
        this.price = item.price;

    }

    displayInList() {
        let createdCard = `<a class="main__card">
            <div class="card__all">
              <image class="photographs__pictures" src="${this.imageUrl}" alt="FishEye photographers">
              <div class="photo__info">
              <p class="photo__title">${this.title}</p>
              <p class="photo__price">${this.price}€</p>
              <p><span id="display" class="photo__likes" >${this.likes}</span></p>
              <button id="btn" class="fontIcon" value="0">❤</button>
              </div>
              </a>
              </div>
              `
              return createdCard;
    }
}