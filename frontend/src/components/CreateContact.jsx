import React, { useState } from "react";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";

const CreateContact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phoneNumber: "",
    jobTitle: "",
    contactId: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // For displaying error message

  const api = "http://localhost:8000/api/contacts";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${api}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        phoneNumber: "",
        jobTitle: "",
        contactId: "",
      });

      console.log("Contact created successfully");
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "Failed to create contact");
      console.error("Failed to create contact");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        marginTop: "50px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: 2,
      }}
    >
      <Typography textAlign={"center"} fontSize={"50px"} marginBottom={"50px"}>
        Contact Form
      </Typography>

      {/* Display error message */}
      {errorMessage && (
        <Typography
          color="error"
          variant="body1"
          textAlign="center"
          marginBottom={2}
        >
          {errorMessage}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Contact ID"
              fullWidth
              name="contactId" // Fixed name here
              value={formData.contactId}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              fullWidth
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              fullWidth
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Company"
              fullWidth
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              fullWidth
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Job Title"
              fullWidth
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Create Contact
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateContact;
