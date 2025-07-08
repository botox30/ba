

export async function getUser() {
    try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://dziwkikoks.xyz';
        console.log('Sprawdzam autoryzację użytkownika...');

        const res = await fetch(`${backendUrl}/api/me`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('Response status:', res.status);

        if (!res.ok) {
            console.log('Użytkownik nie zalogowany');
            return null;
        }

        const data = await res.json();
        console.log('Użytkownik zalogowany:', data.user?.username);
        return data.user;
    } catch (error) {
        console.error('Błąd podczas sprawdzania autoryzacji:', error);
        return null;
    }
}
