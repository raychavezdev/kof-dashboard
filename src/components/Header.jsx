const Header = ({ logout }) => {
  return (
    <header className="bg-black text-white py-2">
      <div className="mx-8 my-4 md:mx-10 md:my:5 flex justify-between">
        <a href="/">
          <h1>King of Flat</h1>
        </a>

        <button
          onClick={logout}
          className="bg-gray-400 text-gray-800 rounded-md px-1 cursor-pointer hover:scale-105 transition-transform will-change-transform"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Header;
