const path = require("path");

module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: ['./src/scss/main.scss']
        }
    }
};
