import "./Header.scss";

import { Avatar, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { logout } from "../../store/reducers/authSlice";
import NavLinks from "../NavLinks";
import MobileNavLinks from "../MobileNavLinks";

const Header = () => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector((state) => state.auth.data);
  const isAuth = Boolean(authData);

  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  return (
    <header className="header">
      <Link to={"/"}>
        <h3>Blog</h3>
      </Link>
      {isAuth && (
        <Link to={"/profile"}>
          <div className="header__user">
            <Avatar src={`http://localhost:4444${authData?.avatarUrl}`} />
            <Typography>{authData.fullName}</Typography>
          </div>
        </Link>
      )}
      <NavLinks isAuth={isAuth} onClick={onLogout}/>
      <MobileNavLinks isAuth={isAuth} onClick={onLogout}/>
    </header>
  );
};

export default Header;
