const predictor = require('../config/smart_crop_prediction');
const values = require('../constants/values');
const jimp = require('jimp');

class SmartCropService {

    constructor() { }

    async smartCrop(file, dimensiones) {
        const results = await predictor.detectImage(values.SMART_CROP_PROJECT_ID, values.SMART_CROP_RESOURCE_ID, file)
        const box = results.predictions[0].boundingBox;
        const image = await this.cropBoxImage(file, box, dimensiones);
        return image;
    }

    async cropBoxImage(file, box, dimensiones, convert) {
        try {
            const image = await jimp.read(file);

            if(convert) {
                image.greyscale();
                image.contrast(0.25);
                image.brightness(0.15);
                // const kernel = [
                //     [-1, -1, -1],
                //     [-1, 9.5, -1],
                //     [-1, -1, -1]
                // ];
                // image.convolution(kernel);
            }

            const x = box.left * dimensiones.IMAGE_WIDTH;
            const y = box.top * dimensiones.IMAGE_HEIGHT;
            const width = box.width * dimensiones.IMAGE_WIDTH;
            const height = box.height * dimensiones.IMAGE_HEIGHT;
            const cropped = await image.crop(x, y, width, height).getBufferAsync(jimp.MIME_JPEG);
            return cropped;
        } catch (error) {
            throw error;   
        }
    }

    async getDims(file) {
        try {
            const image = await jimp.read(file);
            const dimensiones = {
                IMAGE_WIDTH: image.bitmap.width,
                IMAGE_HEIGHT: image.bitmap.height
            };
            return dimensiones;
        } catch (error) {
            throw error;
        }
    }

    async resize(file) {
        try {
            const image = await jimp.read(file);
            return image.resize(1024, 750);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SmartCropService;