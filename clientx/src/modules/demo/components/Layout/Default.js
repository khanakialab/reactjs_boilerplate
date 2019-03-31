import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom'
import Helmet from 'react-helmet'


import Header from '../Header'
import Footer from '../Footer'
class Layout extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        containerClass: null,
        sidebar: function(){}
    }

    render() {  
        return (
            <div className={"layout " + this.props.containerClass}>
                <Helmet>
                    <link rel="icon" type="image/png" href={require("../../assets/images/favicon.ico")} sizes="16x16" />
                </Helmet>
                <Header />
                <div className="main">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}

export default Layout;
