/**
 * These are the dependencies shared with the other react applications
 * these dependencies will not be bundled in the single-spa javascript output
 * because they will be dynamically loaded via cdn and are shared with other apps
 * if these dependencies need to be updated, they MUST be updated in all other react apps
 * AND in the cdn ( see portal_application_configuration table )
 *
 * Not listed below but includes are also:
 * react @ 17.0.1
 * react-dom @ 17.0.1
 * @bit2win/b2w-design-system @ latest
 * @bit2win/b2w-design-system-react @ latest
 */

module.exports = [
    'moment', // 2.29.1
    'tabulator-tables/dist/js/tabulator.js', // 0.15.0
    'react-router', // 5.2.0
    'react-router-dom', // 5.2.0
    'react-flex-dnd',
];
