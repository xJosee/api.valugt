
const values = require('../constants/values');
const PredictionApi = require("@azure/cognitiveservices-customvision-prediction");
const msRest = require("@azure/ms-rest-js");


const predictorCredentials = new msRest.ApiKeyCredentials({ inHeader: { "Prediction-key": values.LICENCIA_VALUES_PREDICTION_KEY } });
const predictor = new PredictionApi.PredictionAPIClient(predictorCredentials, values.LICENCIA_VALUES_URL);

module.exports = predictor;