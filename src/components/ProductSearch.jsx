import React, { useState, useEffect } from 'react';

const ProductSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data.data);
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
            });
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredProducts([]);
        } else {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchTerm, products]);

    const handleProductClick = (product) => {
        const index = selectedProducts.findIndex(p => p._id === product._id);

        if (index === -1) {
            setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
        } else {
            const updatedProducts = [...selectedProducts];
            updatedProducts[index].quantity++;
            setSelectedProducts(updatedProducts);
        }
        setTotalPrice(prevTotal => prevTotal + product.price);
    };

    const handleDeleteProduct = (product) => {
        const index = selectedProducts.findIndex(p => p._id === product._id);
    
        if (selectedProducts[index].quantity === 1) {
            const updatedProducts = selectedProducts.filter(p => p._id !== product._id);
            setSelectedProducts(updatedProducts);
        } else {
            const updatedProducts = [...selectedProducts];
            updatedProducts[index].quantity--;
            setSelectedProducts(updatedProducts);
        }
        setTotalPrice(prevTotal => prevTotal - product.price);
    };
    

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-center p-4 text-white">Administrador de Ventas</h2>
            <div className="flex justify-center">
                <div className="sm:col-span-2">
                    <div className="justify-center flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={handleInputChange}
                            className="px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                        />
                    </div>

                    <ul>
                        {filteredProducts.map(product => (
                            <li key={product._id}
                                className="flex justify-between mt-2 align-items-center p-2 text-gray-800 bg-gray-200">
                                {product.name}
                                <button
                                    onClick={() => handleProductClick(product)}
                                    className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-400 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
                                >Agregar</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex justify-center pl-10 mt-6 w-[600px]">
                    <div className="flex w-full">
                        <table className="tabla-scroll w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-6 py-3">Producto</th>
                                    <th className="px-6 py-3">Cantidad</th>
                                    <th className="px-6 py-3">Precio Unitario</th>
                                    <th className="px-6 py-3">Precio Total</th>
                                    <th className="px-6 py-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedProducts.map(product => (
                                    <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">{product.name}</td>
                                        <td className="px-6 py-4">{product.quantity}</td>
                                        <td className="px-6 py-4">{product.price}</td>
                                        <td className="px-6 py-4">{product.price * product.quantity}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleDeleteProduct(product)}
                                                className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {totalPrice > 0 && (
                <div className="fixed bottom-0 w-full bg-gray-700 text-white h-16 flex items-center justify-end px-12">
    <h3 className="text-lg font-bold">Total Precio: ${totalPrice.toLocaleString()}</h3>
</div>

            )}
        </div>
    );
};

export default ProductSearch;


