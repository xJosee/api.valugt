const DPIService = require('../services/dpi.service');
const SmartCropService = require('../services/crop.service');
const OCRService = require('../services/ocr.service');

const fs = require('fs');

class DPIController {

    constructor() { }

    async predict(req, res) {
        try {
            const dpiService = new DPIService();
            const cropService = new SmartCropService();
            const ocrService = new OCRService();

            let file = req.file.buffer;

            // const dimensiones = await cropService.getDims(file);
            // const croppedImg = await cropService.smartCrop(file, dimensiones);
            //file = await cropService.resize(file);
            const croppedDims = await cropService.getDims(file);
            const prediction = await dpiService.predict(file);


            const values = Object.values(prediction);
            const dpi_values_detected = {};

            for (let i = 0; i < values.length; i++) {

                let convert = true;
                if(values[i].name == 'foto') convert = false;

                let img = await cropService.cropBoxImage(file, values[i].box, croppedDims, convert);
                //fs.writeFileSync('test/' + values[i].name + '.jpeg', img);

                if (values[i].name === 'foto') {
                    dpi_values_detected[values[i].name] = img.toString('base64');
                }
                else if (values[i].name === 'sexo') {
                    const text = await ocrService.getOCR(img, values[i].name);
                    if (text.toLowerCase().includes('fem')) dpi_values_detected[values[i].name] = 'FEMENINO';
                    else dpi_values_detected[values[i].name] = 'MASCULINO';
                }
                else {
                    const text = await ocrService.getOCR(img, values[i].name);
                    dpi_values_detected[values[i].name] = text;
                }
            }

            res.status(200).json({ error: false, prediction: dpi_values_detected, message: "Predicción realizada correctamente" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: true, prediction: {}, message: "Ha ocurrido un error al tratar de hacer la predicción"});
        }
    }
}

module.exports = DPIController;