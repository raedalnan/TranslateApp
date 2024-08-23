import DropDown from './components/DropDown';
import speakerSvg from './assets/sound_max_fill.svg';
import copySvg from './assets/Copy.svg';
import aSvg from './assets/Sort_alfa.svg';
import { useState, useEffect } from 'react';
import React from 'react';
import languagesList from './languages.json';
import useStore from './hooks/useStore';

type languageObject = { name: string; code: string };

const baseURL: string = 'https://api.mymemory.translated.net';

function InputBox() {
  const originText: string = useStore((state) => state.originText);
  // const translatedText: string = useStore((state) => state.translatedText);
  const setOriginText: (text: string) => void = useStore(
    (state) => state.setOriginText
  );
  const setTranslatedText: (text: string) => void = useStore(
    (state) => state.setTranslatedText
  );
  const inputLanguage: languageObject = useStore(
    (state) => state.inputLanguage
  );
  const setInputLanguage: (language: { name: string; code: string }) => void =
    useStore((state) => state.setInputLanguage);
  const outputLanguage: languageObject = useStore(
    (state) => state.outputLanguage
  );
  const [showMessage, setShowMessage] = useState(false);

  const handleSelect = (e: React.MouseEvent<HTMLLIElement>): void => {
    const temp = languagesList.find((i) => i.name == e.currentTarget.innerHTML);
    if (temp) {
      setInputLanguage(temp);
    } else {
      console.error('Language not found');
    }
  };

  function handleClick() {
    if (originText) {
      fetch(
        `${baseURL}/get?q=${originText}&langpair=${inputLanguage.code}|${outputLanguage.code}`
      )
        .then((res) => res.json())
        .then((data) => {
          setTranslatedText(data.responseData.translatedText);
        })
        .catch((error) =>
          console.log('there was an error fetching data : ', error)
        );
    }
  }
  const textToSpeech = () => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(originText);
      utterance.lang = inputLanguage.code;
      synth.speak(utterance);
    } else {
      console.error('Speech Synthesis not supported in this browser.');
    }
  };

  const handleCopy = () => {
    setShowMessage(true);
    navigator.clipboard.writeText(originText);
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className="w-full max-w-full h-96 bg-charcoal-80 rounded-3xl border border-slate-blue flex flex-col  px-6 sm:px-8 md:px-10 pb-6 pt-4">
      <div className="border-b-2 border-slate-blue p-2 pb-3 mb-4 h-auto w-full flex flex-row justify-between items-start sm:items-center">
        <ul className="text-slate-blue md:text-lg font-semibold flex flex-row text-xs justify-start items-center gap-4 sm:gap-8 w-full cursor-pointer">
          <li
            key={'ar'}
            onClick={handleSelect}
            className={
              inputLanguage.name === 'Arabic'
                ? 'text-off-white bg-slate-blue p-2 rounded-xl text-center'
                : 'text-center'
            }
          >
            Arabic
          </li>

          <li
            key={'en'}
            onClick={handleSelect}
            className={
              inputLanguage.name === 'English'
                ? 'text-off-white bg-slate-blue p-2 rounded-xl'
                : ''
            }
          >
            English
          </li>
          <li
            key={'fr'}
            onClick={handleSelect}
            className={
              inputLanguage.name === 'French'
                ? 'text-off-white bg-slate-blue p-2 rounded-xl'
                : ''
            }
          >
            French
          </li>
          <li>
            <DropDown type="input" />
          </li>
        </ul>
      </div>
      <textarea
        className="bg-transparent scrollbar-thin scrollbar-thumb-midnight-80 scrollbar-track-charcoal-80 cursor-text text-lg text-off-white text-start focus:outline-none focus:ring-0 resize-none w-full h-[650px]"
        maxLength={500}
        onChange={(e) => setOriginText(e.target.value)}
        value={originText}
      />

      <p className="text-slate-blue text-md font-semibold text-right mt-2">
        {originText.length}/500
      </p>
      <div className="flex flex-row justify-between items-start md:items-end mt-4">
        <div className="flex justify-center items-center gap-3 mb-4 md:mb-0">
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

        <button
          onClick={handleClick}
          className="flex justify-center items-center hover:opacity-90 bg-royal-blue text-off-white text-sm md:text-lg font-semibold border border-sky-blue rounded-xl py-2 px-4 sm:py-3 sm:px-6"
        >
          <img src={aSvg} alt="A" className="mr-2 w-6 h-6" /> Translate
        </button>
      </div>
    </div>
  );
}

export default InputBox;
