import React from 'react';
import Page from '../Page';
import './SecurityManager.scss';
import intl from 'react-intl-universal';
import {B2wButton, B2wCheckBox, B2wInputNumber, B2wModal, B2wSnackbar} from "@bit2win/b2w-design-system-react";
import SecurityApi from "../../api/SecurityApi";
import {handleError} from "../../lib/helper/errorHelper";
import Message, {MessageSnackbar} from "../../Message";
import Navigation from "../../utils/Navigation";
import {PageSecurity} from "../../utils/Enum";



interface Props {
}

interface State {
    digits: boolean,
    forceExpiredPasswordChange: number,
    length: number,
    lowerCase: boolean,
    upperCase: boolean,
    passwordHistory: number,
    specialChars: boolean,
    startingDigits: boolean,
    startingForceExpiredPasswordChange: number,
    startingLength: number,
    startingLowerCase: boolean,
    startingUpperCase: boolean,
    startingPasswordHistory: number,
    startingSpecialChars: boolean,
    showModal: boolean,
    messageSnackbar: Message
}

export default class SecurityManager extends Page<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            digits: false,
            forceExpiredPasswordChange: 0,
            length: 0,
            lowerCase: false,
            upperCase: false,
            passwordHistory: 0,
            specialChars: false,
            startingDigits: false,
            startingForceExpiredPasswordChange: 0,
            startingLength: 0,
            startingLowerCase: false,
            startingUpperCase: false,
            startingPasswordHistory: 0,
            startingSpecialChars: false,
            showModal: false,
            messageSnackbar: MessageSnackbar.getDefaultMessage()
        };
    }

    componentDidMount() {
        this.getInfo();
    }

    checkComponentUpdate(state) {
        let shouldRenderPage = true;
        this.isFormEdited =
            state.digits != state.startingDigits ||
            state.forceExpiredPasswordChange != state.startingForceExpiredPasswordChange ||
            state.length != state.startingLength ||
            state.lowerCase != state.startingLowerCase ||
            state.upperCase != state.startingUpperCase ||
            state.passwordHistory != state.startingPasswordHistory ||
            state.specialChars != state.startingSpecialChars
        return shouldRenderPage;
    }

    shouldComponentUpdate(_nextProps, nextState) {
        return this.checkComponentUpdate(nextState);
    }

    render() {
        return (
            <>
                <div className="b2w-security-view-title">{intl.get('application.security.securitymanager_title')}</div>
                <div className="container-fluid">
                    <div className="b2w-security-view">
                        <div className={"row b2w-input-row"}>
                            <div className={"b2w-input-container"}><B2wInputNumber
                                className={"b2w-input"}
                                label={intl.get('application.security.min_length')}
                                placeholder={intl.get('application.security.min_length_placeholder')}
                                value={this.state.length>0 ? this.state.length : null}
                                fieldApiName={'b2w-input-number'}
                                onB2wInputEvent={e =>
                                    this.setState({length: parseInt(e?.detail?.value)})
                                }

                            /></div>
                            <div className={"b2w-input-container"}><B2wInputNumber
                                className={"b2w-input"}
                                label={intl.get('application.security.days_validity')}
                                placeholder={intl.get('application.security.days_validity_placeholder')}
                                value={this.state.forceExpiredPasswordChange >0 ? this.state.forceExpiredPasswordChange : null}
                                fieldApiName={'b2w-input-number'}
                                onB2wInputEvent={e =>
                                    this.setState({forceExpiredPasswordChange: parseInt(e?.detail?.value)})
                                }
                            /></div>

                        </div>
                        <div className={"row b2w-input-row"}>
                            <div className={"b2w-input-container"}><B2wInputNumber
                                className={"b2w-input"}
                                label={intl.get('application.security.different_last')}
                                placeholder={intl.get('application.security.different_last_placeholder')}
                                value={this.state.passwordHistory > 0 ? this.state.passwordHistory : null}
                                showTooltip={true}
                                tooltipText={intl.get('application.security.different_last_tooltip')}
                                fieldApiName={'b2w-input-number'}
                                onB2wInputEvent={e =>
                                    this.setState({passwordHistory: parseInt(e?.detail?.value)})
                                }
                            /></div>

                        </div>
                        <div className={"row b2w-input-row"}>
                            <div className={"b2w-check-container"}><B2wCheckBox
                                className={"b2w-input"}
                                label={intl.get('application.security.lowercase')}
                                positionLabel={'right'}
                                fieldApiName={'b2w-checkbox'}
                                disabled={false}
                                checked={this.state.lowerCase}
                                onB2wCheckBoxEvent={e => {
                                    this.setState({lowerCase: e?.detail?.value})
                                }}
                            /></div>
                        </div>
                        <div className={"row b2w-input-row"}>
                            <div className={"b2w-check-container"}><B2wCheckBox
                                className={"b2w-input"}
                                label={intl.get('application.security.uppercase')}
                                positionLabel={'right'}
                                fieldApiName={'b2w-checkbox'}
                                disabled={false}
                                checked={this.state.upperCase}
                                onB2wCheckBoxEvent={e => {
                                    this.setState({upperCase: e?.detail?.value})
                                }}
                            /></div>
                        </div>
                        <div className={"row b2w-input-row"}>
                            <div className={"b2w-check-container"}><B2wCheckBox
                                className={"b2w-input"}
                                label={intl.get('application.security.special_character')}
                                positionLabel={'right'}
                                fieldApiName={'b2w-checkbox'}
                                disabled={false}
                                checked={this.state.specialChars}
                                onB2wCheckBoxEvent={e => {
                                    this.setState({specialChars: e?.detail?.value})
                                }}
                            /></div>
                        </div>
                        <div className={"row b2w-input-row"}>
                            <div className={"b2w-check-container"}><B2wCheckBox
                                className={"b2w-input"}
                                label={intl.get('application.security.at_least_number')}
                                positionLabel={'right'}
                                fieldApiName={'b2w-checkbox'}
                                disabled={false}
                                checked={this.state.digits}
                                onB2wCheckBoxEvent={e => {
                                    this.setState({digits: e?.detail?.value})
                                }}
                            /></div>
                        </div>
                        <div className={'b2w-security-view-buttons'}>
                            <B2wButton type="textbutton" text={intl.get('application.security.cancel')} reflect={true} onB2wButtonClick={() => this.handlerCancel()} />
                            <B2wButton type="primary" text={intl.get('application.security.save')} reflect={true} onB2wButtonClick={() => this.handlerSave()} disabled={!this.isFormEdited} />
                        </div>
                    </div>
                </div>
                <B2wModal
                    visible={this.state.showModal}
                    icon={'warning'}
                    modalTitle={intl.get('application.security.modal_title')}
                    cancelButtonText={intl.get('application.security.cancel')}
                    okButtonText={intl.get('application.security.confirm')}
                    cancelButtonVisible={true}
                    okButtonVisible={true}
                    onB2wSave={() => (this.exitPage())}
                    onB2wCancel={() => (this.setState({ showModal: false }))}
                    onB2wClose={() => (this.setState({ showModal: false }))}
                    customStyle={'.B2wModal .modal .modalHeader .b2w-modal-status-icon {align-self:start;}'}
                />
                <B2wSnackbar
                    text={this.state.messageSnackbar.message}
                    status={this.state.messageSnackbar.messageType}
                    isFixed={true}
                    close={this.state.messageSnackbar.hideMessage}
                    disabled={this.state.messageSnackbar.hideMessage}
                    timeout={5}
                    type={'top-2-bottom'}
                    onB2wCloseEvent={() => {
                        this.setState({ messageSnackbar: MessageSnackbar.getDefaultMessage() });
                    }}
                />
            </>
        );
    }

    private getInfo(){
        this.securityApi.getSecurityInfo().then(res => JSON.parse(JSON.stringify(res)))
            .then(res => {
                this.setState({
                    digits: res.digits,
                    forceExpiredPasswordChange: res.forceExpiredPasswordChange,
                    length: res.length,
                    lowerCase: res.lowerCase,
                    upperCase: res.upperCase,
                    passwordHistory: res.passwordHistory,
                    specialChars: res.specialChars,
                    startingDigits: res.digits,
                    startingForceExpiredPasswordChange: res.forceExpiredPasswordChange,
                    startingLength: res.length,
                    startingLowerCase: res.lowerCase,
                    startingUpperCase: res.upperCase,
                    startingPasswordHistory: res.passwordHistory,
                    startingSpecialChars: res.specialChars
                })
            })
            .catch(res => {
                let errorMessage = handleError(res, 'error get info pass');
                console.error(errorMessage);
            });
    }

    handlerCancel(){
        if (this.isFormEdited){
            this.setState({showModal: true})
        }
        else{
            this.exitPage()
        }

    }

    exitPage(){
        this.nav.changePage(PageSecurity.ADMINISTRATION);
    }

    handlerSave(){
        let policiesToSave = {}
        policiesToSave['digits'] = this.state.digits;
        policiesToSave['forceExpiredPasswordChange'] = !!this.state.forceExpiredPasswordChange ? this.state.forceExpiredPasswordChange : 0;
        policiesToSave['lowerCase'] = this.state.lowerCase;
        policiesToSave['upperCase'] = this.state.upperCase;
        policiesToSave['passwordHistory'] = !!this.state.passwordHistory ? this.state.passwordHistory : 0;
        policiesToSave['specialChars'] = this.state.specialChars;
        policiesToSave['length'] = !!this.state.length ? this.state.length : 0;
        this.securityApi.saveSecurityPolicies(policiesToSave)
            .then(response => {
            this.setState({messageSnackbar: MessageSnackbar.getSuccessMessage(intl.get('application.security.success_update_policies') + '!')});
            this.getInfo();
        })
            .catch(e => {
                let error = JSON.parse(e?.message);
                let message = "Error" + '! ' + error.message;
                this.setState({messageSnackbar: MessageSnackbar.getErrorMessage(message)});
            });

    }

    /**************************************************
     * PRIVATE VARIABLES
     **************************************************/
    private isFormEdited: boolean = false;
    private securityApi = new SecurityApi();
    private nav = new Navigation(this.props);
}
