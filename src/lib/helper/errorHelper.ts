import intl from 'react-intl-universal';

export function handleError(error, errorPath: string) {
    console.error(error);
    let jsonError = { code: '', message: '', extra_info: [] };
    try {
        jsonError = JSON.parse(error.message);
    } catch (e) {
        jsonError = { code: '', message: error, extra_info: [] };
    }

    let errorMessage = '';
    if (!jsonError.code) {
        errorMessage = jsonError.message ? jsonError.message : intl.get('application.generic.error_code_e500gen');
    } else {
        errorMessage = intl.get(errorPath.concat('.', jsonError.code));
        errorMessage = errorMessage != '' ? errorMessage : jsonError.message != '' ? jsonError.message : intl.get('application.generic.error_code_e500gen');
    }

    if (jsonError.extra_info && jsonError.extra_info.length > 0) {
        errorMessage = errorMessage + ' ' + jsonError.extra_info.join();
    }

    return errorMessage;
}
