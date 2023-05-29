import ar from '../i18n/ar'

function __(string) {
    let stringTemp = string;
    string = string.toString();
    // replace double spaces with single space
    string = string.replace('\n', '');
    string = string.replace(/  +/g, ' ');
    console.log(string);
    let lang = localStorage.getItem('language') || 'en';
    if(lang === "ar") {
        let arKeys = Object.keys(ar).map(key => key.toLowerCase());
        let arValues = Object.values(ar).map(value => value.toLowerCase());
        let arKeysValues = Object.keys(ar).map(key => key.toLowerCase()).concat(Object.values(ar).map(value => value.toLowerCase()));
        let stringLowerCase = string.toLowerCase();
        if(arKeys.includes(stringLowerCase) || arValues.includes(stringLowerCase)) {
            let index = arKeysValues.indexOf(stringLowerCase);
            let key = Object.keys(ar)[index];
            string = ar[key];
        } 
        // string = numLatinToAr(string);
        return string;
    }
    return stringTemp;
}

// export const numLatinToAr = n => n.replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]).replace(/\./g, "٫");

export default __;
