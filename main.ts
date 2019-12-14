import { Emprunteur } from "./Emprunteur";
import { Media } from "./Media";
import { Cd, genreCd } from "./Cd";
import { Livre, genreLivre } from "./Livre";
import { Dvd, genreDvd } from "./Dvd";
import { Mediatheque } from "./Mediatheque";
import { SystemDateManager } from "./utils/SystemDateManager";
import { Emprunt } from "./Emprunt";


// emprunteurs
let seb = new Emprunteur("pinet","sebastien","seb@mail.com");
let sandra = new Emprunteur("brunet","sandra","sandra@mail.com");
let stef = new Emprunteur("legault","stef","stef@mail.com");
let eva = new Emprunteur("badicke","eva","eva@mail.com");
let emprunteursAcharger = [seb,sandra,stef,eva,];

let marc = new Emprunteur("jacotin","marc","marc@mail.com");
let sophie = new Emprunteur("favier","sophie","sophie@mail.com");
let fabien = new Emprunteur("marrie","fabien","fabien@mail.com");
let emprunteursAajouter = [marc,sophie,fabien];


//médias
let cd: Media = new Cd("past to present",1,"toto", genreCd.Rock, "emi",100);
let livre: Media = new Livre("mortimer",3,"Pratchett",genreLivre.Roman,"babelio",250);
let dvd: Media = new Dvd("Rambo",1,"STallone", genreDvd.Action,"warner", 120);
let mediasAcharger = [cd,livre,dvd];

let cd2: Media = new Cd("Hero",2,"David Bowie", genreCd.Rock, "emi",100);
let livre2: Media = new Livre("DaVinciCode",3,"Dan Brown",genreLivre.Policer,"babelio",250);
let dvd2: Media = new Dvd("Rocky",2,"Sylvester", genreDvd.Action,"warner", 120);
let mediasAajouter = [cd2,livre2,dvd2];

//emprunts
let e1 = new Emprunt(stef,cd);
let e2 = new Emprunt(stef, dvd);
let e3 = new Emprunt(stef, livre);
let emprunts = [e1, e2, e3];

// médiathèque vide
let mediatheque: Mediatheque = Mediatheque.getInstance();

// charger la médiathèque
let jsonMedias = JSON.stringify(mediasAcharger);
let jsonEmprunteurs = JSON.stringify(emprunteursAcharger);
let jsonEmprunts = JSON.stringify(emprunts);

console.log(jsonEmprunts);

mediatheque.charger(jsonMedias, jsonEmprunteurs, jsonEmprunts);

// ajout des emprunteurs dans la médiathèque
for (let e of emprunteursAajouter) {
    mediatheque.ajouterUnEmprunteur(e);
}

// ajout des médias dans la médiathèque
for (let m of mediasAajouter) {
    mediatheque.ajouterUnMedia(m);
}

//affichage du contenu de la médiathèque
mediatheque.afficherListeDesEmprunteurs();
mediatheque.afficherListeDesMedias();
mediatheque.afficherListeDesEmprunts();


// ------- Ne pas appeler directement les méthodes sur les instances de médias créées au début
// Comme elles ont été chargées, la médiathèque a créé de nouvelles instances dans ses listes
// Le programme est fait pour que même en passant une instance de média du debut, la médiathèque
// va faire une recherche dans sa liste grâce à l'ID du média
// Exemple, si je rends un Cd, il y a l'instance cd du début et une instance cd dans la liste
// de la médiathèque et seule l'instance dans la médiathèque voit son nombre d'exemplaires varier


// Emprunter, rendre un média
// stef ne peut plus emprunter, il a déjà 3 emprunts
// sandra ne peut pas emprunter le CD, déjà en possession de stef
mediatheque.emprunterMedia(stef, livre);
mediatheque.emprunterMedia(sandra, cd);
mediatheque.emprunterMedia(sandra, livre);

mediatheque.rendreUnMedia(stef, livre);
mediatheque.rendreUnMedia(stef, cd);
//stef a rendu le cd, sandra peut emprunter le CD
mediatheque.emprunterMedia(sandra, cd);

mediatheque.afficherListeDesEmprunts();

// Envoi du mail de retard
// changement de la date pour simuler 31 jours de plus par rapport à l'emprunt
SystemDateManager.instance.addDays(25);
console.log(" ---------------------  Mails de retard -------------------\n");
mediatheque.controlerLesRetards();

//prochaines disponibilités des médias
mediatheque.disponibiliteDeMedia(livre);
mediatheque.disponibiliteDeMedia(cd);
mediatheque.disponibiliteDeMedia(dvd);

// Sauvegarde de la médiathèque
let sauvegardeMedias = mediatheque.sauverMedias();
let sauvegardeEmprunteurs = mediatheque.sauverEmprunteurs();
let sauvegardeEmprunts = mediatheque.sauverEmprunteurs();
// la sauvegarde est à charger telle qu'elle dans une médiathèque
//uneMediathque.charger(sauvegardeMedias, sauvegardeEmprunteurs, sauvegardeEmprunts);


// test de sauvegarde et affichage des médias de la médiathèque
console.log ("-------------- Sauvegarde ---------------------- \n");
console.log(JSON.parse(sauvegardeMedias));

/*
L’application démontrera son bon fonctionnement avec une séquence d’appel du genre :
• Chargement de la médiathèque
• Ajout d’un média de chaque type
• Ajout d’un emprunteur
• Emprunt d’un média
• Retour d’un média
• Envoi d’un mail à tous les emprunteurs avec au moins un emprunt en retard
• Sauvegarde de la médiathèque
*/