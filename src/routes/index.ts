import { Application } from 'express';
import * as homeController from '../controllers/home';
import * as loginController from '../controllers/login';
import * as postController from '../controllers/post';
import { oauthRedirect } from '../middlewares/oauth';

const initRoutes = (app: Application): void => {
  app.get('/', oauthRedirect, homeController.index);
  app.get('/login', homeController.login);
  app.get('/normal-login', homeController.normalLogin);
  app.get('/post', postController.list);

  // 此路由为了 oauth2.0 演示
  app.get('/token', loginController.getToken);

  app.post('/normal-login', loginController.normalLogin);
  app.post('/login', loginController.login);
  app.get('/callback', loginController.callback);
};

export { initRoutes };
