"use client";
import { useRef, useState, useEffect } from "react";
import { FiCamera, FiCreditCard, FiFileText, FiX } from "react-icons/fi";

export function UploadField({ label }: { label: string }) {
  const frontFileInputRef = useRef<HTMLInputElement>(null);
  const backFileInputRef = useRef<HTMLInputElement>(null);
  const passportFileInputRef = useRef<HTMLInputElement>(null);
  const [documentType, setDocumentType] = useState<"nid" | "passport" | null>(
    null
  );
  const [selectedFiles, setSelectedFiles] = useState<{
    front?: File;
    back?: File;
    passport?: File;
  }>({});
  const [filePreviews, setFilePreviews] = useState<{
    front?: string;
    back?: string;
    passport?: string;
  }>({});

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(filePreviews).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [filePreviews]);

  const handleButtonClick = (fileType: "front" | "back" | "passport") => {
    if (fileType === "front") {
      frontFileInputRef.current?.click();
    } else if (fileType === "back") {
      backFileInputRef.current?.click();
    } else if (fileType === "passport") {
      passportFileInputRef.current?.click();
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: "front" | "back" | "passport"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(`Selected file for ${fileType}:`, file.name);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);

      // Update the selected files and previews
      setSelectedFiles((prev) => ({ ...prev, [fileType]: file }));
      setFilePreviews((prev) => ({ ...prev, [fileType]: previewUrl }));
    }
  };

  const removeFile = (fileType: "front" | "back" | "passport") => {
    // Cleanup preview URL
    if (filePreviews[fileType]) {
      URL.revokeObjectURL(filePreviews[fileType]!);
    }

    // Remove file and preview
    setSelectedFiles((prev) => ({ ...prev, [fileType]: undefined }));
    setFilePreviews((prev) => ({ ...prev, [fileType]: undefined }));
  };

  const FilePreview = ({
    file,
    previewUrl,
    fileType,
  }: {
    file: File;
    previewUrl: string;
    fileType: "front" | "back" | "passport";
  }) => (
    <div className="relative group">
      <div className="w-full aspect-[16/9] rounded-lg overflow-hidden border border-slate-200 ">
        <img
          src={previewUrl}
          alt={`Preview of ${file.name}`}
          className="w-full h-full object-cover"
        />
      </div>
      <button
        type="button"
        onClick={() => removeFile(fileType)}
        className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
      >
        <FiX className="w-3 h-3" />
      </button>
    </div>
  );

  if (!documentType) {
    return (
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-800 ">
          {label}
        </label>
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setDocumentType("nid")}
            className="w-full p-4 border-2 border-slate-200  rounded-xl bg-white  hover:border-[#199980]  hover:bg-slate-50  transition-all duration-200 flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#199980]  text-white flex items-center justify-center">
              <FiCreditCard className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-medium text-slate-900 ">
                National ID (NID)
              </p>
              <p className="text-sm text-slate-600 ">
                Upload front and back
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setDocumentType("passport")}
            className="w-full p-4 border-2 border-slate-200  rounded-xl bg-white  hover:border-[#199980]  hover:bg-slate-50  transition-all duration-200 flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#199980]  text-white flex items-center justify-center">
              <FiFileText className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-medium text-slate-900 ">
                Passport
              </p>
              <p className="text-sm text-slate-600 ">
                Upload passport page
              </p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (documentType === "nid") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-slate-800 ">
            NID Documents
          </label>
          <button
            type="button"
            onClick={() => setDocumentType(null)}
            className="text-sm text-[#199980]  hover:text-[#158066]  transition-colors"
          >
            Change type
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {/* NID Front */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700 ">
              Front Side
            </label>
            {selectedFiles.front ? (
              <FilePreview
                file={selectedFiles.front}
                previewUrl={filePreviews.front!}
                fileType="front"
              />
            ) : (
              <button
                type="button"
                onClick={() => handleButtonClick("front")}
                className="w-full h-20 border-2 border-dashed border-slate-300  rounded-lg bg-slate-50  hover:bg-slate-100  hover:border-[#199980]  transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <div className="w-8 h-8 rounded-full bg-[#199980]  text-white flex items-center justify-center">
                  <FiCamera className="w-4 h-4" />
                </div>
                <span className="text-sm text-slate-700 ">
                  Upload front
                </span>
              </button>
            )}
          </div>

          {/* NID Back */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700 ">
              Back Side
            </label>
            {selectedFiles.back ? (
              <FilePreview
                file={selectedFiles.back}
                previewUrl={filePreviews.back!}
                fileType="back"
              />
            ) : (
              <button
                type="button"
                onClick={() => handleButtonClick("back")}
                className="w-full h-20 border-2 border-dashed border-slate-300  rounded-lg bg-slate-50  hover:bg-slate-100  hover:border-[#199980]  transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <div className="w-8 h-8 rounded-full bg-[#199980]  text-white flex items-center justify-center">
                  <FiCamera className="w-4 h-4" />
                </div>
                <span className="text-sm text-slate-700 ">
                  Upload back
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Hidden file input for front */}
        <input
          ref={frontFileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e, "front")}
        />

        {/* Hidden file input for back */}
        <input
          ref={backFileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e, "back")}
        />
      </div>
    );
  }

  if (documentType === "passport") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-slate-800 ">
            Passport Document
          </label>
          <button
            type="button"
            onClick={() => setDocumentType(null)}
            className="text-sm text-[#199980]  hover:text-[#158066]  transition-colors"
          >
            Change type
          </button>
        </div>

        {selectedFiles.passport ? (
          <FilePreview
            file={selectedFiles.passport}
            previewUrl={filePreviews.passport!}
            fileType="passport"
          />
        ) : (
          <button
            type="button"
            onClick={() => handleButtonClick("passport")}
            className="w-full h-32 border-2 border-dashed border-slate-300  rounded-xl bg-slate-50  hover:bg-slate-100  hover:border-[#199980]  transition-all duration-200 flex flex-col items-center justify-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-full bg-[#199980]  text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <FiCamera className="w-6 h-6" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-800  group-hover:text-[#199980]  transition-colors">
                Upload passport
              </p>
              <p className="text-xs text-slate-600  mt-1">
                JPG, PNG only
              </p>
            </div>
          </button>
        )}

        {/* Hidden file input for passport */}
        <input
          ref={passportFileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e, "passport")}
        />
      </div>
    );
  }

  return null;
}
