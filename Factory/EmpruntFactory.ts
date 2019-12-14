import { Fabrique } from "./Fabrique";
import { Emprunt } from "../Emprunt";
import { Emprunteur } from "../Emprunteur";
import { EmprunteurFactory } from "./EmprunteurFactory";
import { MediaFactory } from "./MediaFactory";
import { Media } from "../Media";
import { Mediatheque } from "../Mediatheque";

export abstract class EmpruntFactory extends Fabrique {

    public static fabrique(e: any) : Emprunt {

        
        let emprunteur: Emprunteur = EmprunteurFactory.fabrique(e.emprunteur);
        let media: Media = MediaFactory.fabrique(e.media);
        
        // recherche de la ref du média et de l'emprunteur dans la liste de la médiathèque
        // pour ne pas avoir de refs de média et d'emprunteurs en double
        let mediaDeLaListe = Mediatheque.getInstance().getUnMedia(media);
        let emprunteurDeLaListe = Mediatheque.getInstance().getUnEmprunteur(emprunteur);
        
        if (emprunteurDeLaListe == null) throw new Error ("emprunteur inconnu");
        if (mediaDeLaListe == null) throw new Error ("média inconnu");
        
        // enlève un exemplaire du média
        mediaDeLaListe.retirerUnExemplaire();

        return new Emprunt(emprunteurDeLaListe, mediaDeLaListe);

    }
}