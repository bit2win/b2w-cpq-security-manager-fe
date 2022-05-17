import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { B2wStyles } from '@bit2win/b2w-design-system-react';
import './assets/vendor/b2w-bootstrap.scss';

//Page components
import Dashboard from './page/Dashboard/Dashboard';

//Language utils
import Language from './lib/Language';

//Version
import { PermissionSingleton } from '@bit2win/b2w-core-lib';
import { URIPath } from './utils/Utils';

interface Props {}
interface State {
    initDone: boolean;
}

class Application extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            initDone: false,
        };
    }

    componentDidMount() {
        const promises: [Promise<boolean>, Promise<void>] = [Language.loadLocales(), PermissionSingleton.getInstance().loadPermissions()];
        Promise.all<boolean, void>(promises).then(results => {
            const initDone = results[0];
            this.setState({ initDone });
        });
    }

    componentDidCatch(error, _info) {
        /* do not remove - needed to manage error in single spa */
        console.log(error);
    }

    render() {
        let permission = PermissionSingleton.getInstance();

        return (
            this.state.initDone && (
                <div className="B2wCpqSecurityManagerRoot">
                    <B2wStyles></B2wStyles>
                    <Router>
                        <Switch>
                            <Route exact path={URIPath.DASHBOARD} component={Dashboard} />
                            <Route exact path={"/security-manager"} component={Dashboard} />
                        </Switch>
                    </Router>
                </div>
            )
        );
    }
}

export default Application;
