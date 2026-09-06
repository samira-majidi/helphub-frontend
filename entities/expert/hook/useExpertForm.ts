import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { useCreateExpert, useUpdateExpert } from "../hook/useExpertMutations";
import { CreateExpertPayload, ExpertProfileData } from "../types/experts.types";
import { ExpertFormValues, expertFormSchema } from "../model/expertForm.schema";
import { mapFormValuesToPayload, mapInitialDataToFormValues } from "../model/mapping-expert-data";

interface UseExpertFormProps {
  expertId?:string;
  initialData?: ExpertProfileData;
  onSuccessCallback?: () => void;
}

export const useExpertForm = ({ expertId, initialData, onSuccessCallback }: UseExpertFormProps) => {
  const { mutateAsync: createExpert, isPending: isCreating } = useCreateExpert();
  const { mutateAsync: updateExpert, isPending: isUpdating } = useUpdateExpert();
  
  const isEditing = Boolean(expertId);

  // فرم فقط مقادیر تمیز رو دریافت می‌کنه
  const methods = useForm<ExpertFormValues>({
    resolver: zodResolver(expertFormSchema),
    defaultValues: mapInitialDataToFormValues(initialData),
  });

  const handleUploadSuccess = (imageId: string) => {
    const numericId = parseInt(imageId, 10);
    if (!isNaN(numericId)) {
      const currentImages = methods.getValues("imageIds") || [];
      methods.setValue("imageIds", [...currentImages, numericId], {
        shouldValidate: true,
        shouldDirty: true,
      });
      toast.success("عکس با موفقیت آپلود و اضافه شد! 📸");
    }
  };

  const onSubmit = async (data: ExpertFormValues) => {
    // تبدیل تمیز دیتا به پی‌لود
    const payload = mapFormValuesToPayload(data);
console.log("🚀 Payload for Backend:", JSON.stringify(payload, null, 2)); // اینو اضافه کن تا دیتا رو مرتب ببینی
  
    if (isEditing) {
      await updateExpert(payload);
    } else {
      await createExpert(payload as CreateExpertPayload);
    }

    onSuccessCallback?.();
  };

  return {
    methods,
    isSubmitting: isCreating || isUpdating,
    isEditing,
    handleUploadSuccess,
    onSubmit: methods.handleSubmit(onSubmit),
  };
};
