export class DateHelper {
    static dateToNumber(date?: Date): number | undefined {
        if(date != null){
            return date.getTime();
        }
        return undefined;
    }

    static numberToDate(milisseconds?: number): Date | undefined {
        if(milisseconds != null){
            return new Date(milisseconds);
        }
        return undefined;
    }
}