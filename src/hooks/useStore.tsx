import { create } from 'zustand';

type LanguageObject = { name: string; code: string };

type Store = {
  originText: string;
  setOriginText: (text: string) => void;
  translatedText: string;
  setTranslatedText: (text: string) => void;
  outputLanguage: LanguageObject;
  inputLanguage: LanguageObject;
  setInputLanguage: (language: LanguageObject) => void;
  setOutputLanguage: (language: LanguageObject) => void;
};

const useStore = create<Store>((set) => ({
  originText: 'Hello, how are you',
  translatedText: '',
  setTranslatedText: (text: string) => set({ translatedText: text }),
  setOriginText: (text: string) => set({ originText: text }),
  inputLanguage: { name: 'English', code: 'en' },
  outputLanguage: { name: 'French', code: 'fr' },
  setInputLanguage: (language: LanguageObject) =>
    set({ inputLanguage: language }),
  setOutputLanguage: (language: LanguageObject) =>
    set({ outputLanguage: language }),
}));

export default useStore;
