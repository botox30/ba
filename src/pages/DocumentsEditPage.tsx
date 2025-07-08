import React from 'react';
import { useNavigate } from 'react-router-dom';

const DocumentsEditPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-full h-full bg-white px-4 pt-4">
            <div className="flex justify-end">
                <button
                    onClick={() => navigate(-1)}
                    className="text-[#007aff] font-medium text-[16px]"
                >
                    Zakończ
                </button>
            </div>
            <h1 className="text-[28px] font-black text-gray-900 mt-2 mb-1">Dokumenty</h1>
            <p className="text-sm text-gray-500 mb-6">Tutaj możesz zmieniać kolejność dokumentów.</p>
            <div>
                <h2 className="font-semibold text-[16px] text-gray-900 mb-2">Na pulpicie</h2>
                <div className="bg-[#f8f8f8] rounded-xl p-4 flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <button className="text-red-600 text-xl">−</button>
                        <span className="font-bold text-gray-800">Legitymacja szkolna</span>
                    </div>
                    <div className="text-gray-400">≡</div>
                </div>
            </div>
            <div>
                <h2 className="font-semibold text-[16px] text-gray-900 mb-2">Pozostałe</h2>
                <div className="bg-[#f8f8f8] rounded-xl p-4 text-center text-sm text-gray-600">
                    <p className="font-bold text-gray-800">
                        Chcesz mieć więcej dokumentów<br />w aplikacji?
                    </p>
                    <p>Użyj ikony z lewej strony nazwy dokumentu.</p>
                </div>
            </div>
        </div>
    );
};

export default DocumentsEditPage;