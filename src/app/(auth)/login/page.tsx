"use client";

import { useLogin } from "@/api/auth/AuthHook";
import AuthForm, { AuthFormData } from "@/shared/components/form/AuthForm";
import { NextPage } from "next";
import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
type LoginFormData = Required<Pick<AuthFormData, "email" | "password">>;
const Login: NextPage = () => {
  const [formValues, setFormValues] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const methods = useForm<LoginFormData>({ defaultValues: formValues });
  const { mutate, isPending } = useLogin();

  const handleSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setFormValues(data);
    methods.reset(data);
    mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <AuthForm
          category="login"
          onSubmit={handleSubmit}
          isPending={isPending}
        />
      </FormProvider>
    </>
  );
};

export default Login;
