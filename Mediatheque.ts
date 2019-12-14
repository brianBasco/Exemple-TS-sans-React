/*
Une médiathèque
o Elle est unique //fait
o Elle a :
▪ Une liste des médias  // fait
▪ Une liste des emprunteurs //fait
▪ Une liste des emprunts  //fait
o On peut lui demander
▪ D’ajouter / supprimer un emprunteur //fait
▪ D’ajouter / supprimer un média //fait
▪ D’ajouter / retirer un exemplaire d’un média //fait
▪ Emprunter un média pour un emprunteur //fait
▪ Rendre un média pour un emprunteur //fait
▪ D’envoyer un mail à tous les emprunteurs avec la liste des emprunts
en retard
▪ De se sauver en string JSON //fait
▪ De se charger à partir d’un string JSON //fait
*/

import { Media } from "./Media";
import { Emprunteur } from "./Emprunteur";
import { Emprunt } from "./Emprunt";
import { DateObserver } from "./observateur/DateObserver";
import { Sujet } from "./observateur/Sujet";
import { Liste } from "./collections/Liste";
import { ListeUtils } from "./interfaces/ListeUtils";
import { MediaFactory } from "./Factory/MediaFactory";
import { Chargeur } from "./utils/Chargeur";
import { EmprunteurFactory } from "./Factory/EmprunteurFactory";
import { EmpruntFactory } from "./Factory/EmpruntFactory";


// La gestion des retards pour les emprunts est portée par la classe Emprunt, qui étend
// la classe DateObserver, la médiathèque est le sujet, le sujet contient la liste des
// observers

export class Mediatheque extends Sujet {

    private static instance: Mediatheque;

    // La médiathèque est unique, ce doit être un singleton.
    // On ne pourra l'instancier qu'une seule fois et récupérer l'instance au travers
    // de la méthode getInstance()
    public static getInstance(): Mediatheque {

        if(Mediatheque.instance == null) Mediatheque.instance = new Mediatheque();

        return Mediatheque.instance;

    }

    // la classe Liste implémente l'interface Iterateur et empêche les doublons
    private listeDesMedias: Liste<Media>;
    private listeDesEmprunteurs: Liste<Emprunteur>;
    private listeDesEmprunts: Liste<Emprunt>;

    private date: Date;

    constructor() {
        super();
        this.listeDesMedias = new Liste();
        this.listeDesEmprunteurs = new Liste();
        this.listeDesEmprunts = new Liste();

        this.notify();

    }

    // ------------------------- Accesseurs ------------------------ //
    public getListeDesEmprunts(): Liste<Emprunt> {
        return this.listeDesEmprunts;
    }

    public getUnMedia(m: Media): Media {
        return this.listeDesMedias.getUnElement(m);
    }

    public getUnEmprunteur(e : Emprunteur) {
        return this.listeDesEmprunteurs.getUnElement(e);
    }

    // ----------------  Méthodes Utilisateur ----------------------

    // ajoute une emprunteur à la liste des emprunteurs et ajoute cette médiathèque
    // à l'emprunteur
    public ajouterUnEmprunteur(emprunteur: Emprunteur): void {

        if ( this.listeDesEmprunteurs.add(emprunteur)) {
            console.log("emprunteur n° " + emprunteur.getId() + " ajouté");
            return;
        }
        console.log("emprunteur n° " + emprunteur.getId() + " n'a pas été ajouté");
    }

    public supprimmerUnEmprunteur(emprunteur: Emprunteur): void {

        let res = this.listeDesEmprunteurs.remove(emprunteur.getId());
        if (res != null) {
            console.log("emprunteur n° " + emprunteur.getId() + " supprimé");
            return;
        }

        ("emprunteur n° " + emprunteur.getId() + " n'était pas dans la liste des emprunteurs");
    }

    public ajouterUnMedia(m : Media): void {
       
        if ( this.listeDesMedias.add(m) ) {
            console.log("média n° " + m.getId() + " ajouté dans la liste" );
            return;
        }
        console.log("média n° " + m.getId() + " n'a pas été ajouté dans la liste" );
    }

    public supprimmerUnMedia(m : Media): void {
        // suppression d'un média grâce à son Id
        //la méthode remove retourne le média supprimé

        let res = this.listeDesMedias.remove(m.getId());
        if (res != null) {
            console.log("média n° " + m.getId() + " supprimé");
            return;
        }
        console.log("média n° " + m.getId() + " n'était pas dans la liste");
       
    }

    

    // On emprunte un média avec un Emprunteur et un Media
    // on aurait pu le faire par titre au lieu de média
    public emprunterMedia(e: Emprunteur, m: Media) : void {

        //recherche de l'emprunteur dans la liste des emprunteurs
        let emprunteur = this.getUnEmprunteur(e);
        if (emprunteur == null) {
            console.log(e.getPrenom() + " n'est pas inscrit à la médiathèque");
            return;
        }
        // vérification si emprunteur a déjà 3 emprunts
        if(!emprunteur.peutEmprunter(this.listeDesEmprunts)) {
            console.log(emprunteur.getPrenom() + ", vous ne pouvez plus emprunter !!!");
            return;
        }

        //recherche du média dans la liste de la médiathèque
       let media = this.getUnMedia(m);

        if (media == null) { 
            console.log(m.getTitre() +  " n'est pas dans la liste de la médiathèque");
            return;
        }

        // vérification si il reste des exemplaires dispo du média
        if(!media.resteDesExemplaires()) {
            console.log(e.getPrenom() + 
            " voulait emprunter " + media.getTitre() +
            ", dommage, il n'y a plus d'exemplaires disponibles");
            return;
        }

        //créer un emprunt :
        let emprunt:Emprunt = new Emprunt(emprunteur, media);
        this.listeDesEmprunts.add(emprunt);

        // enlève un éxemplaire du média
        media.retirerUnExemplaire();
        console.log(emprunteur.getPrenom() + " fait un emprunt de " + media.getTitre() + ", " + media.exemplairesDispo());

        // ajout dans la liste des observers
        this.register(emprunt);
    }

