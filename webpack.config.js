const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: {
        entry: './src/app.js',
    },
    output: {
        path: path.join(__dirname, "/public"),
        publicPath: "/public",
        filename: "main.js"
    },
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
    },
    externals: [nodeExternals()],
    target: 'node',
    mode: 'production'
};