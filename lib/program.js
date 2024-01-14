import * as commander from 'commander'
import Pkg from '../package.json' assert { type: 'json' }
import chalk from 'chalk'

export default async function () {
  const program = new commander.Command(Pkg.name).version(Pkg.version, '-v --version')
  program
    .command('eslint')
    .description('Auto config eslint')
    .action(async () => {
      const eslint = (await import('./eslint/index.js')).default
      eslint()
    })
  program
    .command('prettier')
    .description('Auto config prettier')
    .action(async () => {
      const prettier = (await import('./prettier/index.js')).default
      prettier()
    })
  program
    .command('husky')
    .description('Auto config husky')
    .action(async () => {
      const husky = (await import('./husky/index.js')).default
      husky()
    })
  program.on('--help', () => {
    console.log()
    console.log(`
      Run ${chalk.cyan('moyilint <command> --help')}
      for detailed useage of given command.
    `)
    console.log()
  })
  program.commands.forEach((c) => c.on('--help', () => console.log()))
  program.parse(process.argv)
}
