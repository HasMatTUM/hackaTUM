import { Box, CircularProgress, Typography } from "@mui/material";


import { useRouter } from "next/router";


const waitingpage = () => {

  const router = useRouter();
  setTimeout(function () {
    router.push("/successpage");
  }, 3000);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        mt: "150px",
        flexDirection: "column",
      }}
    >
      <Typography variant="subtitle1">
        Waiting for the verifying process, please wait...
      </Typography>
      <CircularProgress sx={{ mt: 5 }} />
    </Box>
  );
};

export default waitingpage;
