import { SelectedAddClient } from '@/components/Clients/add/SelectedAddClient';
import { ClientsAddStore } from '@/components/store/ClientsAddStore';
import { CardSteps } from '@/components/Card/CardSteps';
import { stepClientsAdd } from '@/data/steps';

export const ClientsAdd = () => {
	return (
		<ClientsAddStore>
			<div className='grid max-w-screen-xl flex-1 auto-rows-max gap-4'>
				<div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-6'>
					<div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-6'>
						<SelectedAddClient />
					</div>
					<CardSteps steps={stepClientsAdd} title={'¿Cómo Añadir Clientes?'} />
				</div>
			</div>
		</ClientsAddStore>
	);
};
