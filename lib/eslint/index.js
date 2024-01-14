import * as fs from 'fs'
import * as path from 'path'
import chalk from 'chalk'
import spawn from 'cross-spawn'
import { askForLanguage, askForFrame, askForConfigFileExt } from './ask.js'
import { eslintrcConfig, needDeps } from './config.js'

export default async function () {
  const language = await askForLanguage()
  const frame = await askForFrame()
  const ext = await askForConfigFileExt()
  let type = language
  if (frame) {
    type += `/${frame}`
  }
  // write file .eslintrc.js
  fs.writeFileSync(
    path.join(process.cwd(), `.eslintrc.${ext}`),
    `// Documentation \n // https://github.com/tantaiMoon/eslint-config-moyi.git \n module.exports = ${JSON.stringify(eslintrcConfig(type), null, 2)}`
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
  const deps = needDeps.javascript
  if (language === 'typescript') {
    deps.concat(needDeps.typescript)
  }
  if (frame) {
    deps.concat(needDeps[frame])
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
