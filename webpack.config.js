const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const templates = [
    "index", 
    "home"
];

module.exports = {
    entry: [
        "./src/js/theme.js",
        "./src/scss/theme.scss"
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
      }
  ,
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
                }, {
                    // compiles Sass to CSS
                    loader: 'sass-loader'
                }
            ]
            }
        ]
    },
    plugins: [
        ...templates.map(name => {
            return new HtmlWebpackPlugin({
                template: `./src/html/${name}.ejs`,
                filename: `./${name}.html`,
                inject: "body"
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