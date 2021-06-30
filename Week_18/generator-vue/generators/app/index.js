var Generator = require('yeoman-generator');

module.exports = class extends Generator{
    constructor(args, opts) {
        super(args, opts);
        this.option('babel') // This method adds support for a '--babel' flag
    }
    // Every method added to the prototype is run once the generator is called
    // and usually in sequence
    async initPackage() {
        this.answer = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname
            }
        ])
        const pkgJson = {
            "name": this.answer.name,
            "version": "1.0.0",
            "description": "",
            "main": "src/main.js",
            "scripts": {
              "build": "npx webpack",
              "test": "mocha --require @babel/register",
              "coverage": "nyc npm run test"
            },
            "author": "",
            "license": "ISC",
            "devDependencies": {
              "webpack": "^5.38.1",
              "webpack-cli": "^4.7.2",
              "vue-loader": "^16.2.0",
              "vue-template-compiler": "^2.6.14",
              "@vue/compiler-sfc": "^3.1.1",
              "vue-style-loader": "^4.1.3",
              "css-loader": "^5.2.6",
              "copy-webpack-plugin": "^9.0.0",
              "@babel/core": "^7.14.6",
              "@babel/preset-env": "^7.14.7",
              "@babel/register": "^7.14.5",
              "@istanbuljs/nyc-config-babel": "^3.0.0",
              "babel-plugin-istanbul": "^6.0.0",
              "babel-loader": "^8.2.2",
              "mocha": "^9.0.1",
              "nyc": "^15.1.0"              
            },
            "dependencies": {
              "vue": "^3.0.5"
            },            
        };
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    }

    copyFiles() {
        this.fs.copyTpl(
            this.templatePath('HelloWorld.vue'),
            this.destinationPath('src/HelloWorld.vue'),
            {}
        );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
        );        
        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('src/main.js')
        );   
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('src/index.html'),
            { title: this.answer.name }
        )  
        this.fs.copyTpl(
            this.templatePath('.gitignore'),
            this.destinationPath('.gitignore')
        )        
        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc')
        )     
        this.fs.copyTpl(
            this.templatePath('.nycrc'),
            this.destinationPath('.nycrc')
        )    
        this.fs.copyTpl(
            this.templatePath('sample-test.js'),
            this.destinationPath('test/sample-test.js')
        )                           
    }
}