# Galatia

This project is a real-world demonstration of web tools such as React, Redux, Node.js and a couple more.

Flight search results come from [Google QPX Express Api](https://developers.google.com/qpx-express/). 50 requests are free daily for a valid Google api key.

## [Visit Demo](http://galatia.reactjs.world)

## Getting Started

- `git clone https://github.com/efekaptan/galatia.git`
- `npm install`
- `npm run dev`

## Deploy on Heroku

Npm scripts are ready to deploy on Heroku. `npm run postinstall` script called automatically by Heroku CI pipeline. To deploy on Heroku just execute:

- `git push heroku`

## Overview of libraries

 - Restful backend api implemented using Node.js Express framework. This backend is a proxy layer between UI and QPX Express Api. Which is useful to hide sensitive information from client side. (ex : Google Api Keys)

 - `lowdb` as super simple data access

 - `create-react-app` as a starter boilerplate for client side React application

 - Redux + Redux Thunk middleware + Normalizr

 - `reselect` as memoized selector