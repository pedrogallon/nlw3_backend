import Orphanage from "../models/Orphanage"
import imagesView from "./images_view";

export default {
    render(orphanage: Orphanage){
        var tempLat:number = parseFloat(orphanage.latitude.toString());
        var tempLng:number = parseFloat(orphanage.longitude.toString());
        
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: tempLat,
            longitude: tempLng,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: imagesView.renderMany(orphanage.images)
        };
    },

    renderMany(orphanages: Orphanage[]){
        return orphanages.map(orphanage => this.render(orphanage));
    }
} 