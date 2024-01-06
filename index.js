import http from 'http'
import routes from './routes.js'

function handler(req, res) {
  const { method, url, headers } = req
  console.log(`Received ${method} request for ${url}`)

  const contentType = headers['content-type']

  const handler = routes[url] ? routes[url][method] : null

  if (handler) {
    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })

    req.on('end', () => {
      if (method !== 'GET') {
        let parsedData

        if (contentType === 'application/json') {
          try {
            parsedData = JSON.parse(body)
          } catch (error) {
            res.writeHead(400, { 'Content-Type': 'text/plain' })
            return res.end('Invalid JSON')
          }
        } else if (contentType === 'application/x-www-form-urlencoded') {
          try {
            parsedData = Object.fromEntries(new URLSearchParams(body))
          } catch (error) {
            res.writeHead(400, { 'Content-Type': 'text/plain' })
            return res.end('Invalid form data')
          }
        } else {
          res.writeHead(415, { 'Content-Type': 'text/plain' })
          return res.end('Unsupported Media Type')
        }

        req.body = parsedData
      }
      handler(req, res)
    })
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
