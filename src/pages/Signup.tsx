import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  mobile: string;
  email: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
  });

  const [errors, setErrors] = useState<{ [key in keyof FormData]?: string }>(
    {}
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: { [key in keyof FormData]?: string } = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d+$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must contain only digits";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    localStorage.setItem("formData", JSON.stringify(formData));
    console.log("Form Data Stored in Local Storage:", formData);
    navigate("/dashboard");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  

  return (
    <Box  sx={{ backgroundColor:"#1f2026",minHeight:"100vh",width:"100vw" }} display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ backgroundColor: "white", borderRadius: "1rem" }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary" }} />
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="mobile"
              label="Mobile Number"
              name="mobile"
              type="tel"
              inputProps={{ pattern: "[0-9]*" }}
              value={formData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
