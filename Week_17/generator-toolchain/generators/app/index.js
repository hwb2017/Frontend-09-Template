var Generator = require('yeoman-generator');

module.exports = class extends Generator{
    constructor(args, opts) {
        super(args, opts);
        this.option('babel') // This method adds support for a '--babel' flag
    }
    // Every method added to the prototype is run once the generator is called
    // and usually in sequence
    initPackage() {
        const pkgJson = {
            devDependencies: {
                eslint: '^3.15.0'
            },
            dependencies: {
                react: '^16.2.0'
            }
        };
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    }
    async method1() {
        const answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname
            },
            {
                type: "confirm",
                name: "cool",
                message: "Would you like to enable the Cool feature?"
            }
        ]);
        this.log("app name", answers.name);
        this.log("cool feature", answers.cool);
    }
    writing() {
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('public/index.html'),
            { title: 'Templating with Yeoman'}
        );
    }
}