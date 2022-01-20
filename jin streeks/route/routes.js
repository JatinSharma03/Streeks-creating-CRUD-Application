import express from 'express';

import { getStreeks, postStreeks,getStreekById, editStreeks, deleteStreek } from '../controller/streekController.js';

const route = express.Router();

route.get('/',getStreeks);
route.post('/add',postStreeks);
route.get('/:id',getStreekById);
route.put('/:id',editStreeks);
route.delete('/:id',deleteStreek);
export default route;