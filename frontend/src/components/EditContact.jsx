import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, TextField, Button, Typography } from "@mui/material";

const EditContact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = "http://localhost:8000/api/contacts";

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`${api}/${contactId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch contact");
        }
        const data = await response.json();
        setContact(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContact();
  }, [contactId]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${api}/edit/:${contactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (!response.ok) {
        throw new Error("Failed to update contact");
      }

      navigate("/contacts");
      alert("Edited Successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return <Typography>Loading contact...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper sx={{ padding: 2, margin: "20px auto", maxWidth: 600 }}>
      <Typography variant="h4">Edit Contact</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          value={contact.firstName}
          onChange={(e) =>
            setContact({ ...contact, firstName: e.target.value })
          }
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={contact.lastName}
          onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Phone Number"
          value={contact.phoneNumber}
          onChange={(e) =>
            setContact({ ...contact, phoneNumber: e.target.value })
          }
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Company"
          value={contact.company}
          onChange={(e) => setContact({ ...contact, company: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Job Title"
          value={contact.jobTitle}
          onChange={(e) => setContact({ ...contact, jobTitle: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </Paper>
  );
};

export default EditContact;
