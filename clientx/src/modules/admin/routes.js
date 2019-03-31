import React from 'react'
import Loadable from 'react-loadable';
const Loading = () => <div>Loading...</div>;

const Home = Loadable({
    loader: () => import('./components/Home'),
    loading: Loading,
});

const About = Loadable({
    loader: () => import('./components/About'),
    loading: Loading,
});


const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        layout: 'uxm',
        title: 'Home',
        priority: 0
    },

    {
        path: '/about',
        exact: true,
        component: About,
        layout: 'uxm',
        title: 'About',
        priority: 0
    },
   
]

export default routes