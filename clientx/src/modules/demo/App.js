import React, { Component } from 'react'
import { Route, Link, Switch, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import _ from 'lodash'

import Layout from './components/Layout/Default'
import NoMatch from './components/NoMatch'

@inject('globalStore')
@observer
class App extends Component {
    constructor(props) {
        super(props)
    }

    RenderLayout(props) {
        let LayoutComponent
        // console.log(props.layout)
        switch (props.layout) {
            default:
                LayoutComponent = Layout
                break;
        }
        const {component: Component} = props
        return (
            <LayoutComponent {...props.layoutProps}>
                <Component {...props.routeProps} />
            </LayoutComponent>
        )
    }


    render() {
        let {routes} = this.props.globalStore;
        routes = _.sortBy(routes, ['priority']);
        return (
            
            <Switch>
                {routes.map((route,i) => {
                    const {path, exact} = route
                    return (
                        <Route key={path} path={path} exact={exact} render={(props) => (
                            <this.RenderLayout {...route} routeProps={props}/>
                        )} />
                    )
                })}

                <Route render={(props) => <NoMatch {...props} /> } />
            </Switch>
            
        )
    }
}

export default withRouter(App);
