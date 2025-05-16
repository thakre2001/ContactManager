import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AddContact from "./Components/Contacts/AddContact/AddContact";
import EditContact from "./Components/Contacts/EditContact/EditContact";
import ViewContact from "./Components/Contacts/ViewContact/ViewContact";
import Navbar from "./Components/NavBar/Navbar";
import ContactList from "./Components/Contacts/ContactList/ContactList";

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to={'/Contacts/list'}/>}/>
        <Route path="/Contacts/list" element={<ContactList/>}/>
        <Route path="/Contacts/add" element={<AddContact/>}/>
        <Route path="/Contacts/edit/:contactId" element={<EditContact/>}/>
        <Route path="/Contacts/view/:contactId" element={<ViewContact/>}/>
      </Routes>
    </>
  )
}

export default App;
