const PowodzPanel = () => {
    return (
        <div className="max-w-md mx-auto mt-4 p-[1px]">
            <div className="bg-white rounded-xl shadow p-4 divide-y divide-gray-200">
                <div className="flex items-center justify-between pb-3">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://imgur.com/neCWL3Q.png"
                            alt="Zgłoś Ikona"
                            className="w-5 h-5"
                        />
                        <div>
                            <h2 className="font-semibold text-gray-900">Mapa ostrzeżeń</h2>
                            <p className="text-sm text-gray-600">
                                Zobacz na, których obszarach <br />obowiązują ostrzeżenia hydrologiczne.
                            </p>
                        </div>
                    </div>
                    <span className="text-gray-300 text-xl">{'>'}</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://imgur.com/hvEDb3w.png"
                            alt="Baza Ikona"
                            className="w-5 h-5"
                        />
                        <div>
                            <h2 className="font-semibold text-gray-900">Ostrzeżenia hydrologiczne</h2>
                            <p className="text-sm text-gray-600">
                                Zapoznaj się z aktualnymi ostrzeżeniami hydrologicznymi.
                            </p>
                        </div>
                    </div>
                    <span className="text-gray-300 text-xl">{'>'}</span>
                </div>

            <div className="flex items-center justify-between pt-2 mt-2">
                <div className="flex items-center gap-3">
                    <img
                        src="https://imgur.com/DXHEmjp.png"
                        alt="Baza Ikona"
                        className="w-5 h-5"
                    />
                    <div>
                        <h2 className="font-semibold text-gray-900">Jak postępować?</h2>
                        <p className="text-sm text-gray-600">
                            Dowiedz się, co robić w razie powodzi.
                        </p>
                    </div>
                </div>
                <span className="text-gray-300 text-xl">{'>'}</span>
            </div>
            </div>
            <div className="bg-blue-100 p-4 rounded-[15px] flex items-start gap-3 mt-4">
                <img
                    src="https://imgur.com/N0Q23HK.png"
                    alt="Info Ikona"
                    className="w-5 h-5 mt-1"
                />
                <div className="text-sm text-black-600">
                    <h2 className="font-semibold text-gray-900 text-[16px]">Wsparcie materialne</h2>
                    <p>
                        Szukasz informacji o wsparciu materialnym <br />dla osób poszkodowanych przez powódź?
                    </p>
                    <p className="font-semibold text-[#03418a] mt-1">
                        Przejdź do gov.pl
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PowodzPanel;