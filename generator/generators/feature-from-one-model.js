import {getAddFeatureFolderAction} from '../actions/add-feature-folder.js'
import {getModelFeatureDiffs} from "../utils/compare-models-to-features.js";
import {getModelDiffMessage} from "../utils/get-model-diff-message.js";

export function featureFromOneModel (plop, config) {
    let modelNames = config.strapi.getModelNames();
    let features = config.frontend.getFrontendFeatures();

    const {existingModelNames, missingModelNames} = getModelFeatureDiffs(modelNames, features);
    let message = getModelDiffMessage(existingModelNames, missingModelNames, config);

    plop.setGenerator('Generate frontend feature from a strapi model', {
        prompts: [{
            name: 'modelName',
            message: 'Review diffs\n' + message + "Choose strapi model to add as a frontend feature; only displaying non-existing features",
            type: 'list',
            choices: missingModelNames,
            loop: false,
        }],
        actions: (data) => {
            return [getAddFeatureFolderAction(data.modelName, config, data)]
        }
    })
}
