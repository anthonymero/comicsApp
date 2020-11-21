import { ICollection } from './collection.model';
export interface IBook {
    editor: string;
    // Serie
    collection?: ICollection;
    // Tome
    volume: string;
    title: string;
    year: string;
    // Scenario
    scenario: string;
    // Dessin
    drawing: string;
    // Couleur
    colors: string;
    photo?: string;

}
