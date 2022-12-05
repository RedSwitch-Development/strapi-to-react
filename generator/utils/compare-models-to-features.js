export function getModelFeatureDiffs(strapiModelNames, frontendFeatures){
    let existingModelNames = [];
    let missingModelNames = [];
    strapiModelNames.forEach(modelName => {
        let modelExistsAsFeature = frontendFeatures.indexOf(modelName) !== -1;
        if (modelExistsAsFeature){
            existingModelNames.push(modelName);
        } else {
            missingModelNames.push(modelName);
        }
    })
    return {existingModelNames, missingModelNames}
}
