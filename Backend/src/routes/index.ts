import {Router} from 'express';
import AUTH_ROUTE from './auth.route';

const ROUTE = Router();

ROUTE.use('/', AUTH_ROUTE);


export default ROUTE;