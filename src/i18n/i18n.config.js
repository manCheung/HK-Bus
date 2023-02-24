import i18n from 'i18next';
import { Platform, NativeModules } from 'react-native';
import { initReactI18next } from 'react-i18next';

import en from '../i18n/languages/en.json';

const RNLanguageDetector = {
    type: 'languageDetector',
    init: () => {},
    detect: () => {
        const locale =
            Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] : NativeModules.I18nManager.localeIdentifier;
        return locale.split('_')[0];
    },
    cacheUserLanguage: () => {}
};

const resources = {
    en: en
};

i18n.use(RNLanguageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources,
        fallbackLng: 'en',
        ns: ['translation'],
        defaultNS: 'translate',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
