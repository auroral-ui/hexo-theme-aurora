/**
 * This script is used to switch between configs
 * base on the environment you want to be in.
 *
 * @author TriDiamond <code.tridiamond@gmail.com>
 */

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const argv = require('minimist')(process.argv.slice(2))
const usableEnv = ['local', 'prod', 'publish']

if (!argv._[0]) {
  console.log(chalk.red('Missing environment variable.'))
  return
}

if (usableEnv.indexOf(argv._[0]) === -1) {
  console.log(
    chalk.red(
      `[${
        argv._[0]
      }] is an invalid environment variable, please use ${chalk.green(
        'local, prod or publish'
      )} instead.`
    )
  )
  return
}

// Fetching target config file content.
const targetConfigFile = fs.readFileSync(
  path.resolve(__dirname, `../../_config.${argv._[0]}.yml`)
)
// Writing in the new config.
fs.writeFileSync(path.resolve(__dirname, `../../_config.yml`), targetConfigFile)

console.log(chalk.green(`✔ You are now on [${argv._[0]}] environment configs.`))
