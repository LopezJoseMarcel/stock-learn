'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { login } from '@/services/authService';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (dataSubmit) => {
    try {
      const userData = await login(dataSubmit.email, dataSubmit.password);
      console.log('Login successful:', userData);
    } catch (error: any) {
      console.error('Error during login:', error);
      setError('password', { type: 'manual', message: error.message });
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-8 bg-white size-full">
      <h2 className="text-2xl font-bold mb-4 text-customOrange_dark text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1 text-customOrange_dark">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded text-gray-700"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1 text-customOrange_dark">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded text-gray-700"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-customGreen_dark text-white p-2 rounded hover:bg-customGreen_to_dark"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
