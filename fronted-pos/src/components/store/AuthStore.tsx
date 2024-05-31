import supabase from '@/lib/supabase';
import { UserToken } from '@/types/auth';
import { jwtDecode } from 'jwt-decode';
import { useState, createContext, useEffect } from 'react';
export interface CustomSession {
	auth: UserToken | null;
}

export const SessionContext = createContext<CustomSession>({ auth: null });

export const AuthStore = ({ children }: { children: React.ReactNode }) => {
	const [sessionData, setSessionData] = useState<CustomSession>({ auth: null });

	useEffect(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_OUT') {
				setSessionData({ auth: null });
			}
			if (event === 'SIGNED_IN') {
				const user = jwtDecode(session?.access_token ?? '') as UserToken;
				session !== null && setSessionData({ auth: user });
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return <SessionContext.Provider value={sessionData}>{children}</SessionContext.Provider>;
};
