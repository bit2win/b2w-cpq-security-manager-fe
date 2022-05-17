import { DateTime } from 'luxon';

class DateUtils {
    /************************************************
     * PUBLIC FUNCTIONS
     ************************************************/
    public static getLocaleData() {
        //TODO GET LOCAL FROM THE CORRECT PLACE
        let localeData: LocaleData = {
            date_format: 'MMM dd, yyyy',
            date_ouput_format: 'yyyy-MM-dd',
            language: 'en-US',
        };
        return localeData;
    }

    public static formatDate(date: string) {
        let format = this.getLocaleData().date_ouput_format;
        return DateTime.fromFormat(date, format);
    }
}

class LocaleData {
    date_format: string;
    date_ouput_format: string;
    language: string;
}

export default DateUtils;
