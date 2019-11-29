import { DateObserver } from "./DateObserver";
import { Liste } from "../collections/Liste";

// Les emprunts observent le sujet médiathèque, lors de l'instanciation
export abstract class Sujet {
    
    // doublon de la collection de la liste d'emprunts
    // mais avantage d'être découplé, si on ne veut plus qu'ils
    // soient Observers
    observers: Liste<DateObserver>;

    protected abstract notify(): void;
    protected abstract register(T): void;
    protected abstract unregister(T): void;

    constructor() {
        this.observers = new Liste();
    }
    
}