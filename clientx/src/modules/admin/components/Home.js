import React, { Component } from "react";
import {Helmet} from "react-helmet";
import { Link, withRouter } from 'react-router-dom'

class Demo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        //console.log(this.state)
        return (
                <div className="compHome">
                    <Helmet>
                        <title>Home</title>
                    </Helmet>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                <h2 className="text-center">Home Page</h2>
                                <Link to={ '/about'} key="nav4">About</Link> 
                            </div>
                        </div>
                    </div>
                </div>
            
        );
    }
}

export default Demo;