import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import {getUser} from "../utils/auth.tsx";

const NAV_HEIGHT = 60;

const ServicePage7: React.FC = () => {
    const location = useLocation();
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

    const from = location.state?.from || `/${userId}/services`;

    return (
        <motion.div
            className="flex flex-col h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <header className="sticky top-0 z-10 flex items-center justify-center px-4 py-4 bg-[#f3f4fb] shadow-sm relative">
                <Link
                    to={from}
                    className="flex items-center gap-1 text-[#03418a] font-medium cursor-pointer select-none absolute left-4 top-1/2 transform -translate-y-1/2"
                >
                    <img
                        src="https://fobywatel.net/assets/app/images/back_blue.png"
                        alt="Wróć"
                        className="w-5 h-5 -ml-3"
                    />
                    <span className="text-base md:text-lg">Usługi</span>
                </Link>

                <h1 className="text-base md:text-lg font-medium text-gray-900">
                    Polak za granicą
                </h1>
            </header>
            <section
                className="flex-1 px-6 mt-6 bg-white overflow-y-auto"
                style={{ paddingBottom: NAV_HEIGHT }}
            >
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                    Wybierz kraj
                </h2>

                <nav className="flex flex-col space-y-3 text-[14px]">
                    {[
                        "Afganistan","Albania","Algieria","Andora","Angola","Antigua i Barbuda","Arabia Saudyjska","Argentyna",
                        "Armenia","Australia","Austria","Azerbejdżan","Bahamy","Bahrajn","Bangladesz","Barbados","Belgia","Belize",
                        "Benin","Białoruś","Boliwia","Bośnia i Hercegowina","Botswana","Brazylia","Brunei","Bułgaria","Burkina Faso",
                        "Burundi","Chile","Chiny","Chorwacja","Cypr","Czad","Czechy","Dania","Demokratyczna Republika Konga",
                        "Dominika","Dominikana","Dżibuti","Egipt","Ekwador","Erytrea","Estonia","Eswatini","Etiopia","Fidżi","Filipiny",
                        "Finlandia","Francja","Gabon","Gambia","Ghana","Grecja","Grenada","Gruzja","Gujana","Gwatemala","Haiti",
                        "Hiszpania","Holandia","Honduras","Indie","Indonezja","Irak","Iran","Irlandia","Islandia","Izrael","Jamajka",
                        "Japonia","Jemen","Jordania","Kambodża","Kamerun","Kanada","Katar","Kazachstan","Kenia","Kirgistan","Kiribati",
                        "Kolumbia","Komory","Kongo","Korea Południowa","Korea Północna","Kostaryka","Kuba","Kuwejt","Laos","Lesotho",
                        "Liban","Liberia","Libia","Liechtenstein","Litwa","Luksemburg","Łotwa","Macedonia Północna","Madagaskar",
                        "Malawi","Malediwy","Malezja","Mali","Malta","Maroko","Mauretania","Mauritius","Meksyk","Mikronezja","Moldawia",
                        "Monako","Mongolia","Mozambik","Namibia","Nauru","Nepal","Niemcy","Niger","Nigeria","Nikaragua","Norwegia",
                        "Nowa Zelandia","Oman","Pakistan","Palau","Panama","Papua-Nowa Gwinea","Paragwaj","Peru","Polska","Portugalia",
                        "Republika Zielonego Przylądka","Republika Środkowoafrykańska","Rosja","Rumunia","Rwanda","Saint Kitts i Nevis",
                        "Saint Lucia","Saint Vincent i Grenadyny","Salwador","Samoa","San Marino","Senegal","Serbia","Seszele",
                        "Sierra Leone","Singapur","Słowacja","Słowenia","Somalia","Sri Lanka","Sudan","Sudan Południowy","Surinam",
                        "Syria","Szwajcaria","Szwecja","Tadżykistan","Tajlandia","Tanzania","Timor Wschodni","Togo","Tonga","Trynidad i Tobago",
                        "Tunezja","Turcja","Turkmenistan","Tuvalu","Uganda","Ukraina","Urugwaj","USA","Uzbekistan","Vanuatu","Watykan",
                        "Wenezuela","Węgry","Wielka Brytania","Wietnam","Włochy","Wybrzeże Kości Słoniowej","Wyspy Marshalla","Zambia","Zimbabwe"
                    ].map((country) => (
                        <a
                            key={country}
                            href="#"
                            className="flex items-center space-x-3 text-[#03418a] underline hover:text-[#03418a]"
                        >
                            <span className="w-2 h-2 rounded-full bg-black inline-block"></span>
                            <span>{country}</span>
                        </a>
                    ))}
                </nav>
            </section>
            <div
                style={{ height: NAV_HEIGHT }}
                className="fixed bottom-0 left-0 right-0 z-20 bg-[#f3f4fb]"
            >
                <Navigation />
            </div>
        </motion.div>
    );
};

export default ServicePage7;