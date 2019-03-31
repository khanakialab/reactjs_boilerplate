import _ from 'lodash'
import { observable, action } from 'mobx';
export default class Menu {
    constructor(id, args = {}) {
        Object.assign({}, {
            // menuName: args.menuName
        }, this)

        this.id = id

        // Maken object observaly otherwise it will not trigger UI on Update check mobx docs
        Sapp.Store.globalStore.menu = Object.assign({}, Sapp.Store.globalStore.menu, {[this.id] : []} )
        this.menu = Sapp.Store.globalStore.menu[this.id]
        
    }
    
    getMenuList() {
        return this.menu.slice()
    }

    checkIfMenuExists(name) {
        const menu = _.find(this.getMenuList(), {name: name})
        return menu ? true : false;
    }

    add(args={}) {
        args = Object.assign({}, {
            name: null,
            parent: null,
            pageTitle: null,
            menuTitle: null,
            // capability: null,
            menuSlug: null,
            iconUrl: null,
            iconClass: null,
            priority: 10,
            description: null
        }, args)
        
        // console.log(this.getMenuList().length)
        const isExists = this.checkIfMenuExists(args.name)
        if(isExists) return false
        // console.log(this.id)
        this.menu.push(args)
    }

    remove(name) {
        var newMenu = _.remove(Sapp.Store.globalStore.menu[this.id], function(e) {
            return e.name == name;
        });
        // console.log(newMenu)
    }

    async buildFromRoutes() {
        var menus = []
        // Sapp.Store.globalStore.routes.map(async (route,i) => {
        //     if(!route.showInMenu) return null
        //     let hashpath = Sapp.Core.Util.hashCode(route.path)
        //     let menu = {
        //         name: 'id_'+hashpath,
        //         pageTitle: route.title,
        //         menuTitle: route.title,
        //         capability: null,
        //         menuSlug: route.path,
        //         iconUrl: null,
        //         priority: 10,
        //     }

        //     const args = await Sapp.Core.Filter.apply('beforeMenuBuildFromRoutePush', {
        //         menu: menu,
        //         route: route
        //     })

        //     // console.log(menu)
        //     menus.push(menu)
        // })
        
        for (let i in Sapp.Store.globalStore.routes.toJS()){
            const route = Sapp.Store.globalStore.routes[i]
            // console.log(route)
            if(!route.showInMenu) continue
            let hashpath = Sapp.Util.hashCode(route.path)
            let menu = {
                name: route.name || 'id_'+hashpath,
                pageTitle: route.title,
                menuTitle: route.title,
                capability: null,
                menuSlug: route.path,
                iconUrl: route.iconUrl,
                iconClass: route.iconClass,
                priority: 10,
                parent: route.parent || null,
                description: route.description || null
            }

            const args = await Sapp.Hook.Filter.apply('beforeMenuBuildFromRoutePush', {
                menu: {...menu},
                route: {...route}
            })

            menus.push(args.menu)
        }
        // console.log(menus)
        this.addMultiple(menus)
    }

    addMultiple(menus=[]) {
        let menuCurrent = this.menu
        let menuNew = [...menuCurrent.slice(), ...menus]
        menuNew = _.sortBy(menuNew, ['priority']);
        menuNew = _.uniqBy(menuNew, 'name');

        // console.log(menuNew)
        // Sapp.Store.globalStore.menu = Object.assign({}, Sapp.Store.globalStore.menu, { [this.id]: menuNew });
        Sapp.Store.globalStore.menu[this.id] = menuNew
        // console.log(this.menu)
    }

    buildHierarchy(arry) {

        var roots = [], children = {};
    
        // find the top level nodes and hash the children based on parent
        for (var i = 0, len = arry.length; i < len; ++i) {
            var item = arry[i],
                p = item.parent,
                target = !p ? roots : (children[p] || (children[p] = []));
    
            // target.push({ value: item, title: item.menuTitle });
            target.push(Object.assign({}, item));
        }
    
        // function to recursively build the tree
        var findChildren = function(parent) {
            if (children[parent.name]) {
                parent.children = children[parent.name];
                for (var i = 0, len = parent.children.length; i < len; ++i) {
                    findChildren(parent.children[i]);
                }
            }
        };
    
        // enumerate through to handle the case where there are multiple roots
        for (var i = 0, len = roots.length; i < len; ++i) {
            findChildren(roots[i]);
        }
    
        return roots;
    }

    generateTree() {
        const list = Sapp.Store.globalStore.menu[this.id].slice()
        const tree = this.buildHierarchy(list)
        // console.log(tree)
        return tree
    }
}