export type Language = {
    name: string;
    flag: string;
    code: string;
}


export const AVAILABLE_LANGUAGES: { [key: string]: Language } = {
    "en": {
        "name": "English",
        "flag": "/flags/us.svg",
        "code": "en"
    },
    "es": {
        "name": "Spanish",
        "flag": "/flags/cl.svg",
        "code": "es"
    },
    "fr": {
        "name": "French",
        "flag": "/flags/fr.svg",
        "code": "fr"
    }
}