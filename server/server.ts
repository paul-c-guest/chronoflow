import * as Path from 'node:path'
import inventionRoutes from './routes/invention-routes'
import famousPeopleRoutes from './routes/famous-people-routes'
import worldEventRoutes from './routes/world-events-routes'

import express from 'express'

const server = express()
server.use(express.json())

server.use('/api/v1/inventions', inventionRoutes)
server.use('/api/v1/famousPeople', famousPeopleRoutes)
server.use('/api/v1/worldEvents', worldEventRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
