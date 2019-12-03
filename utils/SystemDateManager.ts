//// System Date Manager ////

export class SystemDateManager  {
    public static instance: SystemDateManager = new SystemDateManager();

    private _date: Date;

    // utilitaires pour passer la date en français
    private jours: string[] = [
        "dimanche",
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi"
    ];

    private mois: string[] = [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre"
    ]

    private constructor() {
        this._date = new Date();
    }

    setDate(d: Date): void {
        this._date = d;
    }

    getDate(): Date {
        return this._date;
    }

    addDays(days: number): SystemDateManager {
        this._date = new Date(this._date.getTime() + days * 24 * 60 * 60 * 1000);
        return this;
    }

    diffInDaysWith(date: Date): number {
        return Math.ceil((this._date.getTime() - date.getTime()) / (24 * 60 * 60 * 1000));
    }

    diffInSecondsWith(date: Date): number {
        return Math.ceil((this._date.getTime() - date.getTime()) / 1000);
    }

    getJour(jour: number): string {
        return this.jours[jour];
    }

    getMois(mois: number) : string {
        return this.mois[mois];
    }
    
}
