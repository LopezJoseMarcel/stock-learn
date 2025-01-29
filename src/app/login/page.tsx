'use client'
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {LoginFormInputs} from '@/types/interfacesElement';
import axios from 'axios';


export default  function LoginForm () {

    const {
      register,
      handleSubmit,
      formState: { errors },    
    } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (dataSubmit) => {
      try {
        const { data } = await axios.post('/api/auth/login', {
          email: dataSubmit.email,
          password: dataSubmit.password,
        });
    
        console.log('Login exitoso:', data);
      } catch (error) {
        console.error('Error durante el login:', error);
    
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.log("Respuesta del servidor:", error.response.data);
            alert(error.response.data.message || 'Error al iniciar sesión');
          } else {
            alert('Error de red o problema con el servidor.');
          }
        } else {
          alert('Ocurrió un error inesperado.');
        }
      }
    };

    return (
        <div className="min-h-screen  flex flex-col  p-8  bg-white size-full">
        <h2 className="text-2xl font-bold mb-4 text-customOrange_dark text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo de Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1 text-customOrange_dark">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded text-gray-700"
              {...register("email", { required: "El email es obligatorio" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
  
          {/* Campo de Contraseña */}
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-1 text-customOrange_dark">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded text-gray-700"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
  
          <button
            type="submit"
            className="w-full bg-customGreen_dark text-white p-2 rounded hover:bg-customGreen_to_dark "
          >
            Iniciar Sesión
          </button>
        </form>
        <h1>  </h1>
      </div>
    )
}
