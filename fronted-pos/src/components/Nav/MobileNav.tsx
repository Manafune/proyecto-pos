import { Package2, Package, Home, ShoppingCart, Users2, LineChart, PanelLeft } from 'lucide-react';
// import { Input } from '@/components/ui/input';
import { Link } from '@tanstack/react-router';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import supabase from '@/lib/supabase';
import { Label } from '../ui/label';
const MobileNav = () => {
	const translatedRoutes: Record<string, string> = {
		users: 'Usuarios',
		sales: 'Ventas',
		products: 'Productos',
		clients: 'Clientes',
		settings: 'Ajustes'
		// Add more as needed
	};

	const fullPath = window.location.pathname.replace('/', '');
	const pathParts = fullPath.split('/');

	// main route
	const mainRoute = pathParts[0];
	let operation = '';

	if (pathParts.length > 1 && pathParts[1] !== 'add') {
		operation = 'Actualizar';
	} else if (pathParts.length > 1 && pathParts[1] === 'add') {
		operation = 'Añadir';
	}

	const breadcrumbText = translatedRoutes[mainRoute as keyof typeof translatedRoutes] || mainRoute;

	return (
		<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
			<header className='sticky top-0 z-30 max-w-screen-xl flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
				<Sheet>
					<SheetTrigger asChild>
						<Button size='icon' variant='outline' className='sm:hidden'>
							<PanelLeft className='h-5 w-5' />
							<span className='sr-only'>Toggle Menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side='left' className='sm:max-w-xs'>
						<nav className='grid gap-6 text-lg font-medium'>
							<Link
								href='#'
								className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
							>
								<Package2 className='h-5 w-5 transition-all group-hover:scale-110' />
								<span className='sr-only'>Acme Inc</span>
							</Link>
							<Link href='#' className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
								<Home className='h-5 w-5' />
								Panel
							</Link>
							<Link href='#' className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
								<ShoppingCart className='h-5 w-5' />
								Orders
							</Link>
							<Link href='#' className='flex items-center gap-4 px-2.5 text-foreground'>
								<Package className='h-5 w-5' />
								Productos
							</Link>
							<Link href='#' className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
								<Users2 className='h-5 w-5' />
								Clientes
							</Link>
							<Link href='#' className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
								<LineChart className='h-5 w-5' />
								Ajustes
							</Link>
						</nav>
					</SheetContent>
				</Sheet>
				<Breadcrumb className='hidden md:flex'>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Label>Inicio</Label>
							</BreadcrumbLink>
						</BreadcrumbItem>
						{breadcrumbText && (
							<>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<Label>{breadcrumbText}</Label>
									</BreadcrumbLink>
								</BreadcrumbItem>
							</>
						)}
						{operation && (
							<>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<Label>{operation}</Label>
									</BreadcrumbLink>
								</BreadcrumbItem>
							</>
						)}
					</BreadcrumbList>
				</Breadcrumb>
				<div className='relative ml-auto flex-1 md:grow-0'>
					{/* <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
					  <Input type='search' placeholder='search...' className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]' /> */}
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' size='icon' className='overflow-hidden rounded-full'>
							<img src='https://imgur.com/cpCSL7O.jpeg' width={36} height={36} alt='Avatar' className='overflow-hidden rounded-full' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link to='/settings'>Configuración</Link>
						</DropdownMenuItem>

						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={async () => {
								const { error } = await supabase.auth.signOut();
								if (!error) window.location.href = '/sign-in';
							}}
						>
							Salir
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</header>
		</div>
	);
};

export default MobileNav;
