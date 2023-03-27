const predictor = require('../config/dpi_values_prediction');
const values = require('../constants/values');

class DPIService {
    constructor() {}

    async predict(file) {
        const results = await predictor.detectImageWithNoStore(values.DPI_VALUES_PROJECT_ID, values.DPI_VALUES_RESOURCE_ID, file);

        const dpiValues = {};

        results.predictions.forEach(element => {
            if(!dpiValues[element.tagName]) {
                dpiValues[element.tagName] = {
                    name: element.tagName,
                    probability: element.probability * 100,
                    box: element.boundingBox
                };
            }
            else if (dpiValues[element.tagName].probability < element.probability) {
                dpiValues[element.tagName] = {
                    name: element.tagName,
                    probability: element.probability * 100, 
                    box: element.boundingBox
                };
            }
        });

        return dpiValues;
    }

}

module.exports = DPIService;