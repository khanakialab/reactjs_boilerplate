import _ from 'lodash'

export default class Route {
	constructor(args = {}) {

    }

    sayHello() {
        //console.log('hello')
    }

    mobxToArray() {
        let routes = Sapp.Store.globalStore.routes
        let routesNew = []
        routes.map((route, i) => {
            // console.log(route)

            routesNew.push({...route})
        })

        return routesNew
    }
    
    addMultiple(routes=[]) {
        let routesCurrent = Sapp.Store.globalStore.routes
        let routesNew = [...routesCurrent.slice(), ...routes]
        routesNew = _.sortBy(routesNew, ['priority']);
        Sapp.Store.globalStore.routes = routesNew
    }

    add(args={}) {
        args = Object.assign({}, {
            path: null,
            exact: true,
            component: null,
            layout: 'admin',
            showInMenu: false,
            title: null,
            priority: 10,
            iconClass: null,
            iconUrl: null
        }, args)

        if(!args.path || !args.component) return null

        Sapp.Store.globalStore.routes.push(args)
    }

    remove(path) {
        _.remove(Sapp.Store.globalStore.routes, function(e) {
            return e.path == path;
        });
    }
}