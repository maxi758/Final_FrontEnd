import React, { useState } from "react";
import { Link } from "react-router-dom";

import NavLinks from "./NavLinks";
import MainHeader from "./MainHeader";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import "./MainNavigation.css";

const MainNavigation = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false); // useState() returns an array with exactly two elements. The first element is the current state value and the second element is a function that allows us to update this value.

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    // No se puede retornar mas de un elemento root, por eso se usa React.Fragment
    <React.Fragment>
      {/*React.Fragment es un componente que no se renderiza, es como un div vacio*/}
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      {/*Si drawerIsOpen es true, entonces renderiza el Backdrop*/}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      {/*Si drawerIsOpen es false, entonces no renderiza nada*/}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Clínica Medica</Link>{" "}
          {/*esto es para que cuando haga click en el titulo, me lleve a la ruta principal */}
          {/* <Link to="/about">About</Link>
				<Link to="/contact">Contact</Link> */}
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
