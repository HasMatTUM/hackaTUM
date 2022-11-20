import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import Link from "next/link";

import { Button, Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Header />
        <Box
          position="fixed"
          top={0}
          height="100%"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Container>
            <Box>
              <Typography variant="h3">Welcome to TUM Voices!</Typography>
              <Box sx={{ mt: 5 }}>
                <Typography variant="body 1">
                  This is the transparent and safe voting platform for political
                  participation at TUM
                </Typography>
              </Box>
              <Box sx={{ mt: 5 }}>
                <img src={"/voting.jpg"} width="700px" height="300px"></img>
              </Box>
              <Box sx={{ mt: 5 }}>
                <Link href="/surveychart" passHref>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 3, width: 700, mb: 2 }}
                  >
                    View the current survey
                  </Button>
                </Link>
                <Link href="/login" passHref>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 3, width: 700 }}
                  >
                    Login to vote
                  </Button>
                </Link>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Home;

const Container = styled.div`
  align-content: center;
  padding-top: 150px;
  min-height: 100%;
  margin: auto;
  width: 800px;
  max-width: 100%;
`;
