'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Hi! I am a ' + chalk.red('html') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'It is a perfect time for the begining of some html code, isn it?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    var self = this,
        extraFiles = ['.bowerrc','.gitignore'];

    this.fs.copy(
      this.sourceRoot(),
      this.destinationPath()
    );
    
    extraFiles.forEach(function(file) {
      self.fs.copy(
        self.templatePath(file),
        self.destinationPath(file)
      );
    }); 
 
  },

  install: function () {
    this.installDependencies();
    this.spawnCommand('git', ['init']);
  }
});
