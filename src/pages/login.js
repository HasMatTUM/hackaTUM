import React from "react";
import { Button, Box, Paper, Grid, Typography, TextField } from "@mui/material";
import styled from "styled-components";
import Link from "next/link";
import Header from "../components/Header";
const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Box
      position="fixed"
      top={0}
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ borderRadius: "32px" }}
    >
      <Header />
      <Container maxWidth="xs">
        <Paper>
          <Box
            sx={{
              pl: 4,
              pr: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ py: 2 }}>
              <Typography variant="h4">Sign in</Typography>
            </Box>

            <form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Your TUM Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={onChangeEmail}
                    helperText={
                      errorMessage.includes("mail") ? errorMessage : ""
                    }
                    error={errorMessage.includes("mail")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="password1"
                    label="Password"
                    name="password1"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    helperText={
                      errorMessage.includes("password") ? errorMessage : ""
                    }
                    error={errorMessage.includes("password")}
                  />
                </Grid>
              </Grid>

              <Box sx={{ py: 2, mb: 5 }}>
                <Link href="/votingpage" passHref>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={email.trim() === "" || password.trim() === ""}
                  >
                    Sign In
                  </Button>
                </Link>
              </Box>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;

const Container = styled.div`
  align-content: center;
  padding-top: 150px;
  min-height: 100%;
  margin: auto;
  width: 400px;
  max-width: 100%;
`;
