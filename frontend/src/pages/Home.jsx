import { Typography } from "@mui/material";
import React from "react";

const Contact = () => {
  return (
    <Typography
      marginTop={"250px"}
      fontSize={"90px"}
      textAlign={"center"}
      fontFamily={("poppins", "sans-serif")}
    >
      Contact Managemnt System
      <Typography fontSize={"50px"} color="skyblue">
        Create your contacts
      </Typography>
    </Typography>
  );
};

export default Contact;
