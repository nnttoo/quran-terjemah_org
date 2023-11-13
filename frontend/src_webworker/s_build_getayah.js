#!/bin/env node


/**
 * Ini buat compile webadmin
 */
let webpack = require('webpack');
let path = require("path")
let fs = require("fs")


// install nodejs 
// npm install webpack --save 
// npm install babel-loader --save
// "@babel/core": "^7.23.2",
// "@babel/plugin-proposal-class-properties": "^7.18.6",
// "@babel/plugin-proposal-object-rest-spread": "^7.20.7",
// "@babel/plugin-transform-runtime": "^7.23.2",
// "@babel/preset-env": "^7.23.2",
// "@babel/preset-react": "^7.22.15",
// "@babel/preset-typescript": "^7.23.2",


//const livereload = require('./s_livereload');

function getExternal() {
    let jsn = fs.readFileSync("./package.json").toString();
    let json = JSON.parse(jsn);
    let dependencies = json["dependencies"];

    let exluder = []
    for (let x of Object.keys(dependencies)) {
        exluder.push({
            [x]: "commonjs " + x
        })
    }

    return exluder;

}

/**
 * 
 * @param {string} name 
 * @returns 
 */
function getArgumentParam(name) {
    let argstring = process.argv.join(" ");
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[ #\\?&]' + name + '=([^ &#]*)');
    var results = regex.exec("#" + argstring);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

let runmode = getArgumentParam("runmode");
let compileMode = "production";

let watch = runmode == "watch";
if (watch) {
    console.log("watch mode");

    //livereload.listen();
    compileMode = "development"
}
class CustomPlugin {
    apply(compiler) {
        compiler.hooks.watchRun.tap('CustomPlugin', () => {

            console.log('Webpack sedang mengompile...');
        });
    }
}

let w = webpack({
    watch: watch,
    plugins: [
        new CustomPlugin(),
    ],
    module: {

        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                "@babel/preset-typescript",
                                "@babel/preset-react",
                                ['@babel/preset-env', {
                                    "modules": false,
                                    "spec": true,
                                    "forceAllTransforms": false,
                                    "useBuiltIns": "entry",
                                    "corejs": 3,
                                    "targets": {
                                        "chrome": "35", // webview kitkat
                                    }

                                }],
                            ],
                            plugins: ['@babel/plugin-proposal-class-properties']
                        }
                    },

                ]
            },

            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: { loader: 'html-loader' }
            },

            // {
            //     exclude: /node_modules/,
            //     test: /\.(ts|tsx)$/,
            //     loader: "ts-loader"
            // }
        ]
    },
    entry: "./src/getayah.ts",
    output: {
        path: path.join(__dirname,"../public/myfolder/"),
        publicPath: '',
        filename: 'worker_s_getayah.js',
        library: 'mainview', 
    },
    devServer: {
        contentBase: './distgetuk'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    target: ["web", "es5"],
    mode: compileMode,
    externalsPresets: { node: true },
    externals: [
        /**
         * Karena library diinclude secara extenal
         * kita membuituhkan extenal build,
         * webamin_external.ts         * 
         */

        { 'react': 'React' }, 
        { 'react-dom': 'ReactDOM' },
        // { "firebase": "firebase" },  
        { 'algoliasearch': 'algoliasearch' },
        {"firebase/auth" : "firebaseAuth"},
        { "firebase/firestore" : "firebaseFirestore"},
        { "firebase/app" : "firebaseApp"},
        {"firebase/storage" : "firebaseStorage"}


    ],  



}, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.log(err);
        console.log(
            stats.toString({
                chunks: false, // Makes the build much quieter
                colors: true, // Shows colors in the console
            })
        );
    }

    console.log("compile done");
    if (watch) {
        //livereload.changed("/webadmin/index.html");
    }
});

