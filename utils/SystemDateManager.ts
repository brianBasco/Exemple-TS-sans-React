//// System Date Manager ////

export class SystemDateManager  {
    public static instance: SystemDateManager = new SystemDateManager();

    private _date: Date;

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

    
}
