"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export default function UploadPage() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div>
      <h1>Upload Image to Cloudinary</h1>
      <CldUploadWidget
        uploadPreset="my_upload_preset" // Replace with your upload preset
        onSuccess={(result) => {
          setImageUrl(result.info.secure_url);
        }}
      >
        {({ open }) => (
          <button onClick={() => open()}>Upload an Image</button>
        )}
      </CldUploadWidget>

      {imageUrl && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={imageUrl} alt="Uploaded" width="500" />
        </div>
      )}
    </div>
  );
}