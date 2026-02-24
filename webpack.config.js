// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyPlugin = require('copy-webpack-plugin');
// const path = require('path');
// const fs = require('fs');
// const R = require('ramda');
// const { marked } = require('marked');
// const matter = require('gray-matter');

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import TerserPlugin from 'terser-webpack-plugin';

const __dirname = fileURLToPath(import.meta.url);

export default {
    entry: [
        "./src/index.js",
    ],
    output: {
        filename: './[name].bundle.js',
        clean: true,
        globalObject: 'globalThis',
        library: 'lray138fp',  // This is the global name of your library
        libraryTarget: 'umd',    // This allows it to work in multiple environments (CJS, AMD, global)
    },
    devServer: {
        watchFiles: 'src/**/*',
        hot: true
    },
    resolve: {
        extensions: ['.js'],
        roots: [
             path.resolve(__dirname, 'src'),
             path.resolve(__dirname, 'node_modules')
        ]
   },
   optimization: {
        minimize: true, // Ensure minification is active
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              mangle: {
                reserved: [
                    'Boo',
                    'Task',
                    'Maybe', 
                        'Just', 
                        'Nothing', 
                        'Nil',
                    'Either', 
                        'Right', 
                        'Left',
                    'Result',
                        'Ok',
                        'Err',
                    'Num',
                    'Lst',
                    'Kvm',
                    'Reader',
                    'Str',
                    'Writer',
                    'Dom',
                    'querySelectorWithin'
                ], // Prevent renaming these function names
              },
              // keep_fnames: true, // Ensure that function names are preserved during minification
            },
          }),
        ],
    },
};