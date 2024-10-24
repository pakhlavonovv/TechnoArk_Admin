import { createContext, useState, ReactNode } from 'react';

interface User {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
}

interface UserContextType {
    user: User;
    updateUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>({ first_name: '',  last_name: '', phone_number: '', email: '',  password: '' });

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
