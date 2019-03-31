import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom'

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
                
                <div className="main">
                        {this.props.children}
                </div>
            </div>
        );
    }
}

export default Layout;
