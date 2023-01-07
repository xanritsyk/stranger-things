import React from "react";
import { Link } from "react-router-dom";

export default function LoggedOut() {
  return (
    <div>
      <div id="logoutImage">
        <img
          src="https://3.bp.blogspot.com/-H2DzP53a7ck/WpyA30E4MQI/AAAAAAAASDw/J3g2U_wQfNEmeTr9MkmtBDN-0_AQ7YfXACLcBGAs/s1600/tyST3preview.jpg"
          alt="Trendy Pants and Shoes"
          className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
        />
      </div>
      <Link to="/Login">
        <button id="logBackIn" className="btn btn-dark">
          Log back in?
        </button>
      </Link>
    </div>
  );
}