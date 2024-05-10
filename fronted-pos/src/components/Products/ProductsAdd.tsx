import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '../ui/table';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { SelectContent, Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const ProductsAdd = () => {
	return (
		<div className='grid max-w-screen-xl flex-1 auto-rows-max gap-4'>
			<div className='grid gap-4 md:grid-cols-[1fr_250px]  lg:grid-cols-3 lg:gap-6'>
				<div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-6'>
					<Card x-chunk='dashboard-07-chunk-0'>
						<CardHeader>
							<CardTitle>AÑADIR PRODUCTO</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='grid gap-6'>
								<div className='grid gap-3'>
									<Label htmlFor='name'>Nombre</Label>
									<Input id='name' type='text' className='w-full' placeholder='Ejemplo: Leche' />
								</div>
							</div>
						</CardContent>
					</Card>
					<Card x-chunk='dashboard-07-chunk-1'>
						<CardHeader>
							<CardTitle>Stock</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className='w-[100px]'>ID</TableHead>
										<TableHead>Stock</TableHead>
										<TableHead>Precio</TableHead>
										<TableHead className='w-[100px]'>Envase</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell className='font-semibold'>GGPC-001</TableCell>
										<TableCell>
											<Label htmlFor='stock-1' className='sr-only'>
												Stock
											</Label>
											<Input id='stock-1' type='number' defaultValue='100' />
										</TableCell>
										<TableCell>
											<Label htmlFor='price-1' className='sr-only'>
												Price
											</Label>
											<Input id='price-1' type='number' defaultValue='99.99' />
										</TableCell>
										<TableCell>
											<ToggleGroup type='single' defaultValue='s' variant='outline'>
												<ToggleGroupItem value='s'>B</ToggleGroupItem>
												<ToggleGroupItem value='m'>C</ToggleGroupItem>
												<ToggleGroupItem value='l'>L</ToggleGroupItem>
											</ToggleGroup>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className='font-semibold'>GGPC-002</TableCell>
										<TableCell>
											<Label htmlFor='stock-2' className='sr-only'>
												Stock
											</Label>
											<Input id='stock-2' type='number' defaultValue='143' />
										</TableCell>
										<TableCell>
											<Label htmlFor='price-2' className='sr-only'>
												Price
											</Label>
											<Input id='price-2' type='number' defaultValue='99.99' />
										</TableCell>
										<TableCell>
											<ToggleGroup type='single' defaultValue='m' variant='outline'>
												<ToggleGroupItem value='s'>B</ToggleGroupItem>
												<ToggleGroupItem value='m'>C</ToggleGroupItem>
												<ToggleGroupItem value='l'>L</ToggleGroupItem>
											</ToggleGroup>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className='font-semibold'>GGPC-003</TableCell>
										<TableCell>
											<Label htmlFor='stock-3' className='sr-only'>
												Stock
											</Label>
											<Input id='stock-3' type='number' defaultValue='32' />
										</TableCell>
										<TableCell>
											<Label htmlFor='price-3' className='sr-only'>
												Stock
											</Label>
											<Input id='price-3' type='number' defaultValue='99.99' />
										</TableCell>
										<TableCell>
											<ToggleGroup type='single' defaultValue='s' variant='outline'>
												<ToggleGroupItem value='s'>B</ToggleGroupItem>
												<ToggleGroupItem value='m'>C</ToggleGroupItem>
												<ToggleGroupItem value='l'>L</ToggleGroupItem>
											</ToggleGroup>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
						<CardFooter className='justify-center border-t p-4'>
							<Button size='sm' variant='ghost' className='gap-1'>
								<PlusCircle className='h-3.5 w-3.5' />
								Guardar
							</Button>
						</CardFooter>
					</Card>
				</div>
				<Card x-chunk='dashboard-07-chunk-3' className='h-fit'>
					<CardHeader>
						<CardTitle>Estado Producto</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='grid gap-6'>
							<div className='grid gap-3'>
								<Label htmlFor='status'>Estado</Label>
								<Select>
									<SelectTrigger id='status' aria-label='Selecionar estado'>
										<SelectValue placeholder='Selecionar estado' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='published'>Activo</SelectItem>
										<SelectItem value='archived'>Inactivo</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
			<div className='flex items-center justify-center gap-2 md:hidden'>
				<Button variant='outline' size='sm'>
					Discard
				</Button>
				<Button size='sm'>Save Product</Button>
			</div>
		</div>
	);
};
