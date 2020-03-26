import Dotenv from 'dotenv'
import HapiServer from './http/HapiServer'
import Routes from './config/Routes'


export default class Kernel {

  boot() {
    const result = Dotenv.config()

    if (result.error) {
      throw result.error
    }

    process.on('unhandledRejection', (err) => {
      console.log(err)
      process.exit(1)
    })

    const HttpServer = new HapiServer({
      port: process.env.PORT,
      host: process.env.HOST
    });
    console.log(Routes);
    HttpServer.registerRoutes(Routes);

    HttpServer.start();
  }
}