import DropDown from './components/DropDown';
import speakerSvg from './assets/sound_max_fill.svg';
import copySvg from './assets/Copy.svg';
import arrowsSvg from './assets/Horizontal_top_left_main.svg';
import { useState } from 'react';
import React from 'react';
import useStore from './hooks/useStore';
import languagesList from './languages.json';

type languageObject = { name: string; code: string };

function OutputBox() {
  const [showMessage, setShowMessage] = useState(false);
  const translatedText: string = useStore((state) => state.translatedText);
  const originText: string = useStore((state) => state.originText);
  const setTranslatedText: (text: string) => void = useStore(
    (state) => state.setTranslatedText
  );
  const setOriginText: (text: string) => void = useStore(
    (state) => state.setOriginText
  );
  const outputLanguage: languageObject = useStore(
    (state) => state.outputLanguage
  );
  const setOutputLanguage: (language: languageObject) => void = useStore(
    (state) => state.setOutputLanguage
  );
  const inputLanguage: languageObject = useStore(
    (state) => state.inputLanguage
  );
  const setInputLanguage: (language: { name: string; code: string }) => void =
    useStore((state) => state.setInputLanguage);

  function handleSwap() {
    const tempLanguage = outputLanguage;
    const tempText = translatedText;
    setOutputLanguage(inputLanguage);
    setInputLanguage(tempLanguage);
    setTranslatedText(originText);
    setOriginText(tempText);
  }

  const handleSelect = (e: React.MouseEvent<HTMLLIElement>): void => {
    const temp = languagesList.find((i) => i.name == e.currentTarget.innerHTML);
    if (temp) {
      setOutputLanguage(temp);
    } else {
      console.error('Language not found');
    }
  };

  const textToSpeech = () => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = outputLanguage.code;
      synth.speak(utterance);
    } else {
      console.error('Speech Synthesis not supported in this browser.');
    }
  };

  const handleCopy = () => {
    setShowMessage(true);
    navigator.clipboard.writeText(translatedText);
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-full h-96 bg-charcoal-80 rounded-3xl border border-slate-blue flex flex-col  px-6 sm:px-8 md:px-10 pb-6 pt-4">
      <div className="border-b-2 border-slate-blue p-2 pb-3 mb-4 h-auto w-full flex flex-row justify-between items-start sm:items-center">
        <ul className="text-slate-blue text-xs md:text-lg font-semibold flex flex-row justify-start items-center gap-3 md:gap-8 w-full cursor-pointer">
          <li
            key={'ar'}
            onClick={handleSelect}
            className={
              outputLanguage.name === 'Arabic'
                ? 'text-off-white bg-slate-blue p-2 rounded-xl text-center'
                : 'text-center'
            }
          >
            Arabic
          </li>
          <li
            onClick={handleSelect}
            key={'en'}
            className={
              outputLanguage.name === 'English'
                ? 'text-off-white bg-slate-blue p-2 rounded-xl'
                : ''
            }
          >
            English
          </li>
          <li
            onClick={handleSelect}
            key={'fr'}
            className={
              outputLanguage.name === 'French'
                ? 'text-off-white bg-slate-blue p-2 rounded-xl'
                : ''
            }
          >
            French
          </li>
          <li>
            <DropDown type="output" />
          </li>
        </ul>

        <button
          onClick={handleSwap}
          className="flex justify-center items-center rounded-xl border-2 border-slate-blue hover:bg-midnight-80 p-2"
        >
          <img src={arrowsSvg} alt="arrows" className="w-6 h-6" />
        </button>
      </div>
      <textarea
        className="bg-transparent cursor-text text-lg text-off-white text-start focus:outline-none focus:ring-0 resize-none w-full h-[650px]"
        readOnly
        maxLength={500}
        value={translatedText}
      />

      <div className="flex flex-row justify-between items-end mt-4">
        <div className="flex justify-center gap-3 mb-4 sm:mb-0">
          <button
            onClick={textToSpeech}
            className="flex justify-center items-center rounded-xl border-2 border-slate-blue hover:bg-midnight-80 p-2"
          >
            <img src={speakerSvg} alt="speaker" className="w-6 h-6" />
          </button>
          <button
            onClick={handleCopy}
            className="flex justify-center items-center rounded-xl border-2 border-slate-blue hover:bg-midnight-80 p-2 relative"
          >
            <img src={copySvg} alt="copy" className="w-6 h-6" />
            {showMessage && (
              <div className="p-2 bg-slate-blue text-off-white text-xs rounded-xl absolute -top-10 animate-bounce">
                Copied!
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OutputBox;
