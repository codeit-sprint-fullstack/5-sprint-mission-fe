import React from "react";
import LogImg from "../../components/img/판다 얼굴.png";
import LogText from "../../components/img/판다마켓.png";
import { Link, NavLink } from "react-router-dom";

export function Header({ loginBtn }) {
  return (
    <header className="fixed  w-full h-16  px-48 max-lg:px-8 bg-white border-b border-gray-300 z-10">
      <div className="flex justify-between items-center w-full  ">
        <div className="flex items-center gap-3">
          <Link className="flex gap-3" to="/">
            <img src={LogImg} alt="market logo" className="w-10" />
            <img
              src={LogText}
              alt="market text logo"
              className="w-28 object-contain"
            />
          </Link>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `py-4 px-4 text-lg font-bold ${
                isActive ? "text-blue-500" : "text-gray-600"
              } hover:text-blue-400`
            }
          >
            자유게시판
          </NavLink>
          <NavLink
            to="/items"
            className={({ isActive }) =>
              `py-3 px-2 text-lg font-bold  ${
                isActive ? "text-blue-500" : "text-gray-600"
              } hover:text-blue-400`
            }
          >
            중고마켓
          </NavLink>
        </div>
        <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
          {loginBtn}
        </button>
      </div>
    </header>
  );
}
