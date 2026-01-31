import { useParams, useNavigate } from "react-router-dom";
import { useProduct, useUpdateProduct } from "@/features/products/product.queries"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useProduct(id);
  const { mutate, isPending } = useUpdateProduct();

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });

  // 🔄 Prefill form when product loads
  useEffect(() => {
    if (data) {
      setForm({
        name: data.name || "",
        price: data.price || "",
        stock: data.stock || "",
        category: data.category || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(
      {
        id,
        data: {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        },
      },
      {
        onSuccess: () => {
          navigate("/admin/products");
        },
      }
    );
  };

  if (isLoading) return <p>Loading product...</p>;

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
        />

        <Input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <Input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />

        <Input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </div>
  );
};

export default EditProduct;
