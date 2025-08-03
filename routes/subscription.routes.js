import { Router } from "express";

const SubscriptionRouter = Router();

SubscriptionRouter.get('/', (req, res) => res.send({ title: 'Get all Subscriptions' }));

SubscriptionRouter.get('/:id', (req, res) => res.send({ title: `Get Subscription by id: ${req.params.id}` }));

SubscriptionRouter.post('/', (req, res) => res.send({ title: 'Create new Subscription' }));

SubscriptionRouter.put('/:id', (req, res) => res.send({ title: `Update Subscription by id: ${req.params.id}` }));

SubscriptionRouter.delete('/:id', (req, res) => res.send({ title: `Delete Subscription by id: ${req.params.id}` }));  

SubscriptionRouter.get('/user/:id', (req, res) => res.send({ title: `Get all Subscriptions for User id: ${req.params.id}` }));

SubscriptionRouter.get('/:id/cancel', (req, res) => res.send({ title: `Cancel Subscription by id: ${req.params.id}` }));

SubscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: `Renew Subscription by id: ${req.params.id}` }));

export default SubscriptionRouter;