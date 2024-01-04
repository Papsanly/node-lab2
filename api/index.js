import handler from '../src/index.js'

export default function apiHandler(req, res) {
  console.log(req.url)
  return handler(req, res)
}
