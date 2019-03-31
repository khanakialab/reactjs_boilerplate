import React, { Component } from "react";
import {Helmet} from "react-helmet";

class Demo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        //console.log(this.state)
        return (
                <div className="compHome">
                    <Helmet>
                        <title>About</title>
                    </Helmet>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                <h2 className="text-center">About Page</h2>
                            </div>
                        </div>
                    </div>
                </div>
            
        );
    }
}

export default Demo;