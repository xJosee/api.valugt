const tesseract = require("node-tesseract-ocr");
const configText = {
    oem: 1,
    psm: 6
};

const configOneLetter = {
    psm: 10,
    oem: 1
};

class OCR {
    constructor(){}

    async getOCR_Licencia(file, key) {
        try {

            const config = key == 'tipo' ? configOneLetter : configText;

            const text = await tesseract.recognize(file, config);
            console.log(text);

            return text.replace('\n', ' ');
        } catch (error) {
            throw error;
        }
    }

    async getOCR(file, key){
        try {
            const text = await tesseract.recognize(file, configText);
            console.log(text);

            if(key == 'nacimiento') return this.getFechaNacimientoText(text);
            if(key == 'numero') return this.getNumeroDPIText(text);

            return this.cleanText(text.toUpperCase());
        } catch (error) {
            throw error;
        }
    }

    getFechaNacimientoText(text) {
        const split = String(text).split('\n');
        split.shift();
        text = this.clearMonth(split.join(' ').trim());
        
        const regex = /(\d{2})(ENE|FEB|MAR|ABR|MAY|JUN|JUL|AGO|SEP|OCT|NOV|DIC)(\d{4})$/;
        const matches = String(text).match(regex);
        
        if(matches) return `${matches[1]}/${this.getMonth(matches[2])}/${matches[3]}`;
        return this.cleanText(text);
    }

    getNumeroDPIText(text) {
        text = text.replace(/\n/g, '').replace(/\s\s+/g, '').replace(/a-zA-Z/).trim();
        return text;
    }

    cleanText(text){
        let split = String(text).split('\n');
        split = [...split.filter((value) => value)];

        if(split.length > 1) {
            split.shift();
            text = split.join(' ');
            return text;
        }

        return text;
    }

    clearMonth(text) {
        return String(text)
        .replace('AG0', 'AGO')
        .replace('0CT', 'OCT')
        .replace('N0V', 'NOV')
    }

    getMonth(month) {
        const months = {
            'ENE': '01',
            'FEB': '02',
            'MAR': '03',
            'ABR': '04',
            'MAY': '05',
            'JUN': '06',
            'JUL': '07',
            'AGO': '08',
            'SEP': '09',
            'OCT': '10',
            'NOV': '11',
            'DIC': '12'
        }

        return months[month];
    }
}

module.exports = OCR;