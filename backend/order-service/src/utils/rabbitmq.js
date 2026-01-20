import amqp from "amqplib";

let channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();

    console.log("RabbitMQ connected (Order Service)");
    return channel;
  } catch (error) {
    console.error("RabbitMQ connection failed", error);
  }
};

export const getChannel = () => channel;
