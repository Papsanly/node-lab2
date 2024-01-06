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
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end(`Received data: ${JSON.stringify(req.body)}`)
    }
  }
}
