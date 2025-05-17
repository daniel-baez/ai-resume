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
        "name": "Español",
        "flag": "/flags/cl.svg",
        "code": "es"
    },
    "fr": {
        "name": "Français",
        "flag": "/flags/fr.svg",
        "code": "fr"
    }
}

export const getLanguageByCode = (code: string): Language | undefined => {
    return AVAILABLE_LANGUAGES[code];
}
