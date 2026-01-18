import prisma from "../config/db.js";
import axios from "axios";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    let total = 0;

    for (const item of items) {
      const { data: product } = await axios.get(
        `${process.env.PRODUCT_SERVICE_URL}/api/products/get-product-by-id/${item.productId}`
      );

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`
        });
      }

      item.price = product.price;
      total += product.price * item.quantity;
    }
    for (const item of items) {
  await axios.put(
    `${process.env.PRODUCT_SERVICE_URL}/api/products/reduce-stock/${item.productId}`,
    { quantity: item.quantity },
    {
      headers: {
        Authorization: req.headers.authorization
      }
    }
  );
}


    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        total,
        items: {
          create: items
        }
      },
      include: { items: true }
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// USER ORDERS
export const myOrders = async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user.id },
    include: { items: true }
  });
  res.json(orders);
};

// ADMIN: ALL ORDERS
export const allOrders = async (req, res) => {
  const orders = await prisma.order.findMany({
    include: { items: true }
  });
  res.json(orders);
};

// UPDATE STATUS
export const updateStatus = async (req, res) => {
  const { status } = req.body;

  const order = await prisma.order.update({
    where: { id: Number(req.params.id) },
    data: { status }
  });

  res.json(order);
};
