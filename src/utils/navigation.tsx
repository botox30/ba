import { getUser } from './auth';

export const getUserPath = async (path: string): Promise<string> => {
    const user = await getUser();
    if (!user?.id) {
        return '/login';
    }
    return `/${user.id}${path}`;
};

export const navigateWithUser = async (navigate: (path: string) => void, path: string) => {
    const userPath = await getUserPath(path);
    navigate(userPath);
}; 