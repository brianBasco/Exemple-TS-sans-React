import { Fabrique } from "./Fabrique";
import { Emprunteur } from "../Emprunteur";

export abstract class EmprunteurFactory extends Fabrique {

    public static fabrique(element: any): Emprunteur {

        return new Emprunteur(element.nom, element.prenom, element.mail);
    }
}