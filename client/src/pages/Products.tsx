import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id?: number;
  name: string;
  nameEn: string;
  description: string;
  format: string;
  price: number;
  image?: string;
  imageHover?: string;
  imageSrc?: string;
  imageAlt?: string;
  category: string;
  quantities?: number[];
  basicQuantities?: number[];
}

const predefinedCategories = ["PORK", "BEEF", "CHICKEN", "FISH", "GROCERY","FREEZERS"];

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    nameEn: "",
    description: "",
    format: "",
    price: 0,
    category: "",
    quantities: [],
    basicQuantities: [],
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await axios.get<Product[]>(
        "http://localhost:7070/api/consultant/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setNewProduct({ ...newProduct, category: e.target.value });
  };

  const handleQuantitiesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    type: "quantities" | "basicQuantities"
  ): void => {
    const updatedQuantities = [...(newProduct[type] || [])];
    updatedQuantities[index] = parseInt(e.target.value, 10) || 0;
    setNewProduct({ ...newProduct, [type]: updatedQuantities });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, [name]: reader.result as string });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const addProduct = async (): Promise<void> => {
    try {
      const response = await axios.post<Product>(
        "http://localhost:7070/api/consultant/products",
        newProduct
      );
      setProducts([...products, response.data]);
      resetForm();
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  const deleteProduct = async (id: number): Promise<void> => {
    try {
      await axios.delete(`http://localhost:7070/api/consultant/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const startEditing = (product: Product): void => {
    setEditMode(true);
    setEditProductId(product.id || null);
    setNewProduct(product);
  };

  const updateProduct = async (): Promise<void> => {
    if (editProductId === null) return;
    try {
      const response = await axios.put<Product>(
        `http://localhost:7070/api/consultant/products/${editProductId}`,
        newProduct
      );
      setProducts(
        products.map((product) =>
          product.id === editProductId ? response.data : product
        )
      );
      resetForm();
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  const resetForm = (): void => {
    setNewProduct({
      name: "",
      nameEn: "",
      description: "",
      format: "",
      price: 0,
      category: "",
      quantities: [],
      basicQuantities: [],
    });
    setEditMode(false);
    setEditProductId(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Products</h1>
      {/* Add/Edit Product Form */}
      <div className="bg-white p-4 rounded shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">
          {editMode ? "Edit Product" : "Add New Product"}
        </h2>
        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Add Product Form */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border p-2 rounded"
              value={newProduct.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="nameEn"
              placeholder="Name (English)"
              className="border p-2 rounded"
              value={newProduct.nameEn}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              className="border p-2 rounded"
              value={newProduct.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="format"
              placeholder="Format"
              className="border p-2 rounded"
              value={newProduct.format}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="border p-2 rounded"
              value={newProduct.price || ""}
              onChange={handleInputChange}
            />
            <select
              name="category"
              className="border p-2 rounded"
              value={newProduct.category}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {predefinedCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="border p-2 rounded"
            />
            <input
              type="file"
              name="imageHover"
              accept="image/*"
              onChange={handleImageChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Quantities</h3>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex gap-4 mb-2">
                <input
                  type="number"
                  placeholder={`Quantity ${index + 1}`}
                  className="border p-2 rounded w-full"
                  value={newProduct.quantities[index] || ""}
                  onChange={(e) => handleQuantitiesChange(e, index, "quantities")}
                />
                <input
                  type="number"
                  placeholder={`Basic Quantity ${index + 1}`}
                  className="border p-2 rounded w-full"
                  value={newProduct.basicQuantities[index] || ""}
                  onChange={(e) =>
                    handleQuantitiesChange(e, index, "basicQuantities")
                  }
                />
              </div>
            ))}
          </div>


        </div>
        <button
          className={`${editMode ? "bg-green-500" : "bg-blue-500"
            } text-white px-4 py-2 rounded mt-4`}
          onClick={editMode ? updateProduct : addProduct}
        >
          {editMode ? "Update Product" : "Add Product"}
        </button>
        {editMode && (
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-4"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
      </div>
      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded shadow-md p-4 hover:shadow-lg"
          >
            <img
              src={product.imageSrc}
              alt={product.imageAlt || product.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.description}</p>
            <p className="font-bold mt-2">{product.format}</p>
            <p className="text-blue-500 font-semibold mt-2">${product.price}</p>
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded mt-2"
              onClick={() => startEditing(product)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded mt-2 ml-2"
              onClick={() => deleteProduct(product.id!)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
