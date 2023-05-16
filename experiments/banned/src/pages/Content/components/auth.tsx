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
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input
        defaultValue="carl@tryanything.xyz"
        {...register('email', { required: true })}
      />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register('password', { required: true, minLength: 6 })} />
      {/* errors will return when field validation fails  */}
      {errors.password && <span>This field is required</span>}

      <button type="submit">Sign In</button>
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
    <div className="h-32 bg-pink-200" style={{ backgroundColor: 'pink' }}>
      {option === Options.signin ? <SignIn /> : <SignUp />}
    </div>
  );
};

export default Auth;
