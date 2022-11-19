import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { AuthActions } from "../reducers/AuthReducer";
import { AppBar, Box, Toolbar, Button, ButtonGroup } from "@mui/material";
import { blue, white } from "@mui/material/colors";

export default (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const logout = () => {
    Router.push("/login");
    dispatch(AuthActions.logout());
  };

  return (
    <AppBar sx={{ bgcolor: "white" }}>
      <Toolbar>
        <Box sx={{ mr: 2 }}>
          <img src={"/logo.svg"} width="226px" height="50px"></img>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
