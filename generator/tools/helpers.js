const fs = require('fs');

function addTypscriptConfigType(api, typeName) {
    const tsconfigPath = api.resolve(`./tsconfig.json`);
    if (tsconfigPath) {
        let fileContent = JSON.parse(fs.readFileSync(tsconfigPath, { encoding: 'utf-8' }));
        const types = fileContent.compilerOptions.types;
        if (types && !types.includes(typeName)) {
            types.push(typeName)
        }
        fileContent = JSON.stringify(fileContent, null, 2);
        fs.writeFileSync(tsconfigPath, fileContent, { encoding: 'utf8' })
    }
}

module.exports = { addTypscriptConfigType };
