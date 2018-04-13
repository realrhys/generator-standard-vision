import path from 'path'
import test from 'ava'
import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import pify from 'pify'
import fs from 'graceful-fs'

let generator

test.beforeEach(async () => {
  await pify(helpers.testDirectory)(path.join(__dirname, 'temp'))
  generator = helpers.createGenerator('standard-vision:app', ['../app'], null, {skipInstall: true})
})

test.serial('generates expected files', async () => {
  helpers.mockPrompt(generator, {
    moduleName: 'Basic'
  })

  await pify(generator.run.bind(generator))()

  assert.file([
    'VISION.md'
  ])
})

test.serial('generates default file', async () => {
  helpers.mockPrompt(generator, {
    moduleName: 'Basic'
  })

  await pify(generator.run.bind(generator))()

  assert.fileContent('VISION.md', fs.readFileSync('../examples/basic-VISION.md').toString())
})