    public rendreUnMedia(e: Emprunteur, m :Media): void {
        // la méthode remove retourne l'emprunt retiré de la collection
        let cle = e.getId() + m.getId();
        let emprunt: Emprunt = this.listeDesEmprunts.remove(cle);
        
        // emprunt peut renvoyer null
        if (emprunt != null) {

            // rajout d'un exemplaire disponible
            this.ajouterUnExemplaire(emprunt.getMedia());

            // Suppression de la liste des observers
            this.unregister(emprunt);

            console.log ( e.getPrenom() + " a rendu " + m.getTitre() + ", " +
                emprunt.getMedia().exemplairesDispo() );
        }
    }

    public ajouterUnExemplaire(m: Media) { m.ajouterUnExemplaire(); }

    public retirerUnExemplaire(m: Media ) { m.retirerUnExemplaire(); }

    // ---------------Affichage des collections de la médiathèque --------------
    public afficherListeDesEmprunts(): void {
        console.log("liste des emprunts : ");
        this.afficherUneListe(this.listeDesEmprunts);
    }

    public afficherListeDesEmprunteurs() {
        console.log("Liste des emprunteurs : ");
        this.afficherUneListe(this.listeDesEmprunteurs);
    }
    
    public afficherListeDesMedias() {
        console.log("Liste des Médias : ");
       this.afficherUneListe(this.listeDesMedias);
    }

    private afficherUneListe<T extends ListeUtils>(liste: Liste<T>) {
        liste.debut();
        while(liste.hasNext()) {
            console.log(liste.suivant().description() + "\n");
        }
    }

    public disponibiliteDeMedia(m: Media) : void {
        let media: Media = this.getUnMedia(m);
        console.log(media.dateDeProchaineDispo(this.listeDesEmprunts));
    }

    // --------------- Sauvegarder/Charger ------------------------ //
 
    // pour charger, il faut passer les 3 listes, mais en passant null sur une liste
    // on peut ne charger que les listes qui nous intéressent
    public charger(listeMedias: string, listeEmprunteurs: string, listeEmprunts: string) {

        if (listeMedias != null) {
            // On passe la classe en argument pour la factory,méthode static
            let chargeurMedia = new Chargeur<Media>(listeMedias, MediaFactory);
            let res = chargeurMedia.charger();
            //res est une liste de médias, on ajoute donc les médias à la liste de la médiathèque
            while (res.hasNext()) {
                this.listeDesMedias.add(res.suivant());
            }

        }
        
        if ( listeEmprunteurs != null) {
            let chargeurEmprunteurs = new Chargeur<Emprunteur>(listeEmprunteurs, EmprunteurFactory);
            let resEmprunteurs = chargeurEmprunteurs.charger();
            while (resEmprunteurs.hasNext()) {
                this.listeDesEmprunteurs.add(resEmprunteurs.suivant());
            }
        }
        
        
        if (listeEmprunts != null) {
            let chargeurEmprunts = new Chargeur<Emprunt>(listeEmprunts, EmpruntFactory);
            let listeFinale = chargeurEmprunts.charger();
            // ! copier les données de la liste finale dans les listes emprunts et observers
            listeFinale.debut();
            while (listeFinale.hasNext()) {
                let suivant = listeFinale.suivant();
                this.listeDesEmprunts.add(suivant);
                this.observers.add(suivant);
            } 
        }
    }

    
    public sauverMedias(): string {
       return this.sauver(this.listeDesMedias);
    }

    public sauverEmprunteurs(): string {
        return this.sauver(this.listeDesEmprunteurs);
    }

    public sauverEmprunts(): string {
        return this.sauver(this.listeDesEmprunts);
    }

    private sauver<T extends ListeUtils>(l: Liste<T>) : string{
        let liste = new Array();
        l.debut();
        while (l.hasNext()) {
            liste.push(l.suivant());
        }
        return JSON.stringify(liste);
    }

    // ------------ Trigger pour l'envoi de mail pour les retardataires ----------- //

    // Design pattern observer, on déclenche la méthode notify() lors de l'instanciation
    // de la médiathèque et/ou quand on le veut
    public controlerLesRetards(): void {
        this.notify();
    }

    // -----------------Méthodes Design Patter Observer à redéfinir ---------------
    protected notify(): void {
        
        this.observers.debut();
        while (this.observers.hasNext()) {
            this.observers.suivant().actualise();
        }
    }

    protected register(emprunt: DateObserver) {
        this.observers.add(emprunt);
    }

    protected unregister(emprunt: DateObserver) {

        // suppression de la liste des observers
        this.observers.remove(emprunt.getId());
        
    }

    

   
}