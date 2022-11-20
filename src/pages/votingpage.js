import { Button, Box, Typography, Container, Paper, Grid } from "@mui/material";
import { blue } from "@mui/material/colors";
import Header from "../components/Header";
import { useRouter } from "next/router";

const VotingPage = () => {
  const router = useRouter();

  const onVoteYes = () => {
    console.log("user has voted yes");
    router.push("/successpage");
  };
  const onVoteNo = () => {
    console.log("user has voted no");
    router.push("/waitingpage");
  };

  return (
    <Box
      position="fixed"
      top={0}
      height="100%"
      width="100%"
      bgcolor="background.main"
      display="flex"
      alignItems="center"
      justifyContent="center"
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
            <Box sx={{ pb: 5, mt: 4 }}>
              <Typography variant="h3">Sample Vote 1</Typography>
            </Box>
            <Box sx={{ pb: 5, mt: 2 }}>
              <Typography VARIANT="body1">
                Do you think that TUM should hold HackaTUM twice a year?
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  key="confirm-yes-button"
                  variant="contained"
                  onClick={onVoteYes}
                  sx={{ color: blue, mb: 2 }}
                  type="submit"
                  fullWidth
                >
                  Yes
                </Button>
                <Button
                  key="confirm-no-button"
                  variant="contained"
                  onClick={onVoteNo}
                  sx={{ color: blue, mb: 2 }}
                  type="submit"
                  fullWidth
                >
                  No
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
export default VotingPage;
