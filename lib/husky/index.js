import * as fs from 'fs'
import * as path from 'path'
import chalk from 'chalk'
import spawn from 'cross-spawn'
import { askForLanguage, askForFrame, askForPerttier, askForConfigFileExt } from './ask.js'
import { eslintrcConfig, needDeps } from './config.js'

export default async function () {
  const language = await askForLanguage()
  const frame = await askForFrame()
  const prettier = await askForPerttier()
  const ext = await askForConfigFileExt()
  let type = language
  if (frame) {
    type += `/${frame}`
  }
  // write file .eslintrc.js
  fs.writeFileSync(
    path.join(process.cwd(), `.eslintrc.${ext}`),
    `// Documentation \n // https://github.com/tantaimoon//eslint-config-moyi \n module.exports = ${JSON.stringify(eslintrcConfig(type), null, 2)}`
  )
  // write file .eslintignore
  fs.writeFileSync(
    path.join(process.cwd(), '.eslintignore'),
    `
    .idea
    .vscode
    node_modules
    `
  )
  if (prettier) {
    // write file .prettierrc.js
    fs.writeFileSync(
      path.join(process.cwd(), `.prettierrc.${ext}`),
      `// Documentation \n // https://github.com/tantaimoon//prettier-config-moyi \n module.exports = ${JSON.stringify(eslintrcConfig(type), null, 2)}`
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
  }
  const deps = needDeps.javascript
  if (language === 'typescript') {
    deps.concat(needDeps.typescript)
  }
  if (frame) {
    deps.concat(needDeps[frame])
  }
  if (prettier) {
    deps.concat(needDeps[prettier])
  }
  console.log()
  console.log(chalk.green(`使用配置： ${type}`))
  console.log(chalk.green(`安装所需依赖： ${deps.join(' + ')}`))
  console.log()
  try {
    spawn.sync('npm', ['install', ...deps, '--save-dev'], { stdio: 'inherit' })
  } catch {
    //
  }
}
