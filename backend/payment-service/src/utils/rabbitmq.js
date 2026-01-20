import amqp from "amqplib";

let channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();

  console.log("RabbitMQ connected");
};

export const getChannel = () => channel;
