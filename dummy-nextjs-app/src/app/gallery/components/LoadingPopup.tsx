import { FC } from "react";

interface LoadingPopupProps {
    isVisible: boolean;
    close: () => void;
}

export const LoadingPopup: FC<LoadingPopupProps> = ({ isVisible, close }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#171717] p-6 rounded-lg shadow-lg text-center">
            <div className="text-[#ededed] font-semibold text-lg mb-4">
              Generating image, please wait...
            </div>
            <div className="loader ring-spinner"></div>
            <button
              className="absolute top-2 right-2 text-white bg-transparent p-2 rounded-full hover:bg-[#444]"
              onClick={close}
            >
              X
            </button>
          </div>
        </div>
      );
};