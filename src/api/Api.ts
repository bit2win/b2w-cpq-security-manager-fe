import URLUtils from '../lib/utils/URLUtils';

export enum typeBackend {
    CATALOG = 'catalog',
    FAMILY = 'family',
    PROFILE = 'profile',
}

class Api {
    constructor(private baseUrl: string = URLUtils.getBaseURL()) {}

    /************************************************
     * PUBLIC FUNCTIONS
     ************************************************/
    public get<R>(
        path: string,
        query?: {
            [field: string]: string | number | boolean | null;
        },
        additionalHeaders?: { [key: string]: string },
    ): { controller: AbortController; promise: Promise<R> } {
        const controller = new AbortController();
        const signal = controller.signal;

        if (query) {
            let queryString = '';
            for (const field in query) {
                queryString += queryString ? '&' : '?';
                queryString += field + '=' + encodeURIComponent(String(query[field]));
            }
            path += queryString;
        }

        let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'origin': `${window.location.protocol}//${window.location.host}`,
        };

        if (additionalHeaders) for (let key in additionalHeaders) headers[key] = additionalHeaders[key];
        return {
            controller,
            promise: fetch(this.getFullUrl(path), {
                signal: signal,
                credentials: 'include',
                headers,
            }).then(response => {
                if (response.ok) return response.json();
                let statusCode = response.status;
                return response.text().then(text => {
                    this.errorParser(text, statusCode);
                });
            }),
        };
    }

    public post<T, R>(path: string, value: T, additionalHeaders?: { [key: string]: string }): { controller: AbortController; promise: Promise<R> } {
        const controller = new AbortController();
        const signal = controller.signal;

        let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'origin': `${window.location.protocol}//${window.location.host}`,
        };

        if (additionalHeaders) for (let key in additionalHeaders) headers[key] = additionalHeaders[key];

        return {
            controller,
            promise: fetch(this.getFullUrl(path), {
                signal,
                method: 'post',
                credentials: 'include',
                headers,
                body: JSON.stringify(value),
            }).then(response => {
                if (response.ok) return response.json();
                let statusCode = response.status;
                return response.text().then(text => {
                    this.errorParser(text, statusCode);
                });
            }),
        };
    }

    public patch<T, R>(path: string, value: T, additionalHeaders?: { [key: string]: string }): { controller: AbortController; promise: Promise<R> } {
        const controller = new AbortController();
        const signal = controller.signal;

        let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'origin': `${window.location.protocol}//${window.location.host}`,
        };

        if (additionalHeaders) for (let key in additionalHeaders) headers[key] = additionalHeaders[key];
        return {
            controller,
            promise: fetch(this.getFullUrl(path), {
                signal,
                method: 'PATCH',
                credentials: 'include',
                headers,
                body: JSON.stringify(value),
            }).then(response => {
                if (response.ok) return response.json();
                let statusCode = response.status;
                return response.text().then(text => {
                    this.errorParser(text, statusCode);
                });
            }),
        };
    }

    public put<T, R>(path: string, value: T, additionalHeaders?: { [key: string]: string }): { controller: AbortController; promise: Promise<R> } {
        const controller = new AbortController();
        const signal = controller.signal;

        let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'origin': `${window.location.protocol}//${window.location.host}`,
        };

        if (additionalHeaders) for (let key in additionalHeaders) headers[key] = additionalHeaders[key];
        return {
            controller,
            promise: fetch(this.getFullUrl(path), {
                signal,
                method: 'put',
                credentials: 'include',
                headers,
                body: JSON.stringify(value),
            }).then(response => {
                if (response.ok) return response.json();
                let statusCode = response.status;
                return response.text().then(text => {
                    this.errorParser(text, statusCode);
                });
            }),
        };
    }

    public delete<T, R>(path: string, additionalHeaders?: { [key: string]: string }): { controller: AbortController; promise: Promise<R> } {
        const controller = new AbortController();
        const signal = controller.signal;

        let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'origin': `${window.location.protocol}//${window.location.host}`,
        };

        if (additionalHeaders) for (let key in additionalHeaders) headers[key] = additionalHeaders[key];

        return {
            controller,
            promise: fetch(this.getFullUrl(path), {
                signal,
                method: 'delete',
                credentials: 'include',
                headers,
            }).then(response => {
                if (response.ok) return response.json();
                let statusCode = response.status;
                return response.text().then(text => {
                    this.errorParser(text, statusCode);
                });
            }),
        };
    }

    public download(
        path: string,
        fileName: string,
        query?: { [field: string]: string | number | boolean | null },
        additionalHeaders?: { [key: string]: string },
    ): { controller: AbortController; promise: Promise<void> } {
        const controller = new AbortController();
        const signal = controller.signal;

        if (query) {
            let queryString = '';
            for (const field in query) {
                queryString += queryString ? '&' : '?';
                queryString += field + '=' + encodeURIComponent(String(query[field]));
            }
            path += queryString;
        }

        let headers = {
            'Content-Type': 'application/octet-stream',
            'Accept': 'application/octet-stream',
            'origin': `${window.location.protocol}//${window.location.host}`,
        };

        if (additionalHeaders) for (let key in additionalHeaders) headers[key] = additionalHeaders[key];

        return {
            controller,
            promise: fetch(this.getFullUrl(path), {
                signal: signal,
                credentials: 'include',
                headers,
            }).then(response => {
                if (!response.ok)
                    return response.text().then(text => {
                        throw new Error(text);
                    });
                let blob = response.blob();
                blob.then(blob => {
                    if (window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveBlob(blob, fileName);
                    } else {
                        let elem = window.document.createElement('a');
                        elem.href = window.URL.createObjectURL(blob);
                        elem.download = fileName;
                        document.body.appendChild(elem);
                        elem.click();
                        document.body.removeChild(elem);
                    }
                });
            }),
        };
    }

    public upload(path: string, formaData: FormData, additionalHeaders?: { [key: string]: string }) /*: {controller:AbortController, promise:Promise<void>}*/ {
        const controller = new AbortController();
        const signal = controller.signal;

        let headers = {
            Accept: 'application/json',
            origin: `${window.location.protocol}//${window.location.host}`,
        };

        if (additionalHeaders) for (let key in additionalHeaders) headers[key] = additionalHeaders[key];

        return {
            controller,
            promise: fetch(this.getFullUrl(path), {
                signal,
                method: 'post',
                credentials: 'include',
                headers,
                body: formaData,
            }).then(response => {
                //console.log("responseTEXT",response.text());
                if (response.ok) return response.text();
                return response.text().then(text => {
                    throw new Error(text);
                });
            }),
        };
    }

    /************************************************
     * PRIVATE FUNCTIONS
     ************************************************/
    private getFullUrl(path: string) {
        if (!path) return this.baseUrl;
        if (path.indexOf('/') == 0) return this.baseUrl + path;
        return this.baseUrl + '/' + path;
    }

    private errorParser(text, statusCode) {
        let jsonParsed = text;
        try {
            jsonParsed = JSON.parse(jsonParsed);
        } catch (error) {
            console.warn('response.text() is not an object:', error);
        }
        let errorObject = {};
        errorObject['status'] = statusCode;
        if (statusCode == 422) {
            errorObject['message'] = jsonParsed.detail[0].msg;
            errorObject['code'] = '';
        } else {
            errorObject['message'] = typeof jsonParsed === 'string' ? jsonParsed : typeof jsonParsed.detail === 'string' ? jsonParsed.detail : jsonParsed.detail.message;
            errorObject['code'] = typeof jsonParsed === 'string' || typeof jsonParsed.detail === 'string' ? '' : jsonParsed.detail.code;
        }

        throw new Error(JSON.stringify(errorObject));
    }
}

export default Api;
