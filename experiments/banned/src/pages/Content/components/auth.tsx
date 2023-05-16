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
      const { data: result, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log('result', result);
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
      <div className="h-4" />
      {/* <button type="submit">Sign In</button> */}
      <button type="submit" className="btn relative btn-primary">
        <div className="flex w-full gap-2 items-center justify-center">
          Sign In
        </div>
      </button>
    </form>
  );
};

const SignUp = () => {
  // async function signUpWithEmail() {
  //   try {
  //     setLoading(true);
  //     const { data, error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //       options: {
  //         emailRedirectTo: 'https://tryanything.com/chatpgt',
  //       },
  //     });
  //   } catch (error) {
  //     alert(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  return (
    <br />
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   {/* register your input into the hook by invoking the "register" function */}
    //   <input
    //     defaultValue="carl@tryanything.xyz"
    //     {...register('email', { required: true })}
    //   />

    //   {/* include validation with required or other standard HTML validation rules */}
    //   <input {...register('password', { required: true })} />
    //   {/* errors will return when field validation fails  */}
    //   {errors.password && <span>This field is required</span>}

    //   <input type="submit" />
    // </form>
  );
};

const Auth = () => {
  const [option, setOption] = useState<Options>(Options.signin);
  return (
    <div
      className="p-4 sm:p-6 sm:pt-4 flex flex-row"
      style={{ backgroundColor: 'blue' }}
    >
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
        <div className="text-center">- or -</div>
        {option === Options.signin ? (
          <button onClick={() => setOption(Options.signup)}>Sign Up</button>
        ) : (
          <button onClick={() => setOption(Options.signin)}>Sing In</button>
        )}
      </div>
    </div>
  );
};

export default Auth;
