const subscriptionService = require('../services/subscription.service');

const upgradeSubscription = async (req, res) => {
    try {
        const subscription = await subscriptionService.upgradeSubscription(req.user.id, req.body);
        res.status(200).json({ message: 'Subscription upgraded', data: subscription });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const cancelSubscription = async (req, res) => {
    try {
        const subscription = await subscriptionService.cancelSubscription(req.user.id);
        res.status(200).json({ message: 'Subscription canceled', data: subscription });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    upgradeSubscription,
    cancelSubscription
}