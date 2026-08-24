"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useRegisterSpecialist } from "../hooks/useRegisterspecialist";
import { useSignUp } from "../hooks/useSignUp";



const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface SignUpFormProps {
  role: "client" | "professional";
  onSuccess?: (name: string) => void;
}

export const SignUpForm = ({ role, onSuccess }: SignUpFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const {
    registerSpecialist,
    loading: specialistLoading,
    error: specialistError,
  } = useRegisterSpecialist({
    onSuccess: () => {
      if (onSuccess) onSuccess(getValues("name"));
    },
  });

  const {
    signUpUser,
    loading: clientLoading,
    error: clientError,
  } = useSignUp({
    onSuccess: () => {
      if (onSuccess) onSuccess(getValues("name"));
    },
  });

  const isFormLoading =
    role === "professional" ? specialistLoading : clientLoading;
  const currentError = role === "professional" ? specialistError : clientError;

  const onSubmit = async (data: RegisterFormData) => {
    if (role === "professional") {
      await registerSpecialist(data as any);
    } else {
      await signUpUser(data as any);
    }
  };

  return (
    <div className="flex flex-col w-full bg-transparent p-0">
      {currentError && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-2.5 rounded-xl mb-4 text-[13px] text-center">
          {currentError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex gap-3">
          <div className="w-1/2 flex flex-col gap-1.5">
            <label className="text-white text-[13px] font-semibold">
              First Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <User size={16} className="text-[#64748B]" />
              </div>
              <input
                {...register("name")}
                placeholder="Enter your name"
                className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-white placeholder-[#64748B] focus:outline-none transition-all bg-transparent text-[14px] ${
                  errors.name
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-white/10 focus:border-yellow-400"
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-[11px] ml-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="w-1/2 flex flex-col gap-1.5">
            <label className="text-white text-[13px] font-semibold">
              Last Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <User size={16} className="text-[#64748B]" />
              </div>
              <input
                {...register("lastName")}
                placeholder="Enter last name"
                className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-white placeholder-[#64748B] focus:outline-none transition-all bg-transparent text-[14px] ${
                  errors.lastName
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-white/10 focus:border-yellow-400"
                }`}
              />
            </div>
            {errors.lastName && (
              <p className="text-red-400 text-[11px] ml-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-white text-[13px] font-semibold">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Mail size={16} className="text-[#64748B]" />
            </div>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-white placeholder-[#64748B] focus:outline-none transition-all bg-transparent text-[14px] ${
                errors.email
                  ? "border-red-500/50 focus:border-red-500"
                  : "border-white/10 focus:border-yellow-400"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-[11px] ml-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-white text-[13px] font-semibold">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock size={16} className="text-[#64748B]" />
            </div>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`w-full pl-9 pr-10 py-2.5 border rounded-xl text-white placeholder-[#64748B] focus:outline-none transition-all bg-transparent text-[14px] ${
                errors.password
                  ? "border-red-500/50 focus:border-red-500"
                  : "border-white/10 focus:border-yellow-400"
              }`}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer text-[#64748B] hover:text-yellow-400 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
          {errors.password && (
            <p className="text-red-400 text-[11px] ml-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-1">
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => setRememberMe(!rememberMe)}
          >
            <div
              className={`w-8 h-4.5 rounded-full flex items-center p-0.5 transition-colors ${rememberMe ? "bg-yellow-400" : "bg-gray-600"}`}
            >
              <div
                className={`w-3.5 h-3.5 bg-white rounded-full transition-transform ${rememberMe ? "translate-x-3.5" : "translate-x-0"}`}
              />
            </div>
            <span className="text-[#94A3B8] text-[13px]">Remember me</span>
          </div>
          <a
            href="#"
            className="text-yellow-400 text-[13px] hover:text-yellow-300 transition-colors"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={isFormLoading}
          className="w-full mt-2 bg-yellow-400 text-[#070D1F] font-bold py-3 rounded-xl hover:bg-yellow-500 transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(250,204,21,0.2)] text-[15px]"
        >
          {isFormLoading ? "Processing..." : "Join HelpHub"}
        </button>
      </form>
    </div>
  );
};
