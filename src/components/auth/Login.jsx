import { useAppContext } from "@/context/AppContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Close } from "@mui/icons-material";
import { IconButton, TextField, Tooltip } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingAnimation from "../loading/LoadingAnimation";

const Login = () => {
  const { closeAuthModel, toggleLogin } = useAppContext();
  const schema = z.object({
    email: z.string().email("invalid email"),
    password: z.string().min(8, "password must be greater than 7 character"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      console.log("res", res);

      if (res) {
        closeAuthModel();
      }
    } catch (error) {
      //show toast
      console.log("errorsss", errors);
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=' bg-[#1f2937df] p-2 w-full max-w-[350px] min-h-52 rounded-md flex flex-col gap-2'
    >
      <div className=' flex items-center justify-end'>
        <IconButton onClick={closeAuthModel}>
          <Close className=' text-white text-2xl' />
        </IconButton>
      </div>
      <div className=' flex items-center'>
        <h1 className=' p-2 bg-white flex-1 uppercase text-base text-center rounded-xl'>
          login here
        </h1>
      </div>
      <div className=' flex gap-1 flex-col py-2'>
        <TextField
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.email ? "tomato" : "white", // Border color based on error
              },
              "&:hover fieldset": {
                borderColor: errors.email ? "tomato" : "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: errors.email ? "tomato" : "white", // Focused border color based on error
              },
            },
            "& .MuiInputLabel-root": {
              color: errors.email ? "tomato" : "white", // Label color based on error
            },
            "& .MuiInputBase-input": {
              color: "white", // Input text color
            },
          }}
          className=' flex-1'
          label='Email address*'
          variant='outlined'
          name='email'
          {...register("email")}
        />
      </div>
      <div className=' flex gap-1 flex-col text-white'>
        <TextField
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.password ? "tomato" : "white", // Border color based on error
              },
              "&:hover fieldset": {
                borderColor: errors.password ? "tomato" : "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: errors.password ? "tomato" : "white", // Focused border color based on error
              },
            },
            "& .MuiInputLabel-root": {
              color: errors.password ? "tomato" : "white", // Label color based on error
            },
            "& .MuiInputBase-input": {
              color: "white", // Input text color
            },
          }}
          className=' flex-1 text-white border-white outline-none placeholder:text-white'
          label='password*'
          type='password'
          variant='outlined'
          name='password'
          {...register("password")}
        />
      </div>
      <div className=' flex items-center text-white'>
        <button
          disabled={isSubmitting}
          className=' p-2 capitalize text-center cursor-pointer bg-golden rounded-lg flex-1'
        >
          {isSubmitting ? <LoadingAnimation /> : "sign in"}
        </button>
      </div>
      <div className=' flex items-center text-white flex-col'>
        <p className=' font-bold '>
          Don&apos;t have an account?{" "}
          <span
            className=' underline text-golden cursor-pointer px-1'
            onClick={() => toggleLogin(false)}
          >
            sign in
          </span>
          here
        </p>
        <p>Or</p>
        <p className=' text-lg italic'> sign up with</p>
      </div>
      <div className=' flex items-center justify-center'>
        <Tooltip arrow title='login with google'>
          <IconButton>
            <Image src='/google.png' alt='google' width={70} height={70} />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title='login with github'>
          <IconButton>
            <Image src='/google.png' alt='google' width={70} height={70} />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title='login with facebook'>
          <IconButton>
            <Image src='/google.png' alt='google' width={70} height={70} />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title='login with twitter'>
          <IconButton>
            <Image src='/google.png' alt='google' width={70} height={70} />
          </IconButton>
        </Tooltip>
      </div>
      <div className=' flex items-center text-white flex-col'>
        <p className=' text-golden text-sm italic'>
          {" "}
          &copy; All right reserved.godie {new Date().getUTCFullYear()}{" "}
        </p>
      </div>
    </form>
  );
};

export default Login;
