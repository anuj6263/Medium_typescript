import { Hono } from 'hono'
import { router } from './router'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings : {
    DATABASE_URL : string
  }
}>()

app.use('/api/*', cors())

app.route("/api/v1", router)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
