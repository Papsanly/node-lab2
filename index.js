import http from 'http'
import routes from './routes.js'

function handler(req, res) {
  const { method, url } = req
  console.log(`Received ${method} request for ${url}`)

  const handler = routes[url] ? routes[url][method] : null

  if (handler) {
    handler(req, res)
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 Not Found')
  }
}

const server = http.createServer(handler)

process.on('SIGTERM', () => {
  console.log('Starting graceful shutdown')
  server.close(() => {
    console.log('All connections closed')
    process.exit(0)
  })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})