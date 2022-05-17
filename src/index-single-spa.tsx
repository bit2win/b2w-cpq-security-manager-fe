// import { registerApplication, start } from 'single-spa';
//
// registerApplication(
//     // Name of our single-spa application
//     '@bit2win/portal',
//     // loadingFunction
//     () => import('./app'),
//
//     // activityFunction
//     location => location.pathname === '' || location.pathname === '/' || location.pathname.startsWith('/portal'),
// );
//
// start();
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Application from './Application';
import { /*applyPolyfills,*/ defineCustomElements } from '@bit2win/b2w-design-system/loader';
function domElementGetter() {
    return document.getElementById('root');
}
const reactLifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: Application,
    // domElementGetter,
});
export const bootstrap = [reactLifecycles.bootstrap];
export const mount = [reactLifecycles.mount];
export const unmount = [reactLifecycles.unmount];
/*applyPolyfills().then(() => */ defineCustomElements(); /*);*/
