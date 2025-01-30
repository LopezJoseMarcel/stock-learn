'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { UserModelInterface } from '@/types/interfacesModel';


export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserModelInterface>();

  const onSubmit: SubmitHandler<UserModelInterface> = async (data) => {
    try {
      const response = await axios.post('/api/auth/register', data);
      console.log('Registro exitoso:', response.data);
      
    } catch (error: any) {
      console.error('Error en el registro:', error);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || 'Error en el registro';
        setError('email', { type: 'manual', message: errorMessage });
      } else {
        setError('email', { type: 'manual', message: 'Ocurrió un error inesperado' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-8 bg-white w-full">
      <h2 className="text-2xl font-bold mb-4 text-center text-customOrange_dark">Registro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Usuario */}
        <div className="mb-4">
          <label className="block font-medium mb-1 text-customOrange_dark">Usuario</label>
          <input
            type="text"
            className="w-full p-2 border rounded text-gray-700"
            {...register('userName', { required: 'El usuario es obligatorio' })}
          />
          {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium mb-1 text-customOrange_dark">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded text-gray-700"
            {...register('email', { required: 'El email es obligatorio', pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Email inválido' } })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Contraseña */}
        <div className="mb-4">
          <label className="block font-medium mb-1 text-customOrange_dark">Contraseña</label>
          <input
            type="password"
            className="w-full p-2 border rounded text-gray-700"
            {...register('password', { required: 'La contraseña es obligatoria', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button type="submit" className="w-full bg-customGreen_dark text-white p-2 rounded hover:bg-customGreen_to_dark">
          Registrarse
        </button>
      </form>
    </div>
  );
}
