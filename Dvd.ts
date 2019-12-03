import { Media } from "./Media";

//Un genre appartenant à Comédie/Drame/Thriller/Action/SF
export enum genreDvd {
    Comédie,Drame,Thriller,Action,SF
}

export class Dvd extends Media {

    // Un EIRD comme identifiant unique
    // comment être sûr du format ??
    
    private realisateur: string;
    private genre: genreDvd;
    private maisonDeProd: string;
    private duree: number;

    constructor(titre: string, nbreEx: number, realisateur: string, genre: genreDvd, maisonDeProd: string, duree: number) {
        super("DVD",titre+realisateur,titre,nbreEx);
        this.realisateur = realisateur;
        this.genre = genre;
        this.maisonDeProd = maisonDeProd;
        this.duree = duree;
    }

    //Méthodes à redéfinir
    public description(): string {
        return (
            "id : " + this.getId() + "\n" +
            "type : " + this.getType() + "\n" +
            "titre : " + this.getTitre() + "\n" +
            "réalisateur : " + this.realisateur + "\n" +
            "genre : " + this.genre + "\n" +
            "duree : " + this.duree + "\n" +
            "maison de prod : " + this.maisonDeProd + "\n"
        );
    }

}

