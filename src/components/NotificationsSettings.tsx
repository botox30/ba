import React, { useState } from 'react';

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
        onClick={onChange}
        className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
            checked ? 'bg-[#03418a]' : 'bg-gray-300'
        }`}
    >
        <div
            className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                checked ? 'translate-x-6' : 'translate-x-0'
            }`}
        />
    </button>
);

type NotificationItem = {
    key: keyof typeof defaultSettings;
    title: string;
    description: string;
};

const defaultSettings = {
    documents: true,
    pesel: true,
    ePayments: true,
    safeInternet: false,
    info: true,
};

const notificationOptions: NotificationItem[] = [
    {
        key: 'documents',
        title: 'Dokumenty',
        description:
            'Powiadomienia na przykład o możliwości odbioru, zbliżającym się końcu ważności czy unieważnieniu dokumentu.',
    },
    {
        key: 'pesel',
        title: 'Zastrzeż PESEL',
        description:
            'Powiadomienia o zastrzeżeniu, cofnięciu zastrzeżenia i weryfikacji numeru PESEL.',
    },
    {
        key: 'ePayments',
        title: 'ePłatności',
        description: 'Powiadomienie o nowych płatnościach i ich statusach.',
    },
    {
        key: 'safeInternet',
        title: 'Bezpiecznie w sieci',
        description: 'Powiadomienia o aktualnych zagrożeniach w internecie.',
    },
    {
        key: 'info',
        title: 'Informacyjne',
        description:
            'Powiadomienia na przykład o nowościach, zmianach czy przerwach technicznych w aplikacji.',
    },
];

const NotificationOption = ({
                                title,
                                description,
                                value,
                                onToggle,
                            }: {
    title: string;
    description: string;
    value: boolean;
    onToggle: () => void;
}) => (
    <div className="flex justify-between items-start bg-white p-4 rounded-xl shadow-sm mb-3">
        <div className="pr-4 max-w-[calc(100%-60px)]">
            <h2 className="text-[15px] font-semibold">{title}</h2>
            <p className="text-xs text-gray-700">{description}</p>
        </div>
        <Toggle checked={value} onChange={onToggle} />
    </div>
);

const NotificationsSettings: React.FC = () => {
    const [settings, setSettings] = useState(defaultSettings);

    const toggle = (key: keyof typeof settings) =>
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

    return (
        <div className="p-4 max-w-md mx-auto">
            <p className="text-[12px] text-gray-600 mb-6 leading-relaxed">
                Możesz wybrać powiadomienia, które chcesz dostawać.
            </p>

            {notificationOptions.slice(0, 1).map((item) => (
                <NotificationOption
                    key={item.key}
                    title={item.title}
                    description={item.description}
                    value={settings[item.key]}
                    onToggle={() => toggle(item.key)}
                />
            ))}

            <h2 className="text-[15pxs] font-bold text-black-900 mt-6 mb-2">Usługi</h2>

            {notificationOptions.slice(1, 4).map((item) => (
                <NotificationOption
                    key={item.key}
                    title={item.title}
                    description={item.description}
                    value={settings[item.key]}
                    onToggle={() => toggle(item.key)}
                />
            ))}

            <h2 className="text-[15pxs] font-bold text-black-900 mt-6 mb-2">Pozostałe</h2>

            {notificationOptions.slice(4).map((item) => (
                <NotificationOption
                    key={item.key}
                    title={item.title}
                    description={item.description}
                    value={settings[item.key]}
                    onToggle={() => toggle(item.key)}
                />
            ))}

            <div className="bg-blue-100 p-4 rounded-[15px] flex items-start gap-3 mt-4">
                <img
                    src="https://imgur.com/N0Q23HK.png"
                    alt="Info Ikona"
                    className="w-5 h-5 mt-1"
                />
                <div className="text-sm text-black-600">
                    <h2 className="font-semibold text-gray-900 text-[16px]">Powiadomienia z profilu zaufanego</h2>
                    <p>
                        Aby nimi zarządzać, zaloguj się na swoje konto na pz.gov.pl
                    </p>
                    <p className="font-semibold text-[#03418a] mt-1">
                        Przejdź do pz.gov.pl
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotificationsSettings;
