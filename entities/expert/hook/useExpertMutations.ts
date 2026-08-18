
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { CreateExpertPayload, UpdateExpertPayload } from "../types/experts.types";
import { createExpertProfile, deleteExpertProfile, updateExpertProfile } from "../api/expert.api";

// ۱. هوک برای ثبت پروفایل جدید (Create)
export const useCreateExpert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExpertPayload) => createExpertProfile(data),
    onSuccess: () => {
      toast.success("پروفایل متخصص با موفقیت ساخته شد! 🎉");
      // رفرش کردن کش برای دریافت اطلاعات جدید
      queryClient.invalidateQueries({ queryKey: ["expertProfile"] });
    },
    onError: (error) => {
      console.error("Create Expert Error:", error);
      toast.error("مشکلی در ثبت اطلاعات پیش آمد. 😢");
    },
  });
};

// ۲. هوک برای ویرایش پروفایل (Update)
export const useUpdateExpert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateExpertPayload) => updateExpertProfile(data),
    onSuccess: () => {
      toast.success("پروفایل متخصص با موفقیت به‌روزرسانی شد! ✨");
      queryClient.invalidateQueries({ queryKey: ["expertProfile"] });
    },
    onError: (error) => {
      console.error("Update Expert Error:", error);
      toast.error("مشکلی در ویرایش اطلاعات پیش آمد. 😢");
    },
  });
  };
  export const useDeleteExpert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteExpertProfile(),
    onSuccess: () => {
      toast.success("پروفایل شما با موفقیت حذف شد! 🗑️");
      // پاک کردن کش برای اینکه کامپوننت دوباره رندر بشه و بگه پروفایل وجود نداره
      queryClient.invalidateQueries({ queryKey: ["expertProfile"] });
    },
    onError: (error) => {
      console.error("Delete Expert Error:", error);
      toast.error("خطا در حذف پروفایل. 😢");
    },
  });
};
