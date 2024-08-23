import bg from './assets/hero_img.jpg';
import logo from './assets/logo.svg';
import InputBox from './InputBox';
import OutputBox from './OutputBox';

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className="w-full h-full flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-cover bg-center flex-col max-w-full min-h-screen"
    >
      <img src={logo} alt="logo" className="w-32 sm:w-48 mb-12 sm:mb-24" />
      <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-4 h-auto lg:h-[60%]">
        <InputBox />
        <OutputBox />
      </div>
    </div>
  );
}

export default App;
