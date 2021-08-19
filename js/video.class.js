export default class PhotographerVideo {
  constructor (item) {
    this.id = item.id
    this.photographerId = item.photographerId
    this.videoUrl = item.videoUrl
    this.title = item.title
    this.tags = item.tags
    this.likes = item.likes
    this.date = item.dates
    this.price = item.price
  }

  displayInList () {
    const createdCard = `<a class="main__card">
            <div class="card__all">
            <video class="photographs__pictures" tabindex="0" data-id="${this.id}" src="${this.videoUrl}" alt="${this.title}" type="video/mp4"></video>
            <img class="logoPlay" src="FishEye_Photos/play.png" alt="" tabindex="-1">
              <div class="photo__info">
              <p class="photo__title">${this.title}</p>
              <p class="photo__price">${this.price}€</p>
              <p><span id="display" class="photo__likes" >${this.likes}</span></p>
              <span class="pic_like fontIcon" data-id="${this.id}" value="0">❤</span>
              </div>
              </a>
              </div>
              `
    return createdCard
  }
}
