export default async function handler(req, res) {
    await connectDB();
  
    if (req.method !== "PUT") {
      return res.status(400).json({ message: "Method not allowed" });
    }
  
    const session = await getSession({ req });
  
    if (!session) {
      return res.status(401).json({ message: "Not authenticated" });
    }
  
    const { orderId } = req.query;
  
    try {
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      // Update order status to paid
      order.isPaid = true;
      order.paidAt = new Date();
      await order.save();
  
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }