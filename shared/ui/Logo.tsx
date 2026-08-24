import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link 
      href="/" 
      className={`flex items-center gap-2 text-white ${className}`}
    >
      <div className="w-9 h-9 border-2 border-yellow-400 rounded-lg flex items-center justify-center rotate-45 bg-[#111A3A]/50 shrink-0">
        <span className="-rotate-45 font-bold text-yellow-400 text-lg">H</span>
      </div>
      <span className="font-bold text-lg tracking-wide hidden sm:block">
        HelpHub
      </span>
    </Link>
  );
}
