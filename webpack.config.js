const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');
const R = require('ramda');

// array of pages from the './src/pages' directory
const pages = R.map(R.replace(".ejs", ""))(fs.readdirSync("./src/templates/").filter(R.endsWith(".ejs")));

// read JSON data 
const readJson = (filePath) => {
    filePath = `./src/json/${filePath}`;
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
        if (err.code === 'ENOENT') {
            return 'JSON not found'; // make it obvious if the path is wrong
        } else {
            return ''; // Return empty string for other errors
        }
    }
};

if (process.env.NODE_ENV === 'development') {
    // manually update time on pages to live reload HTML based on JSON updates
    fs.watch("./src/json", (eventType, filename) => {
        if (filename && filename.endsWith('.json')) {
            const filePath = path.join("./src/json/", filename);
            const jsonData = readJson(filePath);
            if (jsonData) {
                try {
                    const now = new Date();
                    R.map(page => {
                        fs.utimesSync(`./src/templates/${page}.ejs`, now, now);
                    }, pages);
                } catch (error) {
                    console.error(`Error touching file (${filePath}):`, error);
                }
            }
        }
    });
}

// "academic-ish" example of appending classes to a base class in HTML
function addNameToClassList(base_class_list) {
    return function(add_class_list) {
        let class_list = [base_class_list];
        class_list.push(add_class_list);
        return class_list.join(" ");
    };
}

module.exports = {
    entry: [
        "./src/js/scripts.js",
        "./src/scss/styles.scss"
    ],
    module: {
        rules: [
            { test: /\.ejs$/i, use: [ { loader: 'ejs-easy-loader' } ] },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                // generator: {
                //   emit: false,
                // }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]',
                },
            },
            {
            test: /\.(scss)$/,
            use: [
                {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        // translates CSS into CommonJS modules
                        loader: 'css-loader'
                    }, {
                        // Run postcss actions
                        loader: 'postcss-loader',
                        options: {
                            // `postcssOptions` is needed for postcss 8.x;
                            // if you use postcss 7.x skip the key
                            postcssOptions: {
                                // postcss plugins, can be exported to postcss.config.js
                                plugins: function () {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        }
                    }, 
                    {
                        // compiles Sass to CSS
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        ...pages.map(name => {
            return new HtmlWebpackPlugin({
                template: `./src/templates/${name}.ejs`,
                filename: `./${name}.html`,
                inject: "body",
                templateParameters: {
                    readJson,
                    addNameToClassList,
                    R
                }
            });
        }),
        new MiniCssExtractPlugin({
            filename: "./assets/css/[name].bundle.css"
        }),
        new CopyPlugin({
          patterns: [
            {
              from: './src/img',
              to: './assets/img',
            }
          ],
        }),
    ],
    output: {
        filename: './assets/js/[name].bundle.js',
        clean: true
    },
    devServer: {
        watchFiles: 'src/**/*',
    },
    resolve: {
      roots: [
         path.resolve(__dirname, 'src'),
         path.resolve(__dirname, 'node_modules')
      ]
   }
};