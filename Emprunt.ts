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

    private readonly id: string;

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

        let jour = this.date.getDay();
        let mois = this.date.getMonth();
        let sdm = SystemDateManager.instance;

        return (
            "emprunteur [id : " + this.emprunteur.getId() + "], " +
            this.media.getType() +
            ", " + "id : " + this.media.getId() +
            ", emprunté le " + sdm.getJour(jour) + " " + this.date.getUTCDate() +
            " " + sdm.getMois(mois) + " " + this.date.getFullYear() + "\n" +
            this.media.exemplairesDispo()
        )
    }


    // méthodes du Pattern Observateur
    public actualise(): void {

        // si il y a un retard entre la date du System Manager et la date de l'emprunt
        // envoi du mail. Un mail par retard et par emprunteur. On pourrait envoyer un mail
        // à un emprunteur avec la liste des retards.
        let retard = this.gestionDesRetards();
        let tolerance = 20;
        if ( retard > tolerance ) {

            let difference  = retard - tolerance;
            let jour: string;
            difference > 1 ? jour = " jours" : jour =" jour";
            //envoi du mail
            let media = this.getMedia();
            let adresse: string = this.getEmprunteur().getMail();
            let sujet: string = "Médiathèque - Date limite de retour";
            let contenu: string = 
                "Vous n'avez pas rendu le média suivant : \n" +
                media.description() + "\n" +
                "Une pénalité peut s'appliquer pour ce retard de " + difference + jour + "\n";

            this.sendMail(adresse, sujet, contenu);
        }
    }

    public getId(): string {
        return this.id;
    }
     
    // 
    public gestionDesRetards(): number {
        let diff = SystemDateManager.instance.diffInDaysWith(this.date);
        return diff;
    }

    //// Envoyer un e-mail ////
    private sendMail(address: string, subject: string, content: string) {
        let mail = `Mail from: mediatheque@lecnam.net
            To: ${address}
            Subject: ${subject}
        
            ${content}`;
    
            //window.alert(mail)
            console.log(mail);
        }


}