// Login.jsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import { localeOption } from 'primereact/api';
import { useFavorites } from '../shared/hooks/useFavorites';

const Login = () => {
  const navigate = useNavigate();
  const {layoutConfig}=useFavorites();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Login attempt:', data);
    localStorage.setItem('user', JSON.stringify(data));
    navigate('/home');
  };

  return (
    <div className="login-bgcolor ">
      <div className="login-wrapper flex justify-content-center">
        <Card title={localeOption('LOGIN')} className="login-card shadow-4">
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field mb-4">
              <label htmlFor="email" className="font-bold text-primary">
                {localeOption('EMAIL')}
              </label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email format',
                  },
                }}
                render={({ field }) => (
                  <>
                    <InputText
                      id="email"
                      placeholder="Enter your email"
                      className={`w-full ${errors.email ? 'p-invalid' : ''}`}
                      {...field}
                    />
                    {errors.email && (
                      <small className="p-error">{errors.email.message}</small>
                    )}
                  </>
                )}
              />
            </div>

            {/* Password */}
            <div className="field mb-4">
              <label htmlFor="password" className="font-bold text-primary">
                {localeOption('PASSWORD')}
              </label>
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Password is required' ,
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      'Password must be at least 8 characters, include uppercase, lowercase, number, and special character',
                  },
                }}
                render={({ field }) => (
                  <>
                    <Password
                      id="password"
                      placeholder="Enter your password"
                      toggleMask
                      feedback={false}
                      className={`w-full ${errors.password ? 'p-invalid' : ''}`}
                      {...field}
                    />
                    {errors.password && (
                      <small className="p-error">{errors.password.message}</small>
                    )}
                  </>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              label={localeOption('LOGIN')}
              rounded
              text
              raised
              severity="info"
              className="w-full"
            />
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
