const predictor = require('../config/licencia_values_prediction');
const values = require('../constants/values');

class LicenciaService {
    constructor() {}

    async predict(file) {
        const results = await predictor.detectImageWithNoStore(values.LICENCIA_VALUES_PROJECT_ID, values.LICENCIA_VALUES_RESOURCE_ID, file);

        const licenciaValues = {};

        results.predictions.forEach(element => {
            if(!licenciaValues[element.tagName]) {
                licenciaValues[element.tagName] = {
                    name: element.tagName,
                    probability: element.probability * 100,
                    box: element.boundingBox
                };
            }
            else if (licenciaValues[element.tagName].probability < element.probability) {
                licenciaValues[element.tagName] = {
                    name: element.tagName,
                    probability: element.probability * 100, 
                    box: element.boundingBox
                };
            }
        });

        return licenciaValues;
    }

}

module.exports = LicenciaService;