import Product from "../models/Product.js";
import { getChannel } from "../utils/rabbitmq.js";

export const reduceStockListener = async () => {
  const channel = getChannel();
  await channel.assertQueue("ORDER_PAID");

  channel.consume("ORDER_PAID", async (msg) => {
    const { orderId } = JSON.parse(msg.content.toString());

    // fetch order items from Order Service (or include in event later)

    console.log("Reduce stock for order:", orderId);
    channel.ack(msg);
  });
};
