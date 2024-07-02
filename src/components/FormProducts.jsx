import '../App.css';
import { useState } from 'react';
import { useMensaje } from '../contexts/MensajeContext';

const FormProducts = () => {

    const { mostrarMensaje } = useMensaje();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        plu: ''
    })

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = {};
        if (!formData.name.trim()) {
            errors.name = 'El nombre es requerido';
        }
        if (!formData.price.trim()) {
            errors.price = 'El precio es requerido';
        } else if (isNaN(Number(formData.price))) {
            errors.price = 'El precio debe ser un número válido';
        }
        if (!formData.plu.trim()) {
            errors.plu = 'El código es requerido';
        } else if (isNaN(Number(formData.plu))) {
            errors.plu = 'El código debe ser un número válido';
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            const endPoint = 'http://localhost:3000/products';
            const response = await fetch(endPoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const json = await response.json();
            console.log(json);
            mostrarMensaje('success', `¡El producto, ${formData.name} se agregó con éxito!`);

            setFormData({
                name: '',
                price: '',
                plu: ''

                
            });


        } catch (error) {
            console.error(error)
            mostrarMensaje('error', 'Hubo un error al agregar el producto');
        }

    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-white"> Listar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mt-2">
                    <label className="text-white" htmlFor="name">Nombre del Producto</label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                        id="name"
                    />
                </div>
                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                <div className="mt-2">
                    <label className="text-white" htmlFor="price">Precio</label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.price}
                        onChange={handleChange}
                        type="text"
                        name="price"
                        id="price"
                    />
                </div>
                {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
                <div className="mt-2">
                    <label className="text-white" htmlFor="codigo">Código</label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.plu}
                        onChange={handleChange}
                        type="text"
                        name="plu"
                        id="codigo"
                    />
                </div>
                {errors.plu && <p style={{ color: 'red' }}>{errors.plu}</p>}
                <button type="submit" className="text-white mt-4 bg-blue-700 hover:bg-blue-800  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700">
                    Agregar
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </form>

        </div>
    )
}

export default FormProducts