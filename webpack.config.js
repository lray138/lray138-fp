// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyPlugin = require('copy-webpack-plugin');
// const path = require('path');
// const fs = require('fs');
// const R = require('ramda');
// const { marked } = require('marked');
// const matter = require('gray-matter');

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';
import fs from 'fs';
import * as R from 'ramda';
import { marked } from 'marked';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(import.meta.url);

export default {
    entry: [
        "./src/js/index.js",
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
        extensions: ['.js'],
        roots: [
             path.resolve(__dirname, 'src'),
             path.resolve(__dirname, 'node_modules')
        ]
   }
};