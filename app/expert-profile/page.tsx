// فایل: app/expert/profile/page.tsx (یا مسیر دلخواهت)

import ExpertProfile from "@/entities/expert/ui/ExpertProfile";
import { ExpertProfileForm } from "@/entities/expert/ui/ExpertProfileForm";
import { ExpertStatusManager } from "@/entities/expert/ui/ExpertStatusManager";
import ExpertSearchPage from "@/features/ExpertSearchFilter/ui/ExpertSearchPage";

export default function ExpertProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        {/* می‌تونی هدر یا اطلاعات دیگه‌ای هم اینجا اضافه کنی */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">تکمیل پروفایل متخصص</h1>
          <p className="text-gray-500 mt-2">لطفاً اطلاعات تخصصی خود را برای حضور در HelpHub تکمیل کنید.</p>
        </div>

        {/* فراخوانی کامپوننت فرم */}
        <ExpertProfileForm />

        <ExpertProfile/>
        <ExpertStatusManager/>
        <ExpertSearchPage/>
    
      </div>
    </main>
  );
}

