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
    }, {
      name: 'description',
      message: 'What is the description of this module?',
      store: true,
      validate: x => x.length > 0 ? true : 'You have to provide a module description'
    }, {
      name: 'banner',
      message: 'Do have a banner image?',
      type: 'confirm',
      default: false
    }, {
      name: 'bannerPath',
      message: 'Where is the banner image? Ex: \'img/banner.png\'',
      type: 'input',
      when: (answers) => answers.banner
    }, {
      name: 'badge',
      message: 'Do you want a standard-readme compliant badge?',
      type: 'confirm',
      default: true
    }, {
      name: 'badges',
      message: 'Do you want a TODO dropped where more badges should be?',
      type: 'confirm',
      default: false
    }, {
      name: 'longDescription',
      message: 'Do you want a TODO dropped where your long description should be?',
      type: 'confirm',
      default: true
    }, {
      name: 'security',
      message: 'Do you need a prioritized security section?',
      type: 'confirm',
      default: false
    }, {
      name: 'background',
      message: 'Do you need a background section?',
      type: 'confirm',
      default: false
    }, {
      name: 'API',
      message: 'Do you need an API section?',
      type: 'confirm',
      default: false
    }, {
      name: 'maintainers',
      message: 'What is the GitHub handle of the main maintainer?',
      type: 'input',
      validate: function (val) {
        return val.length > 0 ? true : 'You must name a maintainer.'
      },
      when: x => !x.mit
    }, {
      name: 'contributeFile',
      message: 'Do you have a CONTRIBUTE.md file?',
      type: 'confirm',
      default: false
    }, {
      name: 'prs',
      message: 'Are PRs accepted?',
      type: 'confirm',
      default: true
    }, {
      name: 'mit',
      message: 'Is an MIT license OK?',
      type: 'confirm',
      default: true
    }, {
      name: 'license',
      message: 'What is your license?',
      type: 'input',
      validate: function (val) {
        return val.length > 0 ? true : 'You have to provide a license'
      },
      when: x => !x.mit
    }, {
      name: 'licensee',
      message: 'Who is the License holder (probably your name)?',
      type: 'input',
      validate: x => x.length !== 0 ? true : 'You must attribute the license to someone.'
    }, {
      name: 'year',
      message: 'Use the current year?',
      type: 'confirm',
      default: true
    }, {
      name: 'diffYear',
      message: 'What years would you like to specify?',
      type: 'input',
      validate: function (val) {
        return val
      },
      when: x => !x.year
    }], props => {
      const tpl = {
        API: props.API,
        background: props.background,
        badge: props.badge,
        badges: props.badges,
        banner: props.banner,
        bannerPath: props.bannerPath,
        contributeFile: props.contributeFile,
        description: props.description,
        license: props.license,
        licensee: props.licensee,
        longDescription: props.longDescription,
        maintainers: props.maintainers,
        mit: props.mit,
        moduleName: props.moduleName,
        prs: props.prs,
        security: props.security,
        year: props.year,
        diffYear: props.diffYear
      }

      self.fs.copyTpl([
        `${self.templatePath()}/README.md`
      ], self.destinationPath(), tpl)

      cb()
    })
  },
  git () {},
  install () {}
})
