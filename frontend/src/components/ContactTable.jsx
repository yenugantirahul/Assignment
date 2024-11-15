import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ContactTable = () => {
  const [contacts, setContacts] = useState([]); // All contacts
  const [sortedContacts, setSortedContacts] = useState([]); // Sorted and paginated contacts
  const [order, setOrder] = useState("asc"); // Sorting order (asc/desc)
  const [orderBy, setOrderBy] = useState("contactId"); // Sorting column (we will sort by ID)
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const api = "http://localhost:8000/api/contacts/"; // Base API URL
  const navigate = useNavigate(); // Use navigate hook

  // Fetch contacts from API
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
      setContacts(data); // Store the fetched contacts
      setSortedContacts(data); // Initialize sorted contacts
    } catch (error) {
      console.error("Error fetching contacts:", error.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchContacts(); // Fetch contacts on component mount
  }, []);

  // Basic sorting logic based on contactId (ascending or descending)
  const handleSort = () => {
    const isAscending = order === "asc";
    const sortedData = [...contacts].sort((a, b) => {
      if (a.contactId < b.contactId) return isAscending ? -1 : 1;
      if (a.contactId > b.contactId) return isAscending ? 1 : -1;
      return 0;
    });

    setOrder(isAscending ? "desc" : "asc"); // Toggle order
    setSortedContacts(sortedData); // Set sorted contacts
  };

  // Handle pagination changes
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Paginate the sorted contacts
  const paginatedContacts = sortedContacts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handle delete action
  const handleDelete = async (contactId) => {
    try {
      const response = await fetch(`${api}/delete/${contactId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }

      // Re-fetch contacts after deletion
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error.message);
    }
  };

  if (isLoading) {
    return <Typography>Loading contacts...</Typography>;
  }

  return (
    <Paper>
      <TableContainer sx={{ margin: "100px auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "contactId"}
                  direction={orderBy === "contactId" ? order : "asc"}
                  onClick={handleSort}
                >
                  Contact ID
                </TableSortLabel>
              </TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedContacts.length > 0 ? (
              paginatedContacts.map((contact) => (
                <TableRow key={contact.contactId}>
                  <TableCell>{contact.contactId}</TableCell>
                  <TableCell>{contact.firstName}</TableCell>
                  <TableCell>{contact.lastName}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phoneNumber}</TableCell>
                  <TableCell>{contact.company}</TableCell>
                  <TableCell>{contact.jobTitle}</TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No contacts available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ContactTable;
