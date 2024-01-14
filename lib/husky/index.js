import chalk from 'chalk'
import spawn from 'cross-spawn'
import * as fs from 'fs'
import * as path from 'path'

export default async function () {
  const deps = [
    'mrm',
    'husky',
    'prettier',
    'lint-staged',
    '@commitlint/cli',
    '@commitlint/config-conventional'
  ]
  console.log(
    '>----🚀 index.js ~ line: 16 ~ var: da -----> :',
    spawn
      .sync('git', ['clone', 'https://github.com/tantaiMoon/prettier-config-moyi.git'], {
        stdio: 'inherit'
      })
      .toString()
  )
  // write file .prettierrc.js
  fs.writeFileSync(
    path.join(process.cwd(), '.prettierrc.js'),
    `// Documentation \n // https://github.com/tantaiMoon/prettier-config-moyi.git \n module.exports = ${JSON.stringify(
      {
        extends: path.join('prettier-config-moyi', '')
      },
      null,
      2
    )}`
  )
  // write file .prettierignore
  fs.writeFileSync(
    path.join(process.cwd(), '.prettierignore'),
    `
    .idea
    .vscode
    node_modules
    *.lock
    *-lock.yaml
    `
  )
  console.log()
  console.log(chalk.green('使用配置： husky '))
  console.log(chalk.green(`安装所需依赖： ${deps.join(' + ')}`))
  console.log()
  try {
    spawn.sync('npm', ['install', ...deps, '--save-dev'], { stdio: 'inherit' })
    // pnpx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
    // spawn.sync('npx', ['husky', 'install'], { stdio: 'inherit' })
    spawn.sync('npx', ['mrm', 'lint-staged'], { stdio: 'inherit' })
    spawn.sync(
      'npx',
      ['husky', 'add', '.husky/commit-msg', 'npx --no-install commitlint --edit "$1"'],
      { stdio: 'inherit' }
    )
    console.log(
      chalk.red(`
      在 package.json 中加入 lint-staged
      
      "lint-staged": {
        "*.{js,jsx,ts,tsx}": [
          "eslint --cache --fix",
          "prettier --write",
          "git add"
        ],
        ".{less,scss,css,md}": "prettier --write"
      }
    `)
    )
  } catch {
    //
  }
}
