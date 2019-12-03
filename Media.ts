import { ListeUtils } from "./interfaces/ListeUtils";
import { Liste } from "./collections/Liste";
import { Emprunt } from "./Emprunt";
import { SystemDateManager } from "./utils/SystemDateManager";

export abstract class  Media implements ListeUtils {

    //(Livre, CD ou DVD)
    private type: string;
    private id: string;
    private titre: string;
    private nbreEx: number;

    constructor(type:string, id:string, titre: string, nbreEx: number) {
        this.type = type;
        this.id = id;
        this.titre = titre;
        this.nbreEx = nbreEx;
    }

    //accesseurs : 
    public getType(): string { return this.type; }
    public getId(): string { return this.id; }
    public getTitre(): string { return this.titre; }
    public getNbreEx(): number { return this.nbreEx; }

    // mutateurs :
    public setNbreEx(n: number): void { this.nbreEx = n; }

    //méthodes abstraites, à redéfinir dans les classes concrètes
    public abstract description(): string;


    //méthodes concrètes

    // La date de prochaine disponibilité
    // Elle correspond à la date d'emprunt la plus ancienne du média + 3 semaines (21 jours)
    public dateDeProchaineDispo(liste: Liste<Emprunt>): string {

        if(this.resteDesExemplaires()) return ( this.titre + " est disponible\n" );

        //parcours de la liste des emprunts dans la médiathèque pour trouver les emprunts
        // de ce média et récupération de la date d'emprunt la plus ancienne
        let dateAncienne: Date = new Date();

        liste.debut();
        while(liste.hasNext()) {
            let emprunt = liste.suivant();
            if (emprunt.getMedia().getId() == this.id) {
                let d = emprunt.getDate();
                if (d < dateAncienne) { 
                    dateAncienne = d;
                }
            }
        }

        // on ajoute les 21 jours de la date laplus ancienne des emprunts
        let dateFinale = new Date(dateAncienne.getTime() + 21 * 24 * 60 * 60 * 1000);

        return ( 
            this.titre + " sera disponible à partir du " +
            SystemDateManager.instance.getJour(dateFinale.getDay()) + " " +
            dateFinale.getDate() + " " +
            SystemDateManager.instance.getMois(dateFinale.getMonth()) + " " +
            dateFinale.getFullYear() + "\n"
            );

           
    }

    // Le nombre d’exemplaires disponibles
    public exemplairesDispo(): string { 
        let e = "exemplaire";
        let d = "disponible";
        if (this.nbreEx > 1) {
            e += "s";
            d += "s";
        }
        return (this.nbreEx + " " + e + " " + d)
    }

    public resteDesExemplaires(): boolean { return this.nbreEx > 0; }

    public ajouterUnExemplaire(): void { this.nbreEx ++; }

    public retirerUnExemplaire(): void { if (this.nbreEx > 0) this.nbreEx --; }

}