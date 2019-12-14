import { Iterateur } from "../iterateur/Iterateur";
import { ListeUtils } from "../interfaces/ListeUtils";

// liste, générique, permet d'enregistrer les colellections de :
// médias, emprunteurs, emprunts et plus
// implémente l'interface Iterateur

export class Liste<T extends ListeUtils> implements Iterateur<T> {

    public index: number;
    private liste: T[]

    constructor() {
        this.index = -1;
        this.liste = new Array();
    }

    //méthodes de l'interface Iterateur
    public debut(): void {
        this.index = -1;
    }

    public hasNext(): boolean {
        return this.index < this.liste.length -1;
    }

    public suivant(): T {
        this.index ++;
        return this.liste[this.index];
    }

    // méthodes pour gérer la collection

    // ajout, avec gestion des doublons
    // renvoie un booléen pour savoir si l'ajout a été effectué
    public add(element: T): boolean {

        if ( !this.estEnDouble(element.getId()) ) {
            this.liste.push(element);
            return true;
        }
        return false;
    }

    public remove(clé: string): T | null {

        let i = 0;

        for (let element of this.liste) {
            if ( clé == element.getId() )
            { 
                // on retourne le seul élément du tableau retourné par splice
                return this.liste.splice(i, 1)[0];
            }
            else { i++; }
        }
        // si l'élement à effacer n'est pas dans la liste, on retourne null
        // Lancer une Exception aurait été plus élégant pour le coup.
        return null;
    }

    public taille() : number { return this.liste.length; }

    private estEnDouble(cle : string ): boolean {
        for (let e of this.liste) {
            if (e.getId() == cle) {
                return true;
            }
        return false;
        }
    }

    public getUnElement(element: T) : T {

        for (let e of this.liste) {
            if (e.getId() == element.getId()) return e;
        }

        // Si on ne trouve pas l'élément on retourne null
        return null;
    }
}