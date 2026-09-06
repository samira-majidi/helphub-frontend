import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { CreateExpertPayload, UpdateExpertPayload } from "../types/experts.types";
import { createExpertProfile, deleteExpertProfile, updateExpertProfile } from "../api/expert.api";

// 1. Hook for creating a new profile (Create)
export const useCreateExpert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExpertPayload) => createExpertProfile(data),
    onSuccess: () => {
      toast.success("Expert profile created successfully! 🎉");
      // Refresh the cache to get the new data
      queryClient.invalidateQueries({ queryKey: ["expertProfile"] });
    },
    onError: (error) => {
      console.error("Create Expert Error:", error);
      toast.error("Something went wrong while creating the profile. 😢");
    },
  });
};

// 2. Hook for editing the profile (Update)
export const useUpdateExpert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateExpertPayload) => updateExpertProfile(data),
    onSuccess: () => {
      toast.success("Expert profile updated successfully! ✨");
      queryClient.invalidateQueries({ queryKey: ["expertProfile"] });
    },
    onError: (error) => {
      console.error("Update Expert Error:", error);
      toast.error("Something went wrong while updating the profile. 😢");
    },
  });
  };
  
  export const useDeleteExpert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteExpertProfile(),
    onSuccess: () => {
      toast.success("Your profile has been deleted successfully! 🗑️");
      // Clear the cache so the component re-renders and shows that the profile doesn't exist
      queryClient.invalidateQueries({ queryKey: ["expertProfile"] });
    },
    onError: (error) => {
      console.error("Delete Expert Error:", error);
      toast.error("Failed to delete the profile. 😢");
    },
  });
};
