import pc from 'picocolors'

const logSymbols = {
  info: pc.cyan('ℹ'),
  success: pc.green('✔'),
  warning: pc.yellow('⚠'),
  error: pc.red('✖')
}

export const logInfo = (...args) =>
  console.log(`${logSymbols.info} ${pc.cyan(...args)}`)
export const logSuccess = (...args) =>
  console.log(`${logSymbols.success} ${pc.green(...args)}`)
export const logError = (...args) =>
  console.log(`${logSymbols.error} ${pc.red(...args)}`)
export const logWarning = (...args) =>
  console.log(`${logSymbols.warning} ${pc.yellow(...args)}`)
