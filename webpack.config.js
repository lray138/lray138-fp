const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');
const R = require('ramda');
const { marked } = require('marked');
const matter = require('gray-matter');

// array of pages from the './src/pages' directory
// const pages = R.map(R.replace(".ejs", ""))(fs.readdirSync("./src/pages/").filter(R.endsWith(".ejs")));

// Function to recursively get all .ejs files
const getAllEjsFiles = (dir) => {
    let results = [];

    const list = fs.readdirSync(dir);

    list.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllEjsFiles(fullPath)); // Recurse into subdirectory
        } else if (file.endsWith('.ejs')) {
            results.push(fullPath); // Add .ejs file to results
        }
    });

    return results;
};

const pages = getAllEjsFiles('./src/pages/');

// Function to recursively get all .ejs files
const getAllMarkdownFiles = (dir) => {
    let results = [];

    const list = fs.readdirSync(dir);

    list.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllMarkdownFiles(fullPath)); // Recurse into subdirectory
        } else if (file.endsWith('.md')) {
            results.push(fullPath); // Add .ejs file to results
        }
    });

    return results;
};


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
    filePath = `./src/pages/${filePath}`;
    console.log('read md: ' + filePath);
    try {
        const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
        return {
            data,
            content: marked(content)
        };
    } catch (err) {
        if (err.code === 'ENOENT') {
            return 'Markdown file not found'; // make it obvious if the path is wrong
        } else {
            console.log(err);
            return ''; // Return empty string for other errors
        }
    }
};

const blog_pages = getAllMarkdownFiles('./src/pages')
    .map(x => {
        const path = x.replace('src/pages/', '').replace('.md', '.html');
        const { data, content } = readMarkdown(x.replace('src/pages/', ''));
        let template;

        if(typeof data.page_type != "undefined") {
            template = `./src/pages/_types/${data.page_type}.ejs`;
        } else {
            template = './src/pages/_types/blog-post.ejs';
        }

        return {
            template,
            filename: `./${path}`,
            data,
            inject: "body",
            templateParameters: {
                content,
                header: readJson("header.json"),
                ...data,
                site: readJson("site.json"),
                page: {
                    title: "",
                    path
                },
                path,
                markdown_path: x.replace('src/pages/', ''),
                readJson,
                readMarkdown,
                R
            }
        };
    });

// Manually update time on pages to live reload HTML based on JSON updates
fs.watch("./src/json/", (eventType, filename) => {
    if (filename && filename.endsWith('.json')) {
        const filePath = path.join("./src/json/", filename);
        const jsonData = readJson(filePath);
        if (jsonData) {
            try {
                const now = new Date();
                R.map(pathname => {
                    fs.utimesSync(pathname, now, now);
                }, pages);
            } catch (error) {
                console.error(`Error touching file (${filePath}):`, error);
            }
        }
    }
});

// Manually update time on pages to live reload HTML based on JSON updates
fs.watch("./src/pages", { recursive: true }, (eventType, filename) => {
    console.log('markdown-fire');
    if (filename && filename.endsWith('.md')) {
        const filePath = path.join("./src/pages/", filename);
        const markdownData = readMarkdown(filePath);
        if (markdownData) {
            try {
                const now = new Date();
                R.map(pathname => {
                    "HERE "  + console.log(pathname.filename);
                    fs.utimesSync('./src/pages/blog/index.ejs', now, now);
                }, blog_pages);
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
        ...blog_pages.map(x =>new HtmlWebpackPlugin(x)),
        ...pages.map(pathname => { 
            name = pathname.replace('.ejs', '');
            filename = name.replace('src/pages/', '');
            return new HtmlWebpackPlugin({
                template: pathname,
                filename: `./${filename}.html`,
                inject: "body",
                templateParameters: {
                    name,
                    site: readJson("site.json"),
                    page: {
                        title: "",
                        path: `${filename}.html`
                    },
                    path: `${filename}.html`,
                    markdown_path: "",
                    readJson,
                    readMarkdown,
                    getAllMarkdownFiles,
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