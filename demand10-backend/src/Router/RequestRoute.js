import express from 'express';
import { createRequest, deleteRequest, getAllRequests } from '../controller/requestController.js';
import { adminAuthMiddleware } from '../middleware/adminAuthMiddleware.js';
import { validate } from '../middleware/validate.js';
import { datasetRequestSchema } from '../validation/requestSchemas.js';

const router = express.Router();

router.post('/data', validate(datasetRequestSchema), createRequest);
router.get('/AllData', adminAuthMiddleware, getAllRequests);
router.delete('/deleterequest/:id', adminAuthMiddleware, deleteRequest);

export default router;