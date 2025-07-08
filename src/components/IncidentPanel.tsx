const IncidentPanel = () => {
    return (
        <div className="max-w-md mx-auto mt-4 p-[1px]">
            <div className="bg-white rounded-xl shadow p-4 divide-y divide-gray-200">
                <div className="flex items-center justify-between pb-3">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://imgur.com/mUOS3YY.png"
                            alt="Zgłoś Ikona"
                            className="w-5 h-5"
                        />
                        <div>
                            <h2 className="font-semibold text-gray-900">Zgłoś incydent</h2>
                            <p className="text-sm text-gray-600">
                                Oszustwa, cyberataki lub <br />nielegalne treści.
                            </p>
                        </div>
                    </div>
                    <span className="text-gray-300 text-xl">{'>'}</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://imgur.com/jgzDZa9.png"
                            alt="Baza Ikona"
                            className="w-5 h-5"
                        />
                        <div>
                            <h2 className="font-semibold text-gray-900">Baza wiedzy</h2>
                            <p className="text-sm text-gray-600">
                                Dowiedz się, jak chronić swoje dane i unikać zagrożeń w sieci.
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
                    <p>
                        Chcesz być na bieżąco z aktualnymi ostrzeżeniami o nadużyciach w sieci?
                    </p>
                    <p className="font-semibold text-[#03418a] mt-1">
                        Włącz powiadomienia
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IncidentPanel;