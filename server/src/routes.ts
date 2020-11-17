import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/orphanages'    , upload.array('images') ,OrphanagesController.create);
routes.get ('/orphanages/:id', OrphanagesController.show);
routes.get ('/orphanages'    , OrphanagesController.index);

routes.post('/users'    , UsersController.create);
routes.get ('/users'    , UsersController.index);
routes.get ('/users/:id', UsersController.show);

export default routes;
