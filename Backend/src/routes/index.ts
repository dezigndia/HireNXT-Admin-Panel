import {Router} from 'express';
import {login} from '../controllers/authController';

const API_ROUTE = Router();

API_ROUTE.get('/', (req, res) => {
       res.send('Hello from user routes!');
   });
 
// API_ROUTE.get('/getUsers', (req, res) => {
    
//     async function users() {
//         const query = "select * from auth.users;";
//         const selectQuery = new databaseDAO(query);
//         const result = await selectQuery.selectQueryResult();
//         console.log(result.rows[0]);
//     }
//     users();
//     res.send('Hello from user routes!- get users');
// });
API_ROUTE.post('/login', (req, res) => {
    login(req, res);
});

export default API_ROUTE;