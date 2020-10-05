module.exports = (api, opts) => {

    const helpers = require('./tools/helpers')

    api.extendPackage({
        dependencies: {
            "@types/jest": "^24.0.19",
            "@types/node": "^14.11.8",
            "@types/vuelidate": "^0.7.13",
            "axios": "^0.20.0",
            "babel-eslint": "^10.1.0",
            "camelcase": "^6.1.0",
            "camelcase-keys": "^6.2.2",
            "eases": "^1.0.8",
            "jwt-decode": "^3.0.0",
            "lodash": "^4.17.20",
            "mockdate": "^3.0.2",
            "moment": "^2.29.1",
            "raven-js": "^3.27.2",
            "standard": "^14.3.4",
            "tiptap": "^1.27.0",
            "tiptap-extensions": "^1.29.0",
            "vue-api-query": "^1.6.1",
            "vuelidate": "^0.7.5",
        }
    })

    api.render('./templates/default');

    api.onCreateComplete(() => {

        if (api.hasPlugin('typescript')) {
            helpers.addTypscriptConfigType(api,'vuetify')
        }

        api.injectImports(api.entryFile, `import axios from 'axios'`)

        api.exitLog('New Kiwi hatched!')
    })
}
