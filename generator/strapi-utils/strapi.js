import path from "path";
import fs from "fs";
import chalk from "chalk";
import {attributeToInterfaceProperty} from "./attribute-mappings.js";

export class StrapiGeneratorHelper {

    constructor(basePath, modelNamePlurality) {
        this.basePath = basePath;
        this.modelNamePlurality = modelNamePlurality;
        this.modelSchemas = []
        this.modelSchemasByNameWithPlurality = {}
    }

    init() {
        this.modelSchemas = this.getModelSchemas();
        this.modelSchemas.forEach(modelSchema => {
            this.modelSchemasByNameWithPlurality[modelSchema.info[this.modelNamePlurality]] = modelSchema;
        })
    }

    getModelNameWithPlurality(modelName){
        let schema = this.getModelSchemaByName(modelName);
        return schema.info[this.modelNamePlurality];
    }

    transformFeatureData(data, modelName) {
        let modelSchema = this.getModelSchemaByName(modelName);
        data.model = modelSchema.info.singularName;
        data.modelPlural = modelSchema.info.pluralName;
        data.modelAttributes = Object.keys(modelSchema.attributes).join(', ');
        data.modelInterface = this.getModelInterface(modelName);
        data.featureFolderName = modelName;
        return data;
    }

    getModelInterface(modelName){
        const schema = this.getModelSchemaByName(modelName);
        return Object.keys(schema.attributes).map(attributeName => {
            return attributeToInterfaceProperty(schema.attributes[attributeName], attributeName);
        }).join(',\n    ')
    }

    getModelSchemaByName(modelName) {
        return this.modelSchemasByNameWithPlurality[modelName];
    }

    getModelNames() {
        return this.modelSchemas.map(modelSchema => modelSchema.info[this.modelNamePlurality])
    }

    getModelSchemas() {
        let apiDirectory = path.resolve(this.basePath, 'src', 'api');
        let modelSchemas = [];
        try {
            let modelFolders = fs.readdirSync(apiDirectory);
            modelFolders.forEach(model => {
                let schema = this.getModelSchema(model);
                if (schema) {
                    modelSchemas.push(schema);
                }
            })
        } catch (err) {
            console.error(`Error occurred while reading Strapi API directory ${apiDirectory}!`, err);
        }
        return modelSchemas;
    }

    getModelSchema(modelName) {
        let curPath = path.resolve(
            this.basePath,
            'src',
            'api',
            modelName,
            'content-types',
            modelName,
            'schema.json'
        )

        let modelSchema;
        try {
            modelSchema = fs.readFileSync(curPath);
            modelSchema = JSON.parse(modelSchema);
        } catch (e) {
            console.log(chalk.yellow(`Warning: strapi model (${modelName}) does not contain a schema.json`))
        }
        return modelSchema;
    }
}
