import {featureFromOneModel} from "./generator/generators/feature-from-one-model.js";
import {featuresFromAllModels} from "./generator/generators/features-from-all-models.js";

export const GeneratorsRegistry = [
    featureFromOneModel,
    featuresFromAllModels
]
