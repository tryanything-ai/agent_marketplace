import { useId } from "react";

interface UploadFileProps {
  file: File | undefined;
  setFile: (file: File | undefined) => void;
  accept?: string;
  fileTypes?: string;
}

const UploadFile = ({ file, setFile, accept, fileTypes }: UploadFileProps) => {
  const id = useId();

  const onSetFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor={id}
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-primary border-dashed rounded-box cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mb-3 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-black text-center">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-black">{fileTypes}</p>
          </div>
          <input
            id={id}
            type="file"
            className="hidden"
            onChange={onSetFile}
            accept={accept}
          />
        </label>
      </div>
      {file && <p>{file.name}</p>}
    </>
  );
};

export default UploadFile;
