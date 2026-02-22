export const i18n = {
    defaultLocale: 'it',
    locales: ['it', 'en', 'de'],
};

export const getDictionary = async (locale) => {
    return import(`../dictionaries/${locale}.json`).then((module) => module.default);
};
