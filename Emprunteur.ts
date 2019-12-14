/*
Un emprunteur peut emprunter jusqu’à 3 médias //fait
o Il a :
▪ Un identifiant unique
▪ Un nom
▪ Un prénom
▪ Une adresse email
o On peut lui demander
▪ La liste de ses emprunts //fait

*/

import { ListeUtils } from "./interfaces/ListeUtils";
import { Emprunt } from "./Emprunt";
import { Liste } from "./collections/Liste";
import { Mediatheque } from "./Mediatheque";

export class Emprunteur implements ListeUtils {

    //variables d'instances
    private readonly id: string;
    private readonly nom: string;
    private readonly prenom: string;
    private readonly mail: string;

    constructor(nom: string, prenom: string, mail: string) {

        // ID unique : nom + prénom + mail
        this.id = nom + prenom + mail;
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
    }

    //accesseurs
    public getId(): string { return this.id; }
    public getNom(): string { return this.nom; }
    public getPrenom(): string { return this.prenom; }
    public getMail(): string { return this.mail; }

    public afficherListeEmprunt(m: Mediatheque): void {

        let liste = m.getListeDesEmprunts();
        
        console.log(this.nom + " " + this.prenom + " emprunts en cours : ");

        // la listeDesEmprunts implémente un Iterator
        liste.debut();
        while (liste.hasNext()) {
            let emprunt = liste.suivant();
            // Recherche de l'id de l'emprunteur dans la liste
            if (emprunt.getEmprunteur().getId() == this.id) {
                //affichage du média
                console.log(emprunt.getMedia().description());
            }
        }
    }

    public peutEmprunter(liste: Liste<Emprunt>): boolean {

        let count = 0;
            
            liste.debut();
            while(liste.hasNext()) {
                let emprunt = liste.suivant();
                // Recherche de l'id de l'emprunteur dans la liste
                if( emprunt.getEmprunteur().getId() == this.id ) {
                    count ++;
                }
            }
        return (count < 3);
    }

    public description(): string {
        return "[id : " + this.id + "], "+ this.nom + " " + this.prenom + ", " +this.mail;
    }
}


