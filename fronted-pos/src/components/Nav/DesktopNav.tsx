import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Settings, Package2, Package, ShoppingCart, Users2, LineChart } from 'lucide-react';

import { Link } from '@tanstack/react-router';
const navItems = [
	{ icon: Package2, label: 'Panel', path: '/dashboard' },
	{ icon: ShoppingCart, label: 'Ventas', path: '/orders' },
	{ icon: Package, label: 'Productos', path: '/products' },
	{ icon: Users2, label: 'Clientes', path: '/clients' },
	{ icon: LineChart, label: 'Analiticas', path: '/analytics' }
];

export const DesktopNav = () => {
	return (
		<aside className=' fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
			<nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
				<Link
					to='/'
					className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
				>
					<Package2 className='h-4 w-4 transition-all group-hover:scale-110' />
					<span className='sr-only'>Acme Inc</span>
				</Link>
				{navItems.map((item, index) => (
					<TooltipProvider key={index}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									to={item.path}
									className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
								>
									<item.icon className='h-5 w-5' />
									<span className='sr-only'>{item.label}</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right'>{item.label}</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				))}
			</nav>
			<nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href='#'
								className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
							>
								<Settings className='h-5 w-5' />
								<span className='sr-only'>Configuración</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>Configuración</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</nav>
		</aside>
	);
};
