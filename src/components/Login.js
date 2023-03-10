import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/Index";
import { Link } from "react-router-dom";

export default function LoggedIn() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChange = (event) => {
    const changed = event.target.id;
    if (changed === "form2Example1") {
      setUsername(event.target.value);
    } else if (changed === "form2Example2") {
      setPassword(event.target.value);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = await loginUser(username, password);
    localStorage.setItem("token", token);

    navigate("/Profile");
  };

  return (
    <section className=" text-center text-lg-start">
      <div className="card mb-3">
        <div className="row g-0 d-flex align-items-center">
          <div className="col-lg-4 d-none d-lg-flex">
            <img
              src="https://i.pinimg.com/564x/a0/6e/31/a06e311b344da74280685897e34c28f2.jpg"
              alt="Trendy Pants and Shoes"
              className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
            />
          </div>
          <div className="col-lg-8">
            <div className="card-body py-5 px-md-5">
              <form id="loginPage" onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <h2>Welcome! Please Log In</h2>

                  <input
                    id="form2Example1"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={handleOnChange}
                    minLength="6"
                  ></input>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form2Example2"
                    className="form-control"
                    placeholder="Password"
                    minLength="6"
                    onChange={handleOnChange}
                  ></input>
                </div>
                <button id="loginButton" className="btn btn-dark" type="submit">
                  Login
                </button>

                <Link to="/Posts">
                  <button id="viewAsGuest" className="btn btn-dark">
                    View As Guest
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}