import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscriptions.controller.js";


const SubscriptionRouter = Router();

SubscriptionRouter.get('/', (req, res) => res.send({ title: 'Get all Subscriptions' }));

SubscriptionRouter.get('/:id', (req, res) => res.send({ title: `Get Subscription by id: ${req.params.id}` }));

SubscriptionRouter.post('/', authorize, createSubscription);

SubscriptionRouter.put('/:id', (req, res) => res.send({ title: `Update Subscription by id: ${req.params.id}` }));

SubscriptionRouter.delete('/:id', (req, res) => res.send({ title: `Delete Subscription by id: ${req.params.id}` }));  

SubscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

SubscriptionRouter.get('/:id/cancel', (req, res) => res.send({ title: `Cancel Subscription by id: ${req.params.id}` }));

SubscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: `Renew Subscription by id: ${req.params.id}` }));

export default SubscriptionRouter;