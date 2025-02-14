'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { UserModelInterface } from '@/types/interfacesModel';
import { useRouter } from 'next/navigation';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useUser } from '@/contexts/userContex';
import LinkButton from '../common/LinkButton';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserModelInterface>();

  const { fetchUser } = useUser();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<UserModelInterface> = async (data) => {

     setIsLoading(true);
    
      const response = await axios.post('/api/auth/login', data);
      if (response.data.code === 0) {
         console.log('Login exitoso');
         const userF = await fetchUser();
         console.log(userF);
          
        router.push('/dashboard');
      }
      if (response.data.code === 1) {
       setIsLoading(false);
        console.log('Error en el Login:', response.data.message);
        setError('email', { type: 'manual', message: response.data.message });
      }
  };

  return (
    
    <div className="min-h-screen flex flex-col p-8 bg-white w-full">
      <h2 className="text-2xl font-bold mb-4 text-center text-customOrange_dark">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium mb-1 text-customOrange_dark">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded text-gray-700"
            {...register('email', { required: 'El email es obligatorio', pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Email inválido' } })}
          />
        </div>

        {/* Contraseña */}
        <div className="mb-4">
          <label className="block font-medium mb-1 text-customOrange_dark">Contraseña</label>
          <input
            type="password"
            className="w-full p-2 border rounded text-gray-700"
            {...register('password', { required: 'La contraseña es obligatoria', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
          />
        </div>

        <button type="submit" className="w-full bg-customGreen_dark text-white p-2 rounded hover:bg-customGreen_to_dark">
          Login
        </button>
        <LinkButton
          params={{ text:"Registrarse", href: "/register"  }}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </form>
      <Backdrop
        sx={(theme) => ({ color: '#ff9d23', zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
