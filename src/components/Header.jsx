import { Link } from "react-router-dom";

const Header = ({ logout }) => {
  return (
    <header className="bg-black text-white py-2">
      <div className="mx-8 my-4 md:mx-10 md:my:5 flex justify-between">
        <a href="/">
          <h1 className="font-bold md:text-2xl">King of Flat</h1>
        </a>

        <ul>
          <li>
            <Link
              to={"/matches"}
              className="text-xs md:text-base font-bold text-blue-500 underline"
            >
              Enfrentamientos
            </Link>
          </li>
        </ul>

        <button
          onClick={logout}
          className="bg-gray-400 text-gray-800 rounded-md md:px-1 px-0.5 cursor-pointer hover:scale-105 transition-transform will-change-transform text-xs md:text-base "
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Header;
