import express from 'express'
import PersonController from './controllers/PersonController'
import UserController from './controllers/UserController'

const routes = express.Router()
// User Routes
routes.post('/user/register', UserController.adminAuth, UserController.store)
routes.post('/user/login', UserController.login)
routes.get('/user/check', UserController.auth, UserController.check)
routes.post('/user/admin/check', UserController.adminAuth, UserController.check)

// Pages Routes

routes.get('/index/:page', PersonController.index)
routes.get('/length', PersonController.indexLength)
routes.post('/add', PersonController.store)
routes.get('/show/:id', PersonController.show)
routes.patch('/update', PersonController.update)
routes.delete('/delete/:id', PersonController.delete)
routes.get('/filter/:name', PersonController.filter)

export default routes
