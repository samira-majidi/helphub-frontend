'use client';

import { useState, useRef } from 'react';
import { uploadFile } from '@/shared/services/upload.service';
import { VoiceRecorderUI } from './VoiceRecorderUI';

interface VoiceRecorderProps {
  onUploadSuccess: (fileId: string) => void;
  isPrivate?: boolean;
}

export const VoiceRecorder = ({ onUploadSuccess, isPrivate = true }: VoiceRecorderProps) => {
  const [isRecordingMode, setIsRecordingMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  // این رفرنس برای تشخیص اینه که کاربر ویس رو کنسل کرده یا ارسال کرده
  const isCancelledRef = useRef<boolean>(false);

  const startRecording = async () => {
    try {
      isCancelledRef.current = false; // ریست کردن وضعیت لغو در شروع مجدد
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // اگر ویس کنسل شده بود، هیچ کاری نکن و خارج شو
        if (isCancelledRef.current) return; 

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await uploadAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecordingMode(true);
    } catch (error) {
      console.error('❌ خطا در دسترسی به میکروفون:', error);
      alert('لطفاً دسترسی به میکروفون را مجاز کنید.');
    }
  };

  // متد مشترک برای متوقف کردن ضبط و خاموش کردن میکروفون
  const stopMediaRecorder = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
  };

  const cancelRecording = () => {
    isCancelledRef.current = true; // علامت‌گذاری به عنوان لغو شده
    stopMediaRecorder();
    setIsRecordingMode(false);
  };

  const sendRecording = () => {
    isCancelledRef.current = false; // علامت‌گذاری برای ارسال
    stopMediaRecorder();
    setIsRecordingMode(false);
  };

  const uploadAudio = async (blob: Blob) => {
    setIsUploading(true);
    try {
      const audioFile = new File([blob], 'voice-message.webm', { type: 'audio/webm' });
      const uploadedFileId = await uploadFile(audioFile, isPrivate);
      
      if (uploadedFileId) {
        onUploadSuccess(uploadedFileId);
      }
    } catch (error) {
      console.error('❌ خطا در آپلود ویس:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // اگر در حال ضبط هستیم، رابط کاربری تلگرامی رو نشون بده
  if (isRecordingMode) {
    return <VoiceRecorderUI onCancel={cancelRecording} onSend={sendRecording} />;
  }

  // اگر در حال ضبط نیستیم، همون دکمه میکروفون رو با استایل هماهنگ با فیلد چت نشون بده
  return (
    <button
      type="button"
      onClick={startRecording}
      disabled={isUploading}
      className="w-full h-full flex items-center justify-center rounded-xl transition-colors text-gray-500 hover:text-[#1a2438] disabled:opacity-50"
      title="شروع ضبط صدا"
    >
      {isUploading ? (
        <span className="animate-spin text-sm">⏳</span>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )}
    </button>
  );
};
