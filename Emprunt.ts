/*
Un emprunt associe un emprunteur avec un média. Cet emprunt est daté. S’il excède
3 semaines, il est « en retard »
*/

import { Media } from "./Media";
import { Emprunteur } from "./Emprunteur";
import { SystemDateManager } from "./utils/SystemDateManager";
import { DateObserver } from "./observateur/DateObserver";


export class Emprunt extends DateObserver  {

    private emprunteur: Emprunteur;
    private media: Media;
    private date: Date;

    private id: string;

    constructor(e: Emprunteur, m: Media) {
        // La clé est composée de l'id de l'emprunteur et de l'id du média
        super();
        this.emprunteur = e;
        this.media = m;
        this.date = new Date();
        this.id = e.getId() + m.getId();
    }

    //getters
    public getEmprunteur(): Emprunteur { return this.emprunteur; } 
    public getMedia() : Media { return this.media; }
    public getDate(): Date { return this.date; }


    public description(): string {
        return (
            "emprunteur [id : " + this.emprunteur.getId() + "], " +
            this.media.getType() +
            ", " + "id : " + this.media.getId() +
            ", emprunté le " + this.date
        )
    }


    // méthodes du Pattern Observateur
    public actualise() {
        this.gestionDesRetards();
    }

    public getId(): string {
        return this.id;
    }
     
    public gestionDesRetards() {
        //let diff = SystemDateManager.instance.diffInDaysWith(this.date);
        let diff = SystemDateManager.instance.diffInSecondsWith(this.date);
        console.log("emprunté le " + this.date + ", retard " + diff);
    }


}