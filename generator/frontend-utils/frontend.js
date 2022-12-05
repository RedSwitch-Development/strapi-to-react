import path from "path";
import fs from "fs";

export class FrontendGeneratorHelper {
    constructor(basePath) {
        this.basePath = basePath;
    }

    getFrontendFeatures() {
        let featuresDirectory = path.resolve(this.basePath, 'src', 'features');
        let models = [];
        try {
            models = fs.readdirSync(featuresDirectory);
        } catch (err) {
            console.error(`Error occurred while reading frontend features directory ${featuresDirectory}!`, err);
        }
        return models;
    }
}
