import supabase from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useState, createContext, useEffect } from 'react';
export interface CustomSession {
	auth: Session | null;
}

export const SessionContext = createContext<CustomSession>({ auth: null });

export const AuthStore = ({ children }: { children: React.ReactNode }) => {
	const [sessionData, setSessionData] = useState<CustomSession>({ auth: null });

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_OUT') {
				setSessionData({ auth: null });
			}
			if (event === 'SIGNED_IN') {
				session !== null && setSessionData({ auth: session });
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return <SessionContext.Provider value={sessionData}>{children}</SessionContext.Provider>;
};
