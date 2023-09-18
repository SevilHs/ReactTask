import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <ul>
        <li>
          <NavLink to={"/todos"}>Todos</NavLink>
        </li>
        <li>
          <NavLink to={"/posts"}>Posts</NavLink>
        </li>
        <li>
          <NavLink to={"/comments"}>Commnets</NavLink>
        </li>
        <li>
          <NavLink to={"/albums"}>Albums</NavLink>
        </li>
        <li>
          <NavLink to={"/photos"}>Photos</NavLink>
        </li>
        <li>
          <NavLink to={"/users"}>Users</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
