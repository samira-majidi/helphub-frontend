"use client";

import React, { useState } from "react";
import { AutoUploadInput } from "./AutoUploadInput";


export default function SimpleUploadForm() {
  const [roomImageId, setRoomImageId] = useState<string | null>(null);

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg border bg-gray-50 p-6 shadow-md">

      <AutoUploadInput
        label="Image"
        onUploadSuccess={(id) => setRoomImageId(id)}
      />

      {roomImageId !== null && (
        <div className="mt-4 rounded-md border border-green-400 bg-green-100 p-3 text-center text-green-700">
          <p className="text-sm font-medium">
            Uploaded File ID: {roomImageId}
          </p>
        </div>
      )}
    </div>
  );
}