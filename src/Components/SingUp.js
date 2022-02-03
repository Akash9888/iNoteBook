import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SingUp() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
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
        console.log(form);

        if (form.password !== form.password2) {
            alert(
                "Both password are not same! Please enter same password in both field"
            );
        } else {
            const response = await fetch(
                "http://localhost:5000/api/auth/createuser",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        password: form.password,
                    }),
                }
            );
            const json = await response.json();
            console.log(json);

            if (!json.success) {
                alert("Please enter valid email and password");
            } else {
                alert("Account created successfully");
                navigate("/login");
            }
        }
    };
    return (
        <div className="container">
            <h1>SingUp to iNoteBook......</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        required
                        minLength={3}
                        onChange={(e) => setField("name", e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setField("email", e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        minLength={6}
                        required
                        onChange={(e) => setField("password", e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Label>Re-enter password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password "
                        minLength={6}
                        required
                        onChange={(e) => setField("password2", e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Signup
                </Button>
            </Form>
        </div>
    );
}

export default SingUp;
