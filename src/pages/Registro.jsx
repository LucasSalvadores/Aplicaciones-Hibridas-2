import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMensaje } from '../contexts/MensajeContext';

const Registro = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        shift: '',
        email: '',
        password: ''
    });

    const { mostrarMensaje } = useMensaje();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (
            formData.name.trim() === '' ||
            formData.lastname.trim() === '' ||
            formData.shift.trim() === '' ||
            formData.email.trim() === '' ||
            formData.password.trim() === ''
        ) {
            mostrarMensaje('error', 'Todos los campos son obligatorios');
            return;
        }

        try {
            const endPoint = 'http://127.0.0.1:3000/users';
            const response = await fetch(endPoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const json = await response.json();
            mostrarMensaje('success', `¡Usuario, ${formData.email} registrado con éxito!`);

            setFormData({
                name: '',
                lastname: '',
                shift: '',
                email: '',
                password: ''
            });

            console.log(json);

            navigate('/admin');

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-center p-4 text-white">Registrarme</h1>
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <div className="flex items-start flex-row justify-start">
                        <div className="flex items-center text-lg mb-6 md:mb-8 mr-2">
                            <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                                <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
                            </svg>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                id="name"
                                name="name"
                                placeholder="Ingrese su Nombre"
                                className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" />
                        </div>
                        <div className="flex items-center text-lg mb-6 md:mb-8">
                            <input
                                type="text"
                                value={formData.lastname}
                                onChange={handleChange}
                                id="lastname"
                                name="lastname"
                                placeholder="Ingrese su Apellido"
                                className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" />
                        </div>
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="shift" className="text-sm text-gray-500 mr-2">Turno</label>
                        <select
                            value={formData.shift}
                            onChange={handleChange}
                            id="shift"
                            name="shift"
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="">Seleccione un turno</option>
                            <option value="A">Turno mañana</option>
                            <option value="B">Turno tarde</option>
                        </select>
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="email" className="text-sm text-gray-500 mr-2">Email:</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            id="email"
                            name="email"
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="password" className="text-sm text-gray-500 mr-2">Contraseña:</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <button className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded">Registrarme</button>
                </form>
            </div>

        </>
    )
}

export default Registro