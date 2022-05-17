export const maxDate = (date1: Date, date2: Date): Date => {
    if (date1.valueOf() === date2.valueOf()) return date1;
    if (date1 > date2) return date1;
    if (date1 < date2) return date2;
};

export const minDate = (date1: Date, date2: Date): Date => {
    if (date1.valueOf() === date2.valueOf()) return date1;
    if (date1 < date2) return date1;
    if (date1 > date2) return date2;
};
