import { SessionContext } from '@/components/store/AuthStore';
import { useContext } from 'react';

export function useAuth() {
	const context = useContext(SessionContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
