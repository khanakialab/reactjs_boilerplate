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
                        <title>Sapp - Home</title>
                        <meta name="description" content="A React Js Boilerplate" />
                        <meta name="keywords" content="sappjs, knesk, reactjs" />
                    </Helmet>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                    <h1>Hi people</h1>
                                    <p>Welcome to your new Demo site.</p>
                                    <p>Now go build something great.</p>
                            </div>
                        </div>
                    </div>
                </div>
            
        );
    }
}

export default Demo;