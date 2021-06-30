import express from 'express'

const routes = express.Router();
import PersonController from './controllers/PersonController';
import UserController from './controllers/UserController'
// User Routes
routes.post('/user/register', UserController.store);
routes.post('/user/login', UserController.login);
routes.get('/user/check', UserController.auth, UserController.check);

// Pages Routes

routes.get('/', PersonController.index);
routes.get('/length', PersonController.indexLength);
routes.post('/add', PersonController.store);
routes.get('/show', PersonController.show);
routes.post('/update', PersonController.update);
routes.delete('/delete', PersonController.delete);
routes.get('/filter', PersonController.filter);

export default routes