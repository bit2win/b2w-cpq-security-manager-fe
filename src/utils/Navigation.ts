import {PageSecurity} from './Enum';
import Page from '../page/Page';

export enum Pages {
    B2W_ADMINISTRATION = '/bit2win-administration',
    DASHBOARD = '/security-manager'
}
export default class Navigation extends Page {
    /**************************************************
     * CONSTRUCTOR
     **************************************************/
    constructor(props) {
        super(props);
    }

    /**************************************************
     * PUBLIC FUNCTIONS
     **************************************************/

    public goToDashboard() {
        let history = { pathname: Pages.DASHBOARD, state: null };
        history.state = this.state;
        this.props.history.push(history);
    }

    public goToAdministration() {
        let history = { pathname: Pages.B2W_ADMINISTRATION, state: null };
        history.state = this.state;
        this.props.history.push(history);
    }


    public changePage(page: string = PageSecurity.DASHBOARD) {
        switch (page) {
            case PageSecurity.DASHBOARD:
                this.goToDashboard();
                break;
            case PageSecurity.ADMINISTRATION:
                this.goToAdministration();
                break;
            default:
                this.goToAdministration();
        }
    }
}
