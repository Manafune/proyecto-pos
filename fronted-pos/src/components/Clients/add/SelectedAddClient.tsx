import { useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { ClientsPagination } from '@/routes/_authenticated/(clients)/clients';

export const SelectedAddClient = () => {
	const firstNameRef = useRef<HTMLInputElement>(null);

	const handleSubmit = () => {
		const newCustomer = {
			first_name: firstNameRef.current?.value || ''
		};

		console.log('Nuevo Cliente:', newCustomer);
	};

	return (
		<div className='grid flex-1 auto-rows-max gap-4'>
			<div className='grid grid-flow-col'>
				<div className='flex flex-row'>
					<Link
						to='/clients'
						search={(searchParams) => {
							const prevSearchParams = searchParams as ClientsPagination;
							return { ...prevSearchParams, current: 1, filter: 'ACTIVE' };
						}}
						className={buttonVariants({
							variant: 'outline',
							className: 'mr-4'
						})}
					>
						<ChevronLeft className='h-4 w-4' />
						<span className='sr-only'>Volver</span>
					</Link>
					<h1 className='flex-1 shrink-0 whitespace-nowrap text-4xl grow font-semibold tracking-tight sm:grow-0'>AÑADIR CLIENTE</h1>
				</div>
				<div className='hidden items-center gap-2 md:ml-auto md:flex'>
					<Link
						to='/clients'
						search={(searchParams) => {
							const prevSearchParams = searchParams as ClientsPagination;
							return { ...prevSearchParams, current: 1, filter: 'ACTIVE' };
						}}
						className={buttonVariants({
							variant: 'outline'
						})}
					>
						Descartar
					</Link>
					<button onClick={handleSubmit} className={buttonVariants()}>
						Guardar Cliente
					</button>
				</div>
			</div>
		</div>
	);
};
