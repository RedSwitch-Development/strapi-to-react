// We are using appRoot instead of __dirname because this will be installed as a node_module
import appRoot from 'app-root-path';
const configFilePath = appRoot.resolve('rscli.config.json')
import fs from 'fs';

let userConfig = {};
try {
    let userConfigAsJSON = fs.readFileSync(configFilePath);
    userConfig = JSON.parse(userConfigAsJSON);
} catch (e) {
    console.log('No config provided by user')
}

export const config = {
    /**
     * Destination folder containing the frontend code
     */
    frontendFolder: 'frontend',

    /**
     * Source folder containing the Strapi backend model definitions
     */
    strapiFolder: 'backend',


    generatorsPath: './generator/generators',
    base: appRoot.toString(),
    modelNamePlurality: 'pluralName', // can be 'pluralName' or 'singularName'
    ...userConfig
}
