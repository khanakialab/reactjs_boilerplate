const path = require('path');
var express = require('express');
const serialize =  require("serialize-javascript")
const ReactRouterDom = require("react-router-dom")
const {Helmet} = require("react-helmet");


process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
const config = require('config');

const envConfig = require('../config/env')
// const modules = [
//     'admin',
//     // 'member'
// ]

let mainFn = async (module, path) => {
    const ModuleDefault_ = require(`../../public/dist/${module}/main.cjs.js`)
    let ModuleDefault = new ModuleDefault_()
    await ModuleDefault.init()
    
    // const routes = Sapp.UxmMarket.RawRoutes
    // const routes = MobxToJson(Sapp.Store.globalStore.routes)
    const routes = Sapp.Route.mobxToArray()
    const {matchPath} = ReactRouterDom

    // console.log(Sapp.Route.mobxToArray())
    const activeRoute = routes.find((route) => matchPath(path, route)) || {}
    // console.log(JSON.stringify(Sapp.Store.globalStore.routes.toJS()))

    const data = activeRoute.fetchInitialData
    ? await activeRoute.fetchInitialData(path)
    : null

    const context = {data}
    let markup = await ModuleDefault.serverMarkup(path, context)
    const helmet = Helmet.renderStatic();
    // console.log(helmet.meta.toString())
    return {
        initialData: data,
        markup: markup,
        route: activeRoute,
        helmet: helmet
    }
}


for (let module of envConfig.modules||[]) {
    // console.log(plugin)
    try {	    
        const ourConfigDir = path.join(__dirname, '../config/modules/'+ module)
        const baseConfig = config.util.loadFileConfigs(ourConfigDir)
        // console.log(baseConfig)
        const www = require('@knesk/www')({...baseConfig.server.www, templateEngine: 'twig'})

        let eApp = www.app
        eApp.use(express.static("public"))

        let scripts = [
            `/dist/${module}/vendor.js`,
            `/dist/${module}/main.js`,
            `/dist/${module}/runtime~main.js`
        ]

        let cssHrefs = [
            `/dist/${module}/vendor.css`,
            `/dist/${module}/main.css`,
        ]

        let context = {
            scripts: [...baseConfig.server.scripts, ...scripts],
            cssHrefs: [...baseConfig.server.cssHrefs, ...cssHrefs],
            headStartCustomCode: baseConfig.server.headStartCustomCode,
            bodyClass: baseConfig.server.bodyClass||'',
            markup: '',
            data: serialize({}),
            htmlAttributes : '',
            bodyAttributes : '',
            title : '',
            meta : '',
            link : '',
        }

        if(baseConfig.shared.ssr) {
            eApp.get("*", (req, res, next) => {
                mainFn(module, req.path).then((data) => {
                    // console.log(data.route)
                    // const routeTitle = util.objValue(data.route, ['title'])
                    // console.log(Boolean(routeTitle))
                    context = Object.assign({}, context, {
                        markup: data.markup,
                        data: serialize(data.initialData),
                        htmlAttributes : data.helmet.htmlAttributes.toString(),
                        bodyAttributes : data.helmet.bodyAttributes.toString(),
                        title : data.helmet.title.toString(),
                        meta : data.helmet.meta.toString(),
                        link : data.helmet.link.toString()
                    })
                    res.render('server', context);
                }).catch(next)
            })
        } else {
            eApp.use('/', (req,res,next) => {
                res.render('server', context);
            });
        }
    
        www.init()
    } catch (error) {
        console.log(error)
    }
}
