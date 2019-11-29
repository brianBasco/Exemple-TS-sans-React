import { ListeUtils } from "./interfaces/ListeUtils";
import { Liste } from "./collections/Liste";
import { Emprunt } from "./Emprunt";

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

    //La date de prochaine disponibilité
    public dateDeDispo(liste: Liste<Emprunt>): Date {

        if(this.resteDesExemplaires()) return new Date();

        //parcours de la liste des emprunts dans la médiathèque
            liste.debut();
            while(liste.hasNext()) {
                let emprunt = liste.suivant();
                if (emprunt.getMedia().getId() == this.id) {
                    let d = emprunt.getDate();
                    console.log(d);
                }
            }

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