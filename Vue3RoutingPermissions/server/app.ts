import express, { Application, Request, Response } from 'express'
import { users, routes, IUser, IRoute } from './data'

const app: Application = express()
const PORT: number = 8081

interface IBody {
  id: number
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/user_router_list', (req: Request, res: Response) => {
  const { id }: IBody = req.body
  if (id) {
    const userInfo: IUser | undefined = users.find((item) => item.id === id)
    if (userInfo) {
      const authRouteList: IRoute[] = []
      userInfo.auth.map(id => {
        routes.map((route: IRoute) => {
          if(route.id === id) authRouteList.push(route)
        })
      })
      res.status(200).send({
        code: 200,
        message: '获取成功',
        data: authRouteList
      })
    } else {
      res.status(404).send({
        code: 404,
        message: '用户不存在',
        data: []
      })
    }
  } else {
    res.status(400).send({
      code: 400,
      message: '参数错误',
      data: []
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
