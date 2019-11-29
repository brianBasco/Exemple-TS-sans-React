export interface Iterateur<T> {

    index: number;

    hasNext(): boolean;

    suivant(): T;
}