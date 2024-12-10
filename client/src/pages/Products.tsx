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
  quantities: number[];
}

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
  });

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await axios.get<Product[]>("http://localhost:7070/api/consultant/products"); // Adjust endpoint as needed
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: name === "price" ? parseFloat(value) : value });
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
      const response = await axios.post<Product>("http://localhost:7070/api/consultant/products", newProduct);
      setProducts([...products, response.data]);
      setNewProduct({
        name: "",
        nameEn: "",
        description: "",
        format: "",
        price: 0,
        category: "",
        quantities: [],
      });
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Products</h1>
      {/* Add Product Form */}
      <div className="bg-white p-4 rounded shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
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
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="border p-2 rounded"
            value={newProduct.category}
            onChange={handleInputChange}
          />
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
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={addProduct}
        >
          Add Product
        </button>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
