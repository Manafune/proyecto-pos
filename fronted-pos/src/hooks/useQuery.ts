import { useState, useEffect, useMemo } from 'react';

type FetchDataHook<Data> = {
	data: Data | null;
	isLoading: boolean;
	error: Error | null;
	onUpdateData: (params: Partial<Data>) => void;
};

type UseQueryParams<Data> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fetchFunction: (params: any) => Promise<Data>;
	params: Record<string, unknown>;
};

export const useQuery = <Data>({ fetchFunction, params }: UseQueryParams<Data>): FetchDataHook<Data> => {
	const [data, setData] = useState<Data | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const newParams = useMemo(() => params, [JSON.stringify(params)]);
	useEffect(() => {
		const { abort, timeout } = AbortSignal;
		const loadData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const result = await fetchFunction({ ...newParams, timeout });
				setData(result);
			} catch (error) {
				if (error instanceof Error && error.name === 'AbortError') {
					setError({ message: 'Error al abortar la carga', name: 'Error en carga' });
				} else {
					setError(error as Error);
				}
			} finally {
				setIsLoading(false);
			}
		};

		loadData();

		return () => {
			abort();
		};
	}, [fetchFunction, newParams]);
	const onUpdateData = (params: Partial<Data>) => {
		data !== null && setData((prevData) => (prevData !== null ? { ...prevData, ...params } : prevData));
	};
	return { data, isLoading, error, onUpdateData };
};
