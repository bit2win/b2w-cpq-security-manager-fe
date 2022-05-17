export default class Utils {
    /**************************************************
     * STATIC FUNCTIONS
     **************************************************/

    public static generateUUID() {
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
    }

    public static getExtension(filename: string) {
        let fields = filename.split('.');
        return fields[1] ? fields[1] : '';
    }

    public static dateFormat(inputDate, format) {
        //parse the input date
        const date = new Date(inputDate);

        //extract the parts of the date
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        //replace the month
        format = format.replace('MM', month.toString().padStart(2, '0'));
        //replace the year
        if (format.indexOf('yyyy') > -1) {
            format = format.replace('yyyy', year.toString());
        } else if (format.indexOf('yy') > -1) {
            format = format.replace('yy', year.toString().substr(2, 2));
        }
        //replace the day
        return format.replace('dd', day.toString().padStart(2, '0'));
    }
}

export enum URIPath {
    DASHBOARD = '/security-manager/dashboard',
}
