import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Application from './Application';
import { applyPolyfills, defineCustomElements } from '@bit2win/b2w-design-system/loader';
import './lib/StringImpl';

ReactDOM.render(React.createElement(Application), document.getElementById('root'));

applyPolyfills().then(() => defineCustomElements());
