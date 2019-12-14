import { Media } from "./Media";

//Un genre appartenant à Comédie/Drame/Thriller/Action/SF
export enum genreDvd {
    Comédie = "Comédie",
    Drame = "Drame",
    Thriller = "Thriller",
    Action = "Action",
    SF = "SF"
}

export class Dvd extends Media {

    // Un EIRD comme identifiant unique
    // comment être sûr du format ??
    
    private readonly realisateur: string;
    private readonly genre: genreDvd;
    private readonly maisonDeProd: string;
    private readonly duree: number;

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

