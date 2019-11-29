import { Liste } from "../collections/Liste";
import { ListeUtils } from "../interfaces/ListeUtils";
import { Fabrique } from "../Factory/Fabrique";

export class Chargeur<T extends ListeUtils> {

    protected liste: string;
    private fabrique: Fabrique;

    constructor (liste: string, fabrique: Fabrique) {
        this.liste = liste;
        this.fabrique = fabrique;
    }

    public charger() : Liste<T>{
        let l = JSON.parse(this.liste);

        let nouvelleListe: Liste<T> = new Liste();

        for (let element of l) {
            nouvelleListe.add(this.fabrique.fabrique(element));
        }

        return nouvelleListe;
    }
}