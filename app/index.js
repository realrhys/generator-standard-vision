'use strict'
const yeoman = require('yeoman-generator')
const _s = require('underscore.string')

module.exports = yeoman.Base.extend({
  init () {
    const cb = this.async()
    const self = this

    this.prompt([{
      name: 'moduleName',
      message: 'What is the name of your module?',
      default: this.appname.replace(/\s/g, '-'),
      filter: x => _s.slugify(x)
    }], props => {
      const tpl = {
        moduleName: props.moduleName
      }

      self.fs.copyTpl([
        `${self.templatePath()}/VISION.md`
      ], self.destinationPath(), tpl)

      cb()
    })
  },
  git () {},
  install () {}
})
