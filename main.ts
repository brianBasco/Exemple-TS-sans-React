import { Emprunteur } from "./Emprunteur";
import { Media } from "./Media";
import { Cd, genreCd } from "./Cd";
import { Livre, genreLivre } from "./Livre";
import { Dvd, genreDvd } from "./Dvd";
import { Mediatheque } from "./Mediatheque";

let seb = new Emprunteur("pinet","sebastien","seb@bast.com");
let sandra = new Emprunteur("brunet","sandra","sandra@bast.com");
let stef = new Emprunteur("legault","stef","stef@bast.com");
let eva = new Emprunteur("badicke","eva","eva@bast.com");
let emprunteurs = [seb,sandra,stef,eva,];

let cd: Media = new Cd("past to present",1,"toto", genreCd.Rock, "emi",100);
let livre: Media = new Livre("mortimer",3,"Pratchett",genreLivre.Roman,"babelio",250);
let dvd: Media = new Dvd("Rambo",1,"STallone", genreDvd.Action,"warner", 120);
let medias = [cd,livre,dvd];

let mediatheque: Mediatheque = Mediatheque.getInstance();


// ajout des emprunteurs dans la médiathèque
for (let e of emprunteurs) {
    mediatheque.ajouterUnEmprunteur(e);
}


// ajout des médias dans la médiathèque
for (let m of medias) {
    mediatheque.ajouterUnMedia(m);
}

mediatheque.emprunterMedia(stef, cd);
mediatheque.emprunterMedia(stef, livre);
mediatheque.emprunterMedia(stef, dvd);
mediatheque.emprunterMedia(stef, livre);

mediatheque.emprunterMedia(sandra, cd);
mediatheque.emprunterMedia(sandra, livre);

mediatheque.rendreUnMedia(stef, livre);

/*
//affichage des collections : 
mediatheque.afficherListeDesEmprunts();
mediatheque.afficherListeDesEmprunteurs();
mediatheque.afficherListeDesMedias();
*/


let jsonMedias = JSON.stringify(medias);

let myObject = JSON.parse(jsonMedias);


mediatheque.charger(jsonMedias,null,null);

mediatheque.afficherListeDesMedias();

mediatheque.afficherListeDesEmprunteurs();

mediatheque.afficherListeDesEmprunts();

