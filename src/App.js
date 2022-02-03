import React from "react";
import About from "./Components/About";
import Navbigation from "./Components/Navbigation";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./Components/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import AddNote from "./Components/AddNote";
import NoteState from "./context/Notes/NoteState";
import Login from "./Components/Login";
import SingUp from "./Components/SingUp";

export default function App() {
    return (
        <div>
            <NoteState>
                <BrowserRouter>
                    <Navbigation />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/addnote" element={<AddNote />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SingUp />} />
                    </Routes>
                </BrowserRouter>
            </NoteState>
        </div>
    );
}
