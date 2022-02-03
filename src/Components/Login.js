import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({
        email: "Akash",
        password: "",
        checkbox: "false",
    });
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value,
        });
    };
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //call api
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: form.email,
                password: form.password,
            }),
        });
        const json = await response.json();

        if (json.success) {
            console.log("hai gormi");
            localStorage.setItem("token", json.authToken);

            navigate("/");
        }
    };

    return (
        <div className="container">
            <h1>Log in to iNoteBook......</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setField("email", e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setField("password", e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="Check me out"
                        onChange={(e) => setField("checkbox", e.target.checked)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
}

export default Login;
