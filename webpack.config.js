const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, "/public/dist"),
        publicPath: "/public/dist",
        filename: "main.js"
    },
    target: 'node',
    mode: 'production'
};