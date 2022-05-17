import React, { Component } from 'react';
import './Error403.scss';
import { Link } from 'react-router-dom';

interface Props {}
interface State {}

class Error403 extends Component<Props, State> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Error403">
                <h1>403 - Forbidden</h1>
                <Link to="/">Back to Dashboard</Link>
            </div>
        );
    }
}

export default Error403;
