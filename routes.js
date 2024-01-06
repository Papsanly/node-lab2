export default {
  '/': {
    GET: (req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('Welcome to the Home Page!')
    }
  },
  '/api/resource': {
    GET: (req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/vnd.src+json' })
      res.end(
        JSON.stringify({
          data: {
            type: 'resource',
            id: '1',
            attributes: {
              message: 'Hello, this is your resource!'
            }
          }
        })
      )
    },
    POST: (req, res) => {
      let body = ''
      req.on('data', chunk => {
        body += chunk.toString()
      })
      req.on('end', () => {
        const contentType = req.headers['content-type']
        let parsedData

        if (contentType === 'application/json') {
          try {
            parsedData = JSON.parse(body)
          } catch (error) {
            res.writeHead(400, { 'Content-Type': 'text/plain' })
            return res.end('Invalid JSON')
          }
        } else if (contentType === 'application/x-www-form-urlencoded') {
          parsedData = new URLSearchParams(body)
        } else {
          res.writeHead(415, { 'Content-Type': 'text/plain' })
          return res.end('Unsupported Media Type')
        }

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(`Received data: ${JSON.stringify(parsedData)}`)
      })
    }
  }
}
