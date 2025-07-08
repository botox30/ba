import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import {getUser} from "../utils/auth.tsx";

const QRCodeActions = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            if (user?.id) {
                setUserId(user.id);
            }
        };
        fetchUser();
    }, []);

    if (!userId) return null;

    return (
        <div className="px-4 space-y-3 mt-6">
            <div
                onClick={() => navigate(`/${userId}/qrcode/scan`)}
                className="cursor-pointer bg-white rounded-xl shadow-sm p-4 flex items-center justify-between border border-gray-200 hover:bg-gray-50 transition"
            >
                <div className="flex items-center space-x-3">
                    <img
                        src="https://imgur.com/PDXktEx.png"
                        alt="QR Scan Icon"
                        className="w-6 h-6"
                    />
                    <div>
                        <p className="text-[16px] font-semibold text-gray-900">Zeskanuj kod QR</p>
                        <p className="text-sm text-gray-500">Zaloguj się lub potwierdź swoje dane.</p>
                    </div>
                </div>
                <span className="text-gray-400 text-xl">{'>'}</span>
            </div>
            <div
                onClick={() => navigate('/${userId}/qrcode/show')}
                className="cursor-pointer bg-white rounded-xl shadow-sm p-4 flex items-center justify-between border border-gray-200 hover:bg-gray-50 transition"
            >
                <div className="flex items-center space-x-3">
                    <img
                        src="https://imgur.com/DbM6zYx.png"
                        alt="Show QR Icon"
                        className="w-6 h-6"
                    />
                    <div>
                        <p className="text-[16px] font-semibold text-gray-900">Pokaż kod QR</p>
                        <p className="text-sm text-gray-500">Sprawdź dokument innej osoby.</p>
                    </div>
                </div>
                <span className="text-gray-400 text-xl">{'>'}</span>
            </div>
        </div>
    );
};

export default QRCodeActions;
