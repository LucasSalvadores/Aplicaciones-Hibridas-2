import React, { useState, useEffect } from 'react';
import FormProducts from '../components/FormProducts';
import { useMensaje } from '../contexts/MensajeContext';
import ModalConfirm from '../components/ModalConfirm';
import '../App.css';

function TablaProductos() {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mostrarMensaje } = useMensaje();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlProducts = 'http://localhost:3000/products';
                const response = await fetch(urlProducts);
                if (!response.ok) {
                    throw new Error('Hubo un problema al obtener los datos.');
                }
                const data = await response.json();
                const products = data.data;
                setProducts(products);

            } catch (error) {
                console.error('[Fetch-Api] Hubo un problema al obtener los datos:', error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const handleDeleteProduct = async (productId, productName) => {
        setSelectedProductId(productId);
        setIsModalOpen(true);
    };

    const confirmDeleteProduct = async () => {
        try {
            const response = await fetch(`http://localhost:3000/products/${selectedProductId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Hubo un problema al eliminar el producto.');
            }
            console.log('Producto eliminado con éxito');
            mostrarMensaje('success', `¡El producto se eliminó con éxito!`);

            const updatedProducts = products.filter(product => product._id !== selectedProductId);
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            mostrarMensaje('error', 'Ups! Hubo un error al querer eliminar el producto');
        } finally {
            setIsModalOpen(false);
            setSelectedProductId(null);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProductId(null);
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-center p-4 text-white">Productos</h1>
            <div className="container flex justify-evenly pt-12">
                <div className="flex w-2/4">
                    <table className="tabla-scroll w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3">Productos</th>
                                <th className="px-6 py-3">Precio</th>
                                <th className="px-6 py-3">Código</th>
                                <th className="px-6 py-3">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.name}</td>
                                    <td className="px-6 py-4">${product.price}</td>
                                    <td className="px-6 py-4">{product.plu}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDeleteProduct(product._id, product.name)}
                                            className="text-white bg-red-500 p-2 rounded-lg hover:bg-red-600"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-96">
                    <FormProducts />
                </div>
            </div>

            <ModalConfirm
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDeleteProduct}
                productName={products.find(product => product._id === selectedProductId)?.name}
            />
        </>
    );
}

export default TablaProductos;
