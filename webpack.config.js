var path = require("path");
var fs = require("fs");
var package = JSON.parse(fs.readFileSync("package.json"));
var webpack = require("webpack");

module.exports = {

    entry: {
        "mw-sdk": "./src/main.js"
    },

    output: {
        path: path.join(__dirname, "./dist/"),
        publicPath: "./dist/",
        filename: '[name].js'
    },

    module: {
        //preLoaders: [{
        //    test: /\.js$/,
        //    exclude: /(node_modules|bower_components|libs)/,
        //    loader: 'jshint'
        //}],
        loaders:[
            { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel?presets[]=react,presets[]=es2015' },
            { test: /\.jsx?$/, loader: 'string-replace', query: {
              search: '[[VERSION]]',
              replace: package.version
            }},
            //{ test: /\.(jpg|png|gif)$/, loader: "url?limit=8192"},
            { test: /\.css$/, loader: 'style!css?:global' },
            { test: /\.less/, loader: 'style!css!less' },
            { test: /\.s[ca]ss$/, loader: 'style!css?modules!autoprefixer?browsers=last 10 versions!' }
            //{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000&minetype=application/font-woff" },
            //{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file" }
        ]
    },
    resolve: {
        root: [path.join(__dirname,  "./bower_components")]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
    ]
    //jshint : {
    //    reporter : require('jshint-loader-reporter')()
    //}
};
