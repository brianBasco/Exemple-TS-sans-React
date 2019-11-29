import { Livre } from "./../Livre";
import { Cd } from "./../Cd";
import { Dvd } from "./../Dvd";
import { Fabrique } from "./Fabrique";
import { Media } from "../Media";

export abstract class MediaFactory extends Fabrique{

    public static fabrique(m: any): Media{

        if (m.type == "Livre") {
            let livre = new Livre(m.titre,m.nbreEx,m.auteur,m.genre,m.maisonEdition,m.nombreDePages);
            return livre;
        }

        if (m.type == "CD") {
            let cd = new Cd(m.titre,m.nbreEx,m.groupe,m.genre,m.maisonDeProd,m.duree);
            return cd;
        }

        if (m.type == "DVD") {
            let dvd = new Dvd(m.titre,m.nbreEx,m.realisateur,m.genre,m.maisonDeProd,m.duree);
            return dvd;
        }
    }
}