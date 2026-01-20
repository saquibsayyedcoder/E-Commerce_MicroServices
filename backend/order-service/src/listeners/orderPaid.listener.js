import { getChannel } from "../utils/rabbitmq.js";


export const orderPaidListener = async () => {
  const channel = getChannel();

  if (!channel) {
    throw new Error("RabbitMQ channel not initialized");
  }

  await channel.assertQueue("ORDER_PAID");

  channel.consume("ORDER_PAID", (msg) => {
    const data = JSON.parse(msg.content.toString());

    console.log("Order Paid Event Received:", data);

    // TODO: update order status here

    channel.ack(msg);
  });
};
