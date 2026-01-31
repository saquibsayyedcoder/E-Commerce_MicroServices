import { useState } from "react";
import { useProducts, useDeleteProduct } from "@/features/products/product.queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const AdminProducts = () => {
  const { data, isLoading, isError } = useProducts();
  const deleteMutation = useDeleteProduct();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = Array.isArray(data) ? data : [];

  // Open confirmation modal
  const openDeleteDialog = (product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  // Confirm deletion
  const handleConfirmDelete = () => {
    if (!selectedProduct) return;

    deleteMutation.mutate(selectedProduct._id, {
      onSuccess: () => {
        toast.success("Product deleted successfully!");
        setDeleteDialogOpen(false);
        setSelectedProduct(null);
      },
      onError: (err) => {
        toast.error("Delete failed: " + err.message);
        setDeleteDialogOpen(false);
        setSelectedProduct(null);
      },
    });
  };

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p className="text-red-500">Failed to load products</p>;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Products</h1>
        <Link to="/admin/products/create">
          <Button>➕ Create Product</Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => {
            const isDeleting = deleteMutation.isLoading && deleteMutation.variables === product._id;

            return (
              <Card key={product._id}>
                <CardHeader className="font-semibold">{product.name}</CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-lg font-bold">₹{product.price}</p>
                  <p className="text-sm text-gray-500">Stock: {product.stock}</p>

                  <div className="flex gap-2">
                    {/* Edit Button */}
                    <Link to={`/admin/products/edit/${product._id}`}>
                      <Button variant="outline" size="sm">
                        ✏️ Edit
                      </Button>
                    </Link>

                    {/* Delete Button */}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDeleteDialog(product)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "🗑️ Delete"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* ✅ ShadCN Dialog for delete confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selectedProduct?.name}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deleteMutation.isLoading}
            >
              {deleteMutation.isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
