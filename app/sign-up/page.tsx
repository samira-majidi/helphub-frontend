"use client";
import { useState } from "react";
import { Home, Wrench, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation"; 
import { SignUpForm } from "@/features/auth/ui/signupForm";
import Logo from "@/shared/ui/Logo";
import { SignInForm } from "@/features/auth/ui/SignInForm";

export default function AuthPage() {
  const [role, setRole] = useState<"client" | "professional">("client");
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter(); 

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#070D1F] font-sans selection:bg-yellow-400/30 selection:text-yellow-200">
  
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 pt-24 lg:pt-8 lg:p-8 xl:p-12 relative z-10">
        <Logo className="absolute top-6 left-6 lg:top-8 lg:left-8 z-50" />

        <div className="w-full max-w-[400px]">
       
          {!isLogin && (
            <div className="text-center mb-9 lg:mb-8">
              <h2 className="text-[24px] lg:text-[28px] font-bold font-serif text-white mb-3 tracking-tight">
                Welcome to HelpHub
              </h2>
              <p className="text-[#94A3B8] text-[12px] lg:text-[13px] leading-relaxed mx-auto">
                Sign up to get started and find the best services.
              </p>
            </div>
          )}

     
          <div className="w-full lg:hidden mb-6 flex space-x-2 bg-[#111A3A] p-1.5 rounded-2xl">
            <button
              onClick={() => setRole("client")}
              className={`flex-1 py-2 rounded-xl text-[13px] font-semibold transition-all ${role === "client" ? "bg-yellow-400 text-[#070D1F] shadow-md" : "text-gray-400 hover:text-white"}`}
            >
              Client
            </button>
            <button
              onClick={() => setRole("professional")}
              className={`flex-1 py-2 rounded-xl text-[13px] font-semibold transition-all ${role === "professional" ? "bg-yellow-400 text-[#070D1F] shadow-md" : "text-gray-400 hover:text-white"}`}
            >
              Professional
            </button>
          </div>

          {isLogin ? (
  <SignInForm 
    onSuccess={() => {
      router.push("/");
      router.refresh(); 
    }} 
  />
) : (
  <SignUpForm 
    role={role} 
    onSuccess={() => {
      router.push("/");
      router.refresh(); 
    }} 
  />
)}

          <p className="mt-6 text-center text-gray-400 text-[13px] lg:text-[14px]">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors underline-offset-4 hover:underline"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-[#0B132B] flex-col justify-center items-center p-8 border-l border-white/5 relative overflow-hidden">
        
        <div className="absolute top-[-15%] right-[-10%] w-[450px] h-[450px] bg-yellow-400/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-15%] left-[-10%] w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="text-center mb-10 z-10">
          <h1 className="text-3xl xl:text-4xl font-bold font-serif text-white mb-3 tracking-tight">
            Choose your role
          </h1>
          <p className="text-[#94A3B8] text-[15px] xl:text-[16px] max-w-sm mx-auto">
            Select the option that best describes you to get started.
          </p>
        </div>

        <div
          className="flex gap-5 xl:gap-6 z-10"
          style={{ perspective: "1000px" }}
        >
          <div
            onClick={() => setRole("client")}
            style={{ transformStyle: "preserve-3d" }}
            className={`group cursor-pointer w-[230px] xl:w-[250px] h-[280px] xl:h-[300px] rounded-[28px] p-6 flex flex-col items-center justify-center text-center transition-all duration-500 ease-out border-2 relative
              ${
                role === "client"
                  ? "border-yellow-400 bg-[#111A3A] -translate-y-3 shadow-[0_15px_50px_-15px_rgba(250,204,21,0.4)]"
                  : "border-white/5 bg-[#111A3A]/40 hover:bg-[#111A3A]/70 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.1)]"
              }
              active:scale-95 active:rotate-x-12 active:shadow-none
            `}
          >
            <div
              className={`absolute inset-0 rounded-[26px] transition-opacity duration-500 bg-gradient-to-b from-yellow-400/10 to-transparent ${role === "client" ? "opacity-100" : "opacity-0"}`}
            ></div>

            <div
              className={`relative z-10 w-24 h-24 rounded-2xl mb-6 flex items-center justify-center transition-all duration-500 ease-out
                ${
                  role === "client"
                    ? "bg-yellow-400/20 shadow-[0_0_35px_rgba(250,204,21,0.4)] -translate-y-2 scale-110"
                    : "bg-[#070D1F] group-hover:bg-[#070D1F]/80"
                }
              `}
              style={{
                transform:
                  role === "client" ? "translateZ(30px)" : "translateZ(0px)",
              }}
            >
              <Home
                size={48}
                className={`transition-all duration-500 ${role === "client" ? "text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]" : "text-gray-500 group-hover:text-gray-300"}`}
                strokeWidth={1.5}
              />
            </div>

            <h3
              className="relative z-10 text-xl font-bold text-white mb-2 transition-transform duration-500"
              style={{
                transform:
                  role === "client" ? "translateZ(15px)" : "translateZ(0px)",
              }}
            >
              Client
            </h3>
            <p
              className="relative z-10 text-gray-400 text-[14px] px-2 transition-transform duration-500"
              style={{
                transform:
                  role === "client" ? "translateZ(8px)" : "translateZ(0px)",
              }}
            >
              I need a service for my home
            </p>
          </div>

          <div
            onClick={() => setRole("professional")}
            style={{ transformStyle: "preserve-3d" }}
            className={`group cursor-pointer w-[230px] xl:w-[250px] h-[280px] xl:h-[300px] rounded-[28px] p-6 flex flex-col items-center justify-center text-center transition-all duration-500 ease-out border-2 relative
              ${
                role === "professional"
                  ? "border-yellow-400 bg-[#111A3A] -translate-y-3 shadow-[0_15px_50px_-15px_rgba(250,204,21,0.4)]"
                  : "border-white/5 bg-[#111A3A]/40 hover:bg-[#111A3A]/70 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.1)]"
              }
              active:scale-95 active:rotate-x-12 active:shadow-none
            `}
          >
            <div
              className={`absolute inset-0 rounded-[26px] transition-opacity duration-500 bg-gradient-to-b from-yellow-400/10 to-transparent ${role === "professional" ? "opacity-100" : "opacity-0"}`}
            ></div>

            <div
              className={`relative z-10 w-24 h-24 rounded-2xl mb-6 flex items-center justify-center transition-all duration-500 ease-out
                ${
                  role === "professional"
                    ? "bg-yellow-400/20 shadow-[0_0_35px_rgba(250,204,21,0.4)] -translate-y-2 scale-110"
                    : "bg-[#070D1F] group-hover:bg-[#070D1F]/80"
                }
              `}
              style={{
                transform:
                  role === "professional"
                    ? "translateZ(30px)"
                    : "translateZ(0px)",
              }}
            >
              <Wrench
                size={48}
                className={`transition-all duration-500 ${role === "professional" ? "text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]" : "text-gray-500 group-hover:text-gray-300"}`}
                strokeWidth={1.5}
              />
            </div>

            <h3
              className="relative z-10 text-xl font-bold text-white mb-2 transition-transform duration-500"
              style={{
                transform:
                  role === "professional"
                    ? "translateZ(15px)"
                    : "translateZ(0px)",
              }}
            >
              Professional
            </h3>
            <p
              className="relative z-10 text-gray-400 text-[14px] px-2 transition-transform duration-500"
              style={{
                transform:
                  role === "professional"
                    ? "translateZ(8px)"
                    : "translateZ(0px)",
              }}
            >
              I provide services to clients
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 xl:gap-8 mt-12 z-10">
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={18}
              className="text-yellow-400"
              fill="rgba(250,204,21,0.2)"
            />
            <span className="text-gray-300 text-[14px] font-medium tracking-wide">
              Secure
            </span>
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={18}
              className="text-yellow-400"
              fill="rgba(250,204,21,0.2)"
            />
            <span className="text-gray-300 text-[14px] font-medium tracking-wide">
              Fast setup
            </span>
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={18}
              className="text-yellow-400"
              fill="rgba(250,204,21,0.2)"
            />
            <span className="text-gray-300 text-[14px] font-medium tracking-wide">
              Built for you
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
