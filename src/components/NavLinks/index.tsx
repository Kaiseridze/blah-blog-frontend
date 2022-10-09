import {FC} from 'react'

import { Link } from "react-router-dom";
import { INavLinks } from '../../models';

import Button from "../Button";

import './NavLinks.scss'

const NavLinks: FC<INavLinks> = ({isAuth, onClick}) => {

  return (
    <div className="nav">
      {!isAuth ? (
        <>
          <Link to={"/auth/login"}>
            <Button className="primary">Sign In</Button>
          </Link>
          <Link to={"/auth/registration"}>
            <Button className="primary">Sign Up</Button>
          </Link>
        </>
      ) : (
        <>
          <Link to={"/createPost"}>
            <Button className="primary">Create post</Button>
          </Link>
          <Link to={"/"}>
            <Button onClick={onClick} className="tertiary">
              Log Out
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavLinks;
