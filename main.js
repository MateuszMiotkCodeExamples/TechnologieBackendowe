const pug = require('pug')
const path = require('path')

const templatePath = path.join(__dirname, './views/hello.pug');

const output = pug.renderFile(templatePath, {
    greeting: 'Witaj',
    name: 'Świecie'
});

console.log(output);