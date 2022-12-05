import chalk from "chalk";

export function getModelDiffMessage(existingModelNames, missingModelNames, config) {

    let longestLength = Math.max(...([...existingModelNames, ...missingModelNames].map(el => el.length)));

    function getModelLog(modelName, exists) {
        let schema = config.strapi.getModelSchemaByName(modelName);
        if (exists) {
            return `${chalk.yellow.bold(`✓ ${modelName.padEnd(longestLength)}`)} ${chalk.reset.gray(schema.kind)}`
        } else {
            return `${chalk.green.bold(`+ ${modelName.padEnd(longestLength)}`)} ${chalk.reset.gray(schema.kind)}`
        }
    }

    let builtMessage = `\n${chalk.green.bold(`+ modelName`)} - ${chalk.reset(`Feature does not exist and ${chalk.bold('can be added')}`)}\n${chalk.yellow.bold(`✓ modelName`)} - ${chalk.reset(`Feature exists and ${chalk.bold('can not be added')}`)}
    \n${chalk.dim('Model Name'.padEnd(longestLength))} ${chalk.dim('  Model Type')}\n`

    missingModelNames.forEach(modelName => builtMessage += getModelLog(modelName, false) + '\n')
    existingModelNames.forEach(modelName => builtMessage += getModelLog(modelName, true) + '\n')
    return builtMessage;
}
