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

    constructor() {
        super();
        this.listeDesMedias = new Liste();
        this.listeDesEmprunteurs = new Liste();
        this.listeDesEmprunts = new Liste();
    }

    // ------------------------- Accesseurs ------------------------ //
    public getListeDesEmprunts(): Liste<Emprunt> {
        return this.listeDesEmprunts;
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
    public emprunterMedia(e: Emprunteur, m: Media) : void {
        // vérification si emprunteur a déjà 3 emprunts
        if(!e.peutEmprunter(this.listeDesEmprunts)) {
            console.log(e.getPrenom() + ", vous ne pouvez plus emprunter !!!");
            return;
        }
        // vérification si il reste des exemplaires dispo du média
        if(!m.resteDesExemplaires()) {
            console.log(e.getPrenom() + 
            " voulait emprunter " + m.getTitre() +
            ", dommage, il n'y a plus d'exemplaires disponibles");
            return;
        }

        //créer un emprunt :
        let emprunt:Emprunt = new Emprunt(e, m);
        this.listeDesEmprunts.add(emprunt);

        // enlever un exemplaire du média
        this.retirerUnExemplaire(m);
        console.log(e.getPrenom() + " fait un emprunt de " + m.getTitre() + ", " + m.exemplairesDispo());

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

            console.log ( e.getPrenom() + " a rendu " + m.getTitre() );
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

    // --------------- Sauvegarder/Charger ------------------------ //
 
    // pour charger, il faut passer les 3 listes, mais en passant null sur une liste
    // on peut ne charger que les listes qui nous intéressent
    public charger(listeMedias: string, listeEmprunteurs: string, listeEmprunts: string) {

        if (listeMedias != null) {
            // On passe la classe en argument pour la factory,méthode static
            let chargeurMedia = new Chargeur<Media>(listeMedias, MediaFactory);
            this.listeDesMedias = chargeurMedia.charger();           
        }
        
        if ( listeEmprunteurs != null) {
            let chargeurEmprunteurs = new Chargeur<Emprunteur>(listeEmprunteurs, EmprunteurFactory);
            this.listeDesEmprunteurs = chargeurEmprunteurs.charger();
            // il faut recharger le compteur de la classe Emprunteur
            Emprunteur.Compteur = this.listeDesEmprunteurs.taille();
        }
        
        if (listeEmprunts != null) {
            let chargeurEmprunts = new Chargeur<Emprunt>(listeEmprunts, EmpruntFactory);
            this.listeDesEmprunts = chargeurEmprunts.charger();
    
            // Les observers étant des emprunts, on peut recharger la liste avec le chargeur d'emprunts
            this.observers = chargeurEmprunts.charger();
        }
    }

    public enregistrer(): string {
        // Transformer un objet/tableau en une string JSON
        let listeMedias = JSON.stringify(this.listeDesMedias);
        let listeEmprunteurs = JSON.stringify(this.listeDesEmprunteurs);
        let listeEmprunts = JSON.stringify(this.listeDesEmprunts);

        // on retourne un tableau de la même structure que pour le chargement
        let objet = new Array();
        objet.push(listeMedias);
        objet.push(listeEmprunteurs);
        objet.push(listeEmprunts);

        return JSON.stringify(objet);
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

    //// Envoyer un e-mail ////
    private sendMail(address: string, subject: string, content: string) {
    let mail = `Mail from: mediatheque@lecnam.net
        To: ${address}
        Subject: ${subject}
    
        ${content}`;

        window.alert(mail)
    }

   
}