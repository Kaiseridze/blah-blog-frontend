import { useState, FC } from "react";

import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

import "./MobileNavLinks.scss";
import { INavLinks } from "../../models";

const MobileNavLinks: FC<INavLinks> = ({ isAuth, onClick }) => {
  const [isModal, setIsModal] = useState(false);
  const onClickModal = () => {
    setIsModal(!isModal);
  };
  return (
    <div className="navmob">
      <MenuIcon className="navmob__icon" onClick={onClickModal} />
      {isModal && (
        <ul onClick={onClickModal} className="menu">
          {isAuth ? (
            <>
              <Link to="/profile">
                <li className="menu__item">My&nbsp;Profile</li>
              </Link>
              <Link to="/createPost">
                <li className="menu__item">
                  Create&nbsp;post
                </li>
              </Link>
              <Link to="/">
                <li className="menu__item" onClick={onClick}>
                  Log&nbsp;Out
                </li>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/auth/login"}>
                <li className="menu__item">Sign&nbsp;In</li>
              </Link>
              <Link to={"/auth/registration"}>
                <li className="menu__item">Sign&nbsp;Out</li>
              </Link>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default MobileNavLinks;
