({
    // Nice not to inline/minify things for debugging
    optimize: "none",

    // Base js directory relative to the build js
    baseUrl: './',

    // Main script file for the app
    name: 'main',

    // Add load trigger to automatically start main module after require is initialized
    insertRequire: ['main'],

    paths: {
        baseview: 'base/BaseView',
        templates: '../templates'
    },

    // File to output compiled js to
    out: './main_app.js',
})
