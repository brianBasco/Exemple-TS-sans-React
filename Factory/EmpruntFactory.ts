import { Fabrique } from "./Fabrique";
import { Emprunt } from "../Emprunt";
import { Emprunteur } from "../Emprunteur";
import { EmprunteurFactory } from "./EmprunteurFactory";
import { MediaFactory } from "./MediaFactory";
import { Media } from "../Media";

export abstract class EmpruntFactory extends Fabrique {

    public static fabrique(e: any) : Emprunt {

        let emprunteur: Emprunteur = EmprunteurFactory.fabrique(e.emprunteur);
        let media: Media = MediaFactory.fabrique(e.media);

        return new Emprunt(emprunteur, media);

    }
}