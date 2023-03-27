const jimp = require('jimp');

async function cropBoxImage(file, box, dimensiones) {
    try {
        const image = await jimp.read(file);
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