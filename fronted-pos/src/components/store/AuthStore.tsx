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
			if (session === null) return;
			if (event === 'SIGNED_OUT') {
				setSessionData({ auth: null });
			}
			if (event === 'SIGNED_IN') {
				const user = jwtDecode(session?.access_token ?? '') as UserToken;
				const newObject = { ...user, user_metadata: { ...user.user_metadata, ...session.user.user_metadata } } as UserToken;

				session !== null && setSessionData({ auth: newObject });
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return <SessionContext.Provider value={sessionData}>{children}</SessionContext.Provider>;
};
