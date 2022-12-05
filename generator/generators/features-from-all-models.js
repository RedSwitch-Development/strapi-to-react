import { getModelFeatureDiffs } from '../utils/compare-models-to-features.js'
import {getAddFeatureFolderAction} from "../actions/add-feature-folder.js";
import {getModelDiffMessage} from "../utils/get-model-diff-message.js";

export function featuresFromAllModels(plop, config){
    let modelNames = config.strapi.getModelNames();
    let features = config.frontend.getFrontendFeatures();

    const {existingModelNames, missingModelNames} = getModelFeatureDiffs(modelNames, features);
    let message = getModelDiffMessage(existingModelNames, missingModelNames, config);

    plop.setGenerator('Generate frontend features from all strapi models', {
        prompts: [{
            name: 'acceptModelDiffs',
            message: "Review diffs\n" + message + "\nReview the current model to feature diffs, any strapi models that don't exist as features will be added to the frontend codebase",
            type: 'confirm',
            loop: false,
        }],
        actions: data => {
            const {acceptModelDiffs} = data;
            if (acceptModelDiffs){
                return missingModelNames.map(modelName => getAddFeatureFolderAction(modelName, config, data))
            } else {
                return undefined;
            }
        }
    })
}
