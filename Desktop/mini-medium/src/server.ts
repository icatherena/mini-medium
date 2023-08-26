import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { Constants, NodeEnv, Logger } from '@utils'
import { router } from '@router'
import { ErrorHandling } from '@utils/errors'

const app = express();

if (Constants.NODE_ENV === NodeEnv.DEV) {
    app.use(morgan('tiny')) 
}

app.use(express.json()) 
app.use(express.urlencoded({ extended: false })) 
app.use(cookieParser())

app.use(
    cors({
      origin: Constants.CORS_WHITELIST
    })
)

app.use('/api', router)

app.use(ErrorHandling)

app.listen(Constants.PORT, () => {
  Logger.info(`Server listening on port ${Constants.PORT}`)
})