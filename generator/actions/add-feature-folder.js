import path from "path";

export function getAddFeatureFolderAction(modelName, config, data) {
    return {
        type: 'addMany',
        destination: path.resolve(config.frontend.basePath, 'src', 'features', modelName),
        templateFiles: `generator/templates/strapi-to-react/feature/**/*`,
        base: 'generator/templates/strapi-to-react/feature',
        data: () => config.strapi.transformFeatureData(data, modelName)
    }
}
