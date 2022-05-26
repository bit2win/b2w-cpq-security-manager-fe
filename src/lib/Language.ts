import intl from 'react-intl-universal';
import locales from './Locales';
import { TranslationsApi } from '@bit2win/b2w-core-lib';
const lang_origin = config.i18n.lang;

class Language {
    /************************************************
     * PUBLIC FUNCTIONS
     ************************************************/
    public static loadLocales(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let api = new TranslationsApi();
            api.getLanguagesByApplications('generic,security')
                .then((res: any) => {
                    let lang = res['language'];
                    let locales = {};
                    locales[lang] = res;
                    intl.init({
                        currentLocale: lang,
                        locales,
                    }).then(() => {
                        resolve(true);
                    });
                })
                .catch(err => {
                    intl.init({
                        currentLocale: lang_origin,
                        locales,
                    })
                        .then(() => resolve(true))
                        .catch(() => reject(false));
                });
        });
    }
}

export default Language;
