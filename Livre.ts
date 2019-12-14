import { Media } from "./Media";

export enum genreLivre{
    Policer = "Policier",
    Essai = "Essai",
    SF = "SF",
    Conte = "Conte",
    Roman = "Roman",
    Biographie = "Biographie"
}

export class Livre extends Media {

    //attributs propres à Livre : 
    private readonly auteur: string;
    //Un genre appartenant à Policer/Essai/SF/Conte/Roman/Biographie
    // sous forme d'enum, pour éviter les fautes à l'instanciation
    private readonly genre: genreLivre;
    private readonly maisonEdition: string;
    private readonly nombreDePages: number;

    constructor(titre: string, nbreEx: number, auteur: string, genre: genreLivre, maisonEdition: string, nombreDePages: number) {
        super("Livre",titre+auteur, titre, nbreEx);
        this.auteur = auteur;
        this.genre = genre;
        this.maisonEdition = maisonEdition;
        this.nombreDePages = nombreDePages;
    }

    //Redéfinition des méthodes abstraites : 
    public description(): string { 
        return (
            "id : " + this.getId() + "\n" +
            "type : " + this.getType() + "\n" +
            "titre : " + this.getTitre() + "\n" +
            "auteur : " + this.auteur + "\n" +
            "genre : " + this.genre + "\n" +
            "nombre de pages : " + this.nombreDePages + "\n" +
            "maison d'édition : " + this.maisonEdition + "\n" +
            this.exemplairesDispo()
        );
    }

}

