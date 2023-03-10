/* eslint-disable indent */
import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import leaderboard from '../db/leaderboard.json'
import presidents from '../db/presidents.json'
import mvp from '../db/mvp.json'
import coaches from '../db/coaches.json'
import topScorers from '../db/top_scorers.json'
import topAssists from '../db/top_assists.json'
import teams from '../db/teams.json'
const app = new Hono()

app.get('/', (ctx) => {
  return ctx.json([
    {
      endpoint: '/leaderboard',
      description: 'Returns the leaderboard'
    },
    {
      endpoint: '/teams',
      description: 'Returns the Kings League teams'
    },
    {
      endpoint: '/presidents',
      description: 'Returns the Kings League presidents'
    }
  ])
})

app.get('/leaderboard\\/?', (ctx) => {
  return ctx.json(leaderboard)
})
app.get('/presidents\\/?', (ctx) => {
  return ctx.json(presidents)
})
app.get('/top-scorers', (ctx) => ctx.json(topScorers))
app.get('/top-assists', (ctx) => ctx.json(topAssists))

app.get('/presidents/:id', (ctx) => {
  const id = ctx.req.param('id')
  const foundPresident = presidents.find((president) => president.id === id)
  return foundPresident
    ? ctx.json(foundPresident)
    : ctx.json(
        {
          messsage: 'President not found'
        },
        404
      )
})
app.get('/teams\\/?', (ctx) => {
  return ctx.json(teams)
})

app.get('/teams/:id', (ctx) => {
  const id = ctx.req.param('id')
  const foundTeam = teams.find((team) => team.id === id)

  return foundTeam
    ? ctx.json(foundTeam)
    : ctx.json({ message: 'Team not found' }, 404)
})
app.get('/mvp', (ctx) => ctx.json(mvp))

app.get('/coaches', (ctx) => ctx.json(coaches))

app.get('/static/*', serveStatic({ root: './' }))

app.notFound((ctx) => {
  const { pathname } = new URL(ctx.req.url)

  if (ctx.req.url.at(-1) === '/') {
    return ctx.redirect(pathname.slice(0, -1))
  }
  return ctx.json({ message: 'Not found' }, 404)
})

export default app
