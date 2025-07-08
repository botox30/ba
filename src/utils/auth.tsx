
// Check if running as PWA
const isPWA = () => {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true ||
           document.referrer.includes('android-app://');
};

// Store auth data in localStorage for PWA
const setAuthData = (userData: any) => {
    localStorage.setItem('mobywatel_user', JSON.stringify(userData));
    localStorage.setItem('mobywatel_auth_time', Date.now().toString());
};

const getStoredAuthData = () => {
    try {
        const userData = localStorage.getItem('mobywatel_user');
        const authTime = localStorage.getItem('mobywatel_auth_time');
        
        if (!userData || !authTime) return null;
        
        // Check if auth data is less than 24 hours old
        const twentyFourHours = 24 * 60 * 60 * 1000;
        if (Date.now() - parseInt(authTime) > twentyFourHours) {
            localStorage.removeItem('mobywatel_user');
            localStorage.removeItem('mobywatel_auth_time');
            return null;
        }
        
        return JSON.parse(userData);
    } catch {
        return null;
    }
};

const clearAuthData = () => {
    localStorage.removeItem('mobywatel_user');
    localStorage.removeItem('mobywatel_auth_time');
};

export async function getUser() {
    // If running as PWA, try to get stored auth data first
    if (isPWA()) {
        const storedUser = getStoredAuthData();
        if (storedUser) {
            console.log('Using stored auth data for PWA');
            return storedUser;
        }
    }
    
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
            clearAuthData();
            return null;
        }

        const data = await res.json();
        console.log('Użytkownik zalogowany:', data.user?.username);
        
        // Store auth data for PWA use
        if (data.user) {
            setAuthData(data.user);
        }
        
        return data.user;
    } catch (error) {
        console.error('Błąd podczas sprawdzania autoryzacji:', error);
        
        // If network error and we're in PWA, try stored data
        if (isPWA()) {
            const storedUser = getStoredAuthData();
            if (storedUser) {
                console.log('Network error, using stored auth data');
                return storedUser;
            }
        }
        
        return null;
    }

}