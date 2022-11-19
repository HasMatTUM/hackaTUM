import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Box, Typography, Container, Paper, Grid } from "@mui/material";
import { Header } from "../components";
const SuccessPage = () => {
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
        <Box
          sx={{
            pl: 4,
            pr: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckCircleIcon
            style={{ color: "green" }}
            fontSize="large"
            sx={{ mb: 5 }}
          />
          <Typography variant="body1">You have voted successfully!</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SuccessPage;
