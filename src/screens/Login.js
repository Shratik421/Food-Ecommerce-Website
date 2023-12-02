import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    );

    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    console.log(json);

    if (!json.success) {
      alert("Enter valid Credentials");
    }

    if (json.success) {
      localStorage.setItem("authToken", credentials.email);
      localStorage.setItem("userEmail", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div
        className="container mt-5 pt-5"
        style={{ background: "light-green" }}
      >
        <div>
          <h2
            style={{
              background: "grey",
              border: "1px solid yellow ",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            Login Page
          </h2>
        </div>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button type="submit" className=" m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-info">
            Create a User ?
          </Link>
        </form>
      </div>
    </>
  );
}
