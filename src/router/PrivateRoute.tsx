import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { isLogin } from './Autentication';

export default function PrivateRoute({ component: Component, ...rest }) {
    const location = useLocation();
    return (
        <Route
            {...rest}
            render={props =>
                isLogin() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                )
            }
        ></Route>
    );
}
