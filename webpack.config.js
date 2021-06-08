const path = require('path');
const {DefinePlugin} = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: ['./src/app.js'],
    output: {
        path: path.join(__dirname, "/public"),
        filename: "main.js"
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            }
        }
        ]
      },
    target: 'node',
    mode: 'production',
    plugins: [
        new UglifyJsPlugin(),
        new DefinePlugin({"process.env.NODE_ENV": JSON.stringify("production")}),
    ]
};