import PhotographerImage from './image.class.js';
import PhotographerVideo from './video.class.js';

export default class Media {
    constructor(item, baseUrl){
        if(item.image !== undefined){
        item.imageUrl = baseUrl + item.image;
        this.media = new PhotographerImage(item);

    }else{
        item.video = baseUrl + item.video;
        this.media = new PhotographerVideo(item);
    }
}
}