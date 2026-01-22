import { getChannel } from "../utils/rabbitmq.js";
import Product from "../models/product.model.js";

export const orderCancelledListener = async () => {
  const channel = getChannel();

  if (!channel) throw new Error("RabbitMQ channel not ready");

  await channel.assertQueue("ORDER_CANCELLED");

  channel.consume("ORDER_CANCELLED", async (msg) => {
    const { items } = JSON.parse(msg.content.toString());

    console.log("ORDER_CANCELLED event received");

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    channel.ack(msg);
  });
};
