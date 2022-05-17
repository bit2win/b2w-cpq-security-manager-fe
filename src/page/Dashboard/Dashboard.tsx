import { B2wSnackbar } from '@bit2win/b2w-design-system-react';
import React from 'react';
import './Dashboard.scss';
import Page from '../Page';

interface Props {}

interface State {
    guid: String;
    showModal: boolean;
    snackbar: Object;
}

class Dashboard extends Page<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            guid: '',
            showModal: false,
            snackbar: {
                close: true,
                disabled: true,
                isFixed: true,
                status: '',
                text: '',
                timeout: 5,
                type: 'left-2-right',
            },
        };
    }

    componentDidMount() {
        this.handleSnackBar();
    }

    handleSnackBar() {
        if (this.props.location.state && this.props.location.state['snackbar']) {
            this.setState({
                snackbar: { ...this.state.snackbar, ...this.props.location.state['snackbar'] },
            });
            //clear history
            this.props.history.replace({
                pathname: this.props.location.pathname,
                state: {},
            });
        }
    }

    render() {
        return (
            <div className="container-fluid">
                ciaoooo
                <div className="row justify-align-center">
                    <B2wSnackbar
                        close={this.state.snackbar['close']}
                        disabled={this.state.snackbar['disabled']}
                        isFixed={true}
                        status={this.state.snackbar['status']}
                        text={this.state.snackbar['text']}
                        timeout={5}
                        type={this.state.snackbar['type']}
                    />
                    <div className="col-4"/>
                    <div className="col-4"/>
                    <div className="col-4"/>
                </div>
            </div>
        );
    }
}

export default Dashboard;
