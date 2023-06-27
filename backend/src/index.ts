import express, { Express, Request, Response } from 'express'

import cors from 'cors'
import { getOraclePrice } from './app'

const app: Express = express()
const port = 8000

app.use(cors())
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status ?? 500).send(err.message ?? 'Something broke!')
})

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

/**
 * Example endpoint
 */
app.get('/oracle-price/:tokenAddress', async (req: Request, res: Response) => {
  const { tokenAddress } = req.params

  if (!tokenAddress) {
    res.status(300).send('tokenAddress not found')
  }

  try {
    const result = await getOraclePrice(tokenAddress)
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    return res.status(500).send(error?.message)
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
