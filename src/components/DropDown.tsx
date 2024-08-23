import { useState, useRef, useEffect } from 'react';
import languages from '../languages.json';
import svg from '../assets/Expand_down.svg';
import useStore from '../hooks/useStore';

const DropDown = ({ type }: { type: string }) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const setInputLanguage: (language: { name: string; code: string }) => void =
    useStore((state) => state.setInputLanguage);
  const setOutputLanguage: (language: { name: string; code: string }) => void =
    useStore((state) => state.setOutputLanguage);
  const outputLanguage = useStore((state) => state.outputLanguage);
  const inputLanguage = useStore((state) => state.inputLanguage);
  const selectedLanguage = type == 'input' ? inputLanguage : outputLanguage;
  const setSelectedLanguage =
    type == 'input' ? setInputLanguage : setOutputLanguage;

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function handleLanguageSelect(language: { name: string; code: string }) {
    setSelectedLanguage(language);
    type == 'input' ? setInputLanguage(language) : setOutputLanguage(language);
    setIsOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="relative">
      <button
        className={`flex justify-center items-center relative ${isOpen && 'text-off-white bg-slate-blue p-2 rounded-xl opacity-70'} ${
          selectedLanguage.name !== 'Arabic' &&
          selectedLanguage.name !== 'French' &&
          selectedLanguage.name !== 'English'
            ? 'text-off-white bg-slate-blue p-2 rounded-xl'
            : ''
        } `}
        onClick={handleClick}
      >
        {selectedLanguage.name !== 'Arabic' &&
        selectedLanguage.name !== 'French' &&
        selectedLanguage.name !== 'English'
          ? selectedLanguage.name
          : ''}
        <img src={svg} alt="arrowDown" className="opacity-80 w-5" />
      </button>
      {isOpen && (
        <ul
          ref={menuRef}
          className="md:w-32 w-28 h-56 md:h-64 mt-1 bg-charcoal-80 text-[1rem] text-off-white overflow-y-scroll overflow-x-hidden absolute z-10  rounded-lg scrollbar-thin scrollbar-thumb-midnight-80 scrollbar-track-charcoal-80"
        >
          {languages.map((language) =>
            language.code === 'ar' ||
            language.code === 'en' ||
            language.code === 'fr' ? null : (
              <li
                key={language.code}
                className="cursor-pointer hover:bg-steel-gray pl-2 py-1 font-thin md:font-semibold"
                onClick={() => handleLanguageSelect(language)}
              >
                {language.name}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
