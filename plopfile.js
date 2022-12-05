import path from "path";
import {config} from "./generator.config.js";
import {GeneratorsRegistry} from "./generators.js";
import {StrapiGeneratorHelper} from './generator/strapi-utils/strapi.js';
import {FrontendGeneratorHelper} from './generator/frontend-utils/frontend.js';

export default function (plop) {
    const generatorDirectory = path.resolve(config.base, config.generatorsPath);
    const strapiDirectory = path.resolve(config.base, config.strapiFolder);
    const frontendDirectory = path.resolve(config.base, config.frontendFolder);

    let strapiHelper = new StrapiGeneratorHelper(strapiDirectory, config.modelNamePlurality);
    strapiHelper.init();

    let projectConfig = {
        settings: config,
        strapi: strapiHelper,
        frontend: new FrontendGeneratorHelper(frontendDirectory)
    }

    for (let i = 0; i < GeneratorsRegistry.length; i++) {
        const generatorFn = GeneratorsRegistry[i];
        generatorFn(plop, projectConfig);
    }
}
