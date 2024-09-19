const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');
const R = require('ramda');
const { marked } = require('marked');

// array of pages from the './src/pages' directory
const pages = R.map(R.replace(".ejs", ""))(fs.readdirSync("./src/pages/").filter(R.endsWith(".ejs")));

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

const readMarkdown = (filePath) => {
    filePath = `./src/markdown/${filePath}`;
    try {
        return marked(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
        if (err.code === 'ENOENT') {
            return 'Markdown file not found'; // make it obvious if the path is wrong
        } else {
            return ''; // Return empty string for other errors
        }
    }
};

// Manually update time on pages to live reload HTML based on JSON updates
fs.watch("./src/json", (eventType, filename) => {
    if (filename && filename.endsWith('.json')) {
        const filePath = path.join("./src/json/", filename);
        const jsonData = readJson(filePath);
        if (jsonData) {
            try {
                const now = new Date();
                R.map(page => {
                    fs.utimesSync(`./src/pages/${page}.ejs`, now, now);
                }, pages);
            } catch (error) {
                console.error(`Error touching file (${filePath}):`, error);
            }
        }
    }
});

// Manually update time on pages to live reload HTML based on JSON updates
fs.watch("./src/markdown", (eventType, filename) => {
    console.log("\n\n\n\n\WHAT IS GOING ON ???\n\n\n\n\n\n\n\n\n");
    if (filename && filename.endsWith('.md')) {
        const filePath = path.join("./src/markdown/", filename);
        const markdownData = readMarkdown(filePath);
        if (markdownData) {
            try {
                const now = new Date();
                R.map(page => {
                    fs.utimesSync(`./src/pages/${page}.ejs`, now, now);
                }, pages);
            } catch (error) {
                console.error(`Error touching file (${filePath}):`, error);
            }
        }
    }
});

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
            test: /\.(s?css)$/,
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
                template: `./src/pages/${name}.ejs`,
                filename: `./${name}.html`,
                inject: "body",
                templateParameters: {
                    name,
                    site: readJson("site.json"),
                    page: {
                        title: "",
                        path: path.relative('./src/pages', `./src/pages/${name}.html`)
                    },
                    path: path.relative('./src/pages', `./src/pages/${name}.html`),
                    readJson,
                    readMarkdown,
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
            },
            {
                from: './src/css',
                to: './assets/css',
            },
            {
                from: 'src/js/vendor', 
                to: 'assets/js/vendor' 
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
        hot: true
    },
    resolve: {
      roots: [
         path.resolve(__dirname, 'src'),
         path.resolve(__dirname, 'node_modules')
      ]
   }
};