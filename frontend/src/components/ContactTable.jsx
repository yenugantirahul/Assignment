import React, { useState, useEffect } from "react";
import {
  Typography,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ContactCards = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const api = "http://localhost:8000/api/contacts/";
  const navigate = useNavigate();

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }

      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (contactId) => {
    try {
      const response = await fetch(`${api}/delete/${contactId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }

      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (isLoading) {
    return <Typography>Loading contacts...</Typography>;
  }

  return (
    <Grid container spacing={3} sx={{ marginTop: "20px" }}>
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <Grid item xs={12} sm={6} md={4} key={contact.contactId}>
            <Card>
              <CardContent>
                <Typography variant="h6">{`${contact.firstName} ${contact.lastName}`}</Typography>
                <Typography variant="body2">{`Email: ${contact.email}`}</Typography>
                <Typography variant="body2">{`Phone: ${contact.phoneNumber}`}</Typography>
                <Typography variant="body2">{`Company: ${contact.company}`}</Typography>
                <Typography variant="body2">{`Job Title: ${contact.jobTitle}`}</Typography>
              </CardContent>
              <CardActions>
                <Tooltip title="Edit">
                  <IconButton
                    onClick={() => navigate(`/edit/${contact.contactId}`)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => handleDelete(contact.contactId)}
                    color="secondary"
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography>No contacts available</Typography>
      )}
    </Grid>
  );
};

export default ContactCards;
