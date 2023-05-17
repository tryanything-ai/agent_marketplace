import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { supabase } from '../../../../utils/supabase';

enum Options {
  signin = 'signin',
  signup = 'singup',
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    try {
      setLoading(true);
      console.log('email', email);
      console.log('password', password);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log('result', data);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <label className="block text-xs mb-1 font-medium text-gray-900 dark:text-gray-100">
        Email
      </label>
      <input
        className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 dark:bg-gray-700"
        defaultValue=""
        {...register('email', { required: true })}
      />
      {/* errors will return when field validation fails  */}
      {errors.email && <span>This field is required</span>}
      <div className="h-4" />
      {/* include validation with required or other standard HTML validation rules */}

      <label className="block mb-1 text-xs font-medium text-gray-900 dark:text-gray-100">
        Password
      </label>
      <input
        className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 dark:bg-gray-700"
        {...register('password', { required: true, minLength: 6 })}
      />

      {/* errors will return when field validation fails  */}
      {errors.password && <span>This field is required</span>}
      <div className="h-6" />
      {/* <button type="submit">Sign In</button> */}
      <button
        disabled={loading}
        type="submit"
        className="btn relative btn-primary"
      >
        <div
          className={`flex w-full gap-2 items-center justify-center ${
            loading ? 'opacity-0' : ''
          }`}
        >
          Sign In
        </div>
        {loading ? (
          <div className="absolute inset-0 gap-2 flex items-center justify-center">
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="animate-spin text-center"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" y1="2" x2="12" y2="6"></line>
              <line x1="12" y1="18" x2="12" y2="22"></line>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
              <line x1="2" y1="12" x2="6" y2="12"></line>
              <line x1="18" y1="12" x2="22" y2="12"></line>
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
          </div>
        ) : null}
      </button>
    </form>
  );
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    try {
      setLoading(true);
      console.log('email', email);
      console.log('password', password);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'https://tryanything.com/chatpgt',
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log('result', data);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <label className="block text-xs mb-1 font-medium text-gray-900 dark:text-gray-100">
        Email
      </label>
      <input
        className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 dark:bg-gray-700"
        defaultValue=""
        {...register('email', { required: true })}
      />
      {/* errors will return when field validation fails  */}
      {errors.email && <span>This field is required</span>}
      <div className="h-4" />
      {/* include validation with required or other standard HTML validation rules */}

      <label className="block mb-1 text-xs font-medium text-gray-900 dark:text-gray-100">
        Password
      </label>
      <input
        className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 dark:bg-gray-700"
        {...register('password', { required: true, minLength: 6 })}
      />

      {/* errors will return when field validation fails  */}
      {errors.password && <span>This field is required</span>}
      <div className="h-6" />
      {/* <button type="submit">Sign In</button> */}
      <button
        disabled={loading}
        type="submit"
        className="btn relative btn-primary"
      >
        <div
          className={`flex w-full gap-2 items-center justify-center ${
            loading ? 'opacity-0' : ''
          }`}
        >
          Sign In
        </div>
        {loading ? (
          <div className="absolute inset-0 gap-2 flex items-center justify-center">
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="animate-spin text-center"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" y1="2" x2="12" y2="6"></line>
              <line x1="12" y1="18" x2="12" y2="22"></line>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
              <line x1="2" y1="12" x2="6" y2="12"></line>
              <line x1="18" y1="12" x2="22" y2="12"></line>
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
          </div>
        ) : null}
      </button>
    </form>
  );
};

const Auth = () => {
  const [option, setOption] = useState<Options>(Options.signin);
  return (
    <div className="p-4 sm:p-6 sm:pt-4 flex flex-row">
      <div className="flex-1 text-2xl">
        Anything <span className="underline">Unverified </span>Plugins
        Marketplace
        {/* <img
          src="https://qcuguzlfpjtyiloqtysz.supabase.co/storage/v1/object/public/random/anything.svg"
          alt="anything logo"
        /> */}
      </div>
      <div className="flex-1 flex flex-col">
        {option === Options.signin ? <SignIn /> : <SignUp />}
        <div className="h-2" />
        <div className="text-center">or</div>
        <div className="h-2" />
        {option === Options.signin ? (
          <button
            onClick={() => setOption(Options.signup)}
            className="btn relative btn-neutral"
          >
            <div className="flex w-full gap-2 items-center justify-center">
              Sign Up
            </div>
          </button>
        ) : (
          <button
            onClick={() => setOption(Options.signin)}
            className="btn relative btn-neutral"
          >
            <div className="flex w-full gap-2 items-center justify-center">
              Sign In
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;
