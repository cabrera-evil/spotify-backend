const SubscriptionModel = require('../models/subscription.model');
const CreditCardModel = require('../models/creditCard.model');
const PaypalModel = require('../models/paypal.model');
const PaymentModel = require('../models/payment.model');

/**
 * @description Upgrade the user subscription to premium
 * @param {number} id User id
 * @param {object} data User data
 * @returns {object} Updated subscription
 */
const upgradeSubscription = async (id, data) => {
    try {
        // Get the user subscription and upgrade it to premium (if it's not already premium)
        const subscription = await SubscriptionModel.findOne({ where: { userId: id } });

        // Calculate the date of the next renewal (1 month from now)
        const renewalDate = new Date();
        renewalDate.setMonth(renewalDate.getMonth() + 1);

        // Check if the user has a payment method
        if (!data.creditCard && !data.paypal) throw new Error('Payment method not found');

        // Check if the user is already premium
        if (!subscription) throw new Error('Subscription not found');
        if (subscription.name === 'premium') throw new Error('Subscription already upgraded');

        // Update the user subscription name
        const updatedSubscription = await subscription.update({ name: 'premium', renovationDate: renewalDate });

        // Save credit card if it doesn't exist
        if (data.creditCard) {
            const existingCreditCard = await CreditCardModel.findOne({
                where: {
                    userId: id,
                    number: data.creditCard.number
                }
            });
            if (!existingCreditCard) {
                await CreditCardModel.create({
                    ...data.creditCard,
                    userId: id,
                });
            }
        }

        // Save PayPal account if it doesn't exist
        if (data.paypal) {
            const existingPaypal = await PaypalModel.findOne({
                where: {
                    userId: id,
                    username: data.paypal.username
                }
            });
            if (!existingPaypal) {
                await PaypalModel.create({
                    ...data.paypal,
                    userId: id,
                });
            }
        }

        // Get order number
        const orderNumber = await PaymentModel.count() + 1;

        // Create a payment record
        await PaymentModel.create({
            orderNumber,
            total: 9.99,
            subscriptionId: updatedSubscription.id,
        });
        return updatedSubscription;
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * @description Cancel the user subscription
 * @param {number} id User id
 * @returns {object} Updated subscription
 */
const cancelSubscription = async (id) => {
    try {
        // Get the user subscription and cancel it (if it's not already canceled)
        const subscription = await SubscriptionModel.findOne({ where: { userId: id } });
        if (!subscription) throw new Error('Subscription not found');
        if (subscription.name === 'free') throw new Error('Subscription already canceled');

        // Update the user subscription name
        const updatedSubscription = await subscription.update({ name: 'free', renovationDate: null });
        return updatedSubscription;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    upgradeSubscription,
    cancelSubscription
}