import { redirect } from 'next/navigation';
import { getServerUser } from '@/shared/utils/getServerUser';

// ایمپورت کلاینت کامپوننتی که در بالا نوشتیم
import RegisterSpecialistClient from '@/features/auth/register-specialist/ui/RegisterSpecialistClient';

export default async function RegisterSpecialistPage() {
  // گرفتن کاربر (بررسی اینکه آیا از قبل لاگین کرده یا نه)
  const user = await getServerUser();

  // اگه کاربر از قبل لاگین کرده، نیازی نیست صفحه ثبت‌نام رو ببینه
  if (user) {
    redirect('/dashboard');
  }

  // نمایش فرم ثبت‌نام برای کاربر جدید
  return <RegisterSpecialistClient />;
}
