import { useState } from "react";
import { useCreateProduct } from "@/features/products/product.queries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const CreateProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });

  const { mutate, isPending } = useCreateProduct();

  const submitHandler = (e) => {
    e.preventDefault();
    mutate({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });
  };

  return (
    <form onSubmit={submitHandler} className="space-y-4 max-w-md">
      <Label>Name</Label>
      <Input onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <Label>Price</Label>
      <Input type="number" onChange={(e) => setForm({ ...form, price: e.target.value })} />

      <Label>Stock</Label>
      <Input type="number" onChange={(e) => setForm({ ...form, stock: e.target.value })} />

      <Label>Category</Label>
      <Input onChange={(e) => setForm({ ...form, category: e.target.value })} />

      <Button disabled={isPending}>
        {isPending ? "Creating..." : "Create Product"}
      </Button>
    </form>
  );
};

export default CreateProduct;
