import React from 'react'
import { renderToString } from "react-dom/server"
import { hydrate, render } from 'react-dom'

hydrate(
    <div>Member</div>,
    document.getElementById('app')
);