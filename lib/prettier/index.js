import * as fs from 'fs'
import * as path from 'path'
import chalk from 'chalk'
import spawn from 'cross-spawn'
import { askForFrame, askForPerttier, askForConfigFileExt } from './ask.js'
import { eslintrcConfig, needDeps } from './config.js'

export default async function () {
  const frame = await askForFrame()
  const prettier = await askForPerttier()
  const ext = await askForConfigFileExt()
  let type = ''
  if (frame) {
    type += `/${frame}`
  }
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
  const deps = needDeps.javascript
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
