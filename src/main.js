import Dotenv from 'dotenv'
import ContainerBuilder from 'smart-container'
import Server from './server.js'

const result = Dotenv.config()

if (result.error) {
  throw result.error
}

console.log(result.parsed)

// dependencies injection
const container = ContainerBuilder.build(__dirname, '../config/services.js')
container.get('logger').log('test')

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

new Server().init()
