class OrderService {
    constructor(orderModel, orderItemModel, productModel) {
        this.orderModel = orderModel;
        this.orderItemModel = orderItemModel;
        this.productModel = productModel;
    }

    async createOrder(userId, cartItems) {

        let totalCost = 0;
        const itemsToSave = [];

        for (const item of cartItems) {
            const product = await this.productModel.findByPk(item.productId);
            
            if (!product) throw new Error(`Το προϊόν με id ${item.productId} δεν βρέθηκε.`);
            if (product.stock < item.quantity) throw new Error(`Δεν υπάρχει αρκετό απόθεμα για το ${product.title}`);

            const cost = product.price * item.quantity;
            totalCost += cost;

            itemsToSave.push({
                OrderId: null,
                ProductId: product.id,
                quantity: item.quantity,
                price: product.price
            });

            product.stock -= item.quantity;
            await product.save();
        }

        const newOrder = await this.orderModel.create({
            UserId: userId,
            total: totalCost,
            status: 'completed'
        });

        for (const item of itemsToSave) {
            item.OrderId = newOrder.id;
            await this.orderItemModel.create(item);
        }

        return newOrder;
    }

    async getUserOrders(userId) {
        return await this.orderModel.findAll({
            where: { UserId: userId },
            include: [this.orderItemModel]
        });
    }
}

export default OrderService;