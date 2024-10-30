const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

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

const readJson = (filePath) => {
    filePath = `./src/data/${filePath}`;
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

module.exports = {
    getAllMarkdownFiles,
    readMarkdown,
    getAllEjsFiles,
    readJson
};