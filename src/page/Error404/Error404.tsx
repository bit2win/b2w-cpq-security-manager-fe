import React, { Component } from 'react';
import './Error404.scss';

interface Props {}
interface State {}

class Error404 extends Component<Props, State> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Error404">
                <h1>NoMatch</h1>
            </div>
        );
    }
}

export default Error404;
