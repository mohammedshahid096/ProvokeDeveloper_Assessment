import React from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { LogoutAction } from "../ReduxImplement/Action/user.action";

const Navbar = () => {
  const styles = {
    nav: {
      display: "flex",
      justifyContent: "end",
      padding: "0.5rem 1rem",
    },
    svg: { fontSize: "xx-large", color: "red" },
  };

  const dispatch = useDispatch();

  const LogoutButton = () => {
    dispatch(LogoutAction());
  };
  return (
    <header>
      <nav style={styles.nav}>
        <IconButton onClick={LogoutButton}>
          <PowerSettingsNewIcon style={styles.svg} />
        </IconButton>
      </nav>
    </header>
  );
};

export default Navbar;
