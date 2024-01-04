export default {
  '/': {
    GET: (req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('Welcome to the Home Page!')
    }
  },
  '/api/resource': {
    GET: (req, res) => {
      // Example of a JSON:API compliant response
      res.writeHead(200, { 'Content-Type': 'application/vnd.api+json' })
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
        // Handle different content types here
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end(`Received data: ${body}`)
      })
    }
  }
}
