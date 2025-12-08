import jwt from 'jsonwebtoken';

class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }

    create = async (req, res) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) return res.status(401).json({ error: "Unauthorized" });
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
            const userId = decoded.id;

            const { items } = req.body; 

            const order = await this.orderService.createOrder(userId, items);
            res.status(201).json({ message: "Η παραγγελία ολοκληρώθηκε!", order });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };

    getMyOrders = async (req, res) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) return res.status(401).json({ error: "Unauthorized" });
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
            
            const orders = await this.orderService.getUserOrders(decoded.id);
            res.json(orders);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default OrderController;