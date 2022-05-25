import intl from "react-intl-universal";
import Constants from "./utils/Constants";


export default interface Message {
    hideMessage: boolean;
    message?: string;
    messageType?: string;
}


export class MessageSnackbar {
    public static getDefaultMessage() {
        return {
            message: null,
            messageType: Constants.SUCCESS_MESSAGE_TYPE,
            hideMessage: true,
        };
    }
    public static getErrorMessage(message?: string) {
        return {
            message: message ? message : intl.get('Error') + '!',
            messageType: Constants.ERROR_MESSAGE_TYPE,
            hideMessage: false,
        };
    }

    public static getSuccessMessage(message?: string) {
        return {
            message: message ? message : intl.get('Success') + '!',
            messageType: Constants.SUCCESS_MESSAGE_TYPE,
            hideMessage: false,
        };
    }

    public static getWarningMessage(message?: string) {
        return {
            message: message ? message : intl.get('Error') + '!',
            messageType: Constants.WARNING_MESSAGE_TYPE,
            hideMessage: false,
        };
    }
}
