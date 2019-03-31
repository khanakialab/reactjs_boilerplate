import React, { Component } from "react";

import { Link } from 'react-router-dom'
class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <div className="my-0 mr-md-auto font-weight-normal"><img src={require("../assets/images/logo.png")} /></div>
                <nav className="my-2 my-md-0 mr-md-3">
                    <Link to={ '/'} className="p-2 text-dark" >Home</Link>
                    <Link to={ '/about'} className="p-2 text-dark" >About</Link>
                </nav>
            </div>
        );
    }
}

export default Header;