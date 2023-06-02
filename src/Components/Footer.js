import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <p>Copyright &copy;2023</p>
            <Link to="/REACT-TASK-TRACKER/about">About</Link>
        </footer>
    );
};

export default Footer;
