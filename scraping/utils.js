import * as cheerio from 'cheerio'

import { getLeaderBoard } from './leaderboard.js'
import { getMvpList } from './mvp.js'
import { logError, logInfo, logSuccess } from './log.js'
import { writeDBFile } from '../db/index.js'

export const SCRAPINGS = {
  leaderboard: {
    url: 'https://kingsleague.pro/estadisticas/clasificacion/',
    scraper: getLeaderBoard
  },
  mvp: { url: 'https://kingsleague.pro/estadisticas/mvp/', scraper: getMvpList }
}

export const cleanText = (text) =>
  text
    .replace(/\t|\n|\s:/g, '')
    .replace(/.*:/g, ' ')
    .trim()

export async function scrape(url) {
  const rest = await fetch(url)
  const html = await rest.text()
  return cheerio.load(html)
}

export async function scrapeAndSave(name) {
  const start = performance.now()
  try {
    const { scraper, url } = SCRAPINGS[name]

    logInfo(`Scraping [${name}]`)
    const $ = await scrape(url)
    const content = await scraper($)
    logSuccess(`[${name}] scraped successfully`)
    logInfo('Writing MVP list to Database')
    await writeDBFile(name, content)
    logSuccess(`[${name}] written successfully`)
  } catch (error) {
    logError(`Error scraping [${name}]`)
    logError(error)
  } finally {
    const end = performance.now()
    const time = (end - start) / 1000
    logInfo(`[${name}] scraped in ${time} seconds`)
  }
}
