import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Container, Typography, Button } from "@mui/material";
import { Header } from "../components";
import Link from "next/link";

const data = [
  {
    name: "Survey 1",
    Yes: 300,
    No: 200,
    Not_Participatied: 100,
  },
];
const mockSurvey = {
  title: "Survey 1",
  description:
    "This survey is about whether Schweinerbraten should be served tomorrow in canteen.",
  expirationDate: "23:59, November 20, 2022",
};

const SurveyChart = () => {
  return (
    <Box
      position="fixed"
      top={0}
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Header />
      <Box flexDirection="row">
        <Typography variant="h2" sx={{ mb: 2 }}>
          {mockSurvey.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Description: {mockSurvey.description}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Expiration Time: {mockSurvey.expirationDate}
        </Typography>
        <Container sx={{ mb: 5 }}>
          <BarChart width={830} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Yes" fill="#3070B3" />
            <Bar dataKey="No" fill="#EABF7E" />
            <Bar dataKey="Not_Participatied" fill="#9218ab" />
          </BarChart>
        </Container>
        <Link href="/" passHref>
          <Button variant="contained" color="primary" sx={{ width: 850 }}>
            Back to homepage
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default SurveyChart;
