import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Contact from "./pages/Home";
import CreateContact from "./components/CreateContact";
import EditContact from "./components/EditContact";
import ContactTable from "./components/ContactTable";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Contact />} />
        <Route path="/create" element={<CreateContact />} />
        <Route path="/edit/:contactId" element={<EditContact />} />
        <Route path="/contacts" element={<ContactTable />} />
      </Routes>
    </div>
  );
}

export default App;
