import { ListeUtils } from "../interfaces/ListeUtils";

export abstract class DateObserver implements ListeUtils{

    abstract actualise();

    //la clé permettra de retrouver l'objet dans les collections
    abstract getId(): string;
    abstract description(): string;
}