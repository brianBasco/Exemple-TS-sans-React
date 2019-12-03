import { Media } from "./Media";

// genre appartenant à Pop/Rock/Classique/Jazz/Rap
export enum genreCd {
    Pop,Rock,Classique,Jazz,Rap
}

export class Cd extends Media {

    //DiscId comme identifiant unique
    private groupe: string;
    private genre: genreCd;
    private maisonDeProd: string;
    private duree: number;

    constructor(titre: string, nbreEx: number, groupe: string, genre:genreCd, maisonDeProd: string, duree: number) {
        super("CD",titre+groupe,titre,nbreEx);
        this.groupe =groupe;
        this.genre = genre;
        this.maisonDeProd = maisonDeProd;
        this.duree = duree;

    }

    public description(): string { 
        return (
            "id : " + this.getId() + "\n" +
            "type : " + this.getType() + "\n" +
            "titre : " + this.getTitre() + "\n" +
            "groupe : " + this.groupe + "\n" +
            "genre : " + this.genre + "\n" +
            "duree : " + this.duree + "\n" +
            "maison de prod : " + this.maisonDeProd  + "\n"
        );
    }

}

