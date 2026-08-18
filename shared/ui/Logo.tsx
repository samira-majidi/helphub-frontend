import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    // className که از بیرون میاد رو اینجا اضافه می‌کنیم
    <Link href="/" className={`flex items-center ${className}`}>
      <Image 
        src="/logo.png" 
        alt="Hotel Logo"
        width={150}
        height={50}
        priority 
        // کلاس‌های نامعتبر رو با مقادیر استاندارد جایگزین کردم
        className="w-36 sm:w-40 md:w-44 lg:w-48 h-auto transition-all duration-300 object-contain"
      />
    </Link>
  );
}