import React, { Component } from "react";

import { Link } from 'react-router-dom'
class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <footer>
                <div className="row">
                    <div className="col-12 col-md text-center">
                        &copy; 2019 Powered by <a href="https://www.knesk.com">Knesk</a> 
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;