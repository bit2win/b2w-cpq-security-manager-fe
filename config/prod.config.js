module.exports = {
    config: {
        i18n: {
            lang: JSON.stringify('en'),
        },
        production: JSON.stringify(true),
    },
    process: {
        env: {
            REACT_APP_API_VERSION: JSON.stringify('v1'),
            REACT_APP_API_BACK_END: JSON.stringify('/api/catalog'),
            REACT_APP_PRODUCT_MANAGER_API_BACK_END: JSON.stringify('/api/product-manager'),
            REACT_APP_DATA_API_BACK_END: JSON.stringify('/api/data'),
            REACT_APP_PROFILE_API_BACK_END: JSON.stringify('/api/profile'),
            REACT_APP_DATAMAP_API_BACK_END: JSON.stringify('/api/datamap'),
            REACT_APP_PUBLISH_API_BACK_END: JSON.stringify('/api/publish'),
            REACT_APP_LAYOUT_API_BACK_END: JSON.stringify('/api/layoutmanager'),
            REACT_APP_FAMILY_MANAGER_API_BACK_END: JSON.stringify('/api/family-manager'),
            REACT_APP_ROLE_API_BACK_END: JSON.stringify('/api/role'),
            REACT_APP_I18N_API_BACK_END: JSON.stringify('/api/i18n'),
            PUBLIC_URL: JSON.stringify('/api/security-manager'),
        },
    },
};
