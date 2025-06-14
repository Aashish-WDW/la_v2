import React from 'react';

const CurvedBottomBanner: React.FC = () => {
    return (
        <div className="relative w-[319px] h-[20px]">
            <svg
                width="319"
                height="20"
                viewBox="0 0 319 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 left-0 w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
            >
                <path
                    d="M319 0H-2.68221e-06L61.1911 19.0923C63.1196 19.6939 65.128 20 67.1481 20H253.761C255.843 20 257.911 19.6751 259.893 19.037L319 0Z"
                    fill="white"
                />
            </svg>
        </div>
    );
};

export default CurvedBottomBanner;
