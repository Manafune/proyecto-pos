import { useState } from 'react';
import { AddressMemberSchemaType, AddressSchema } from '@/lib/validation/client';
import { ErrorsCustomer } from '@/types/clients';
import { initializeErrors } from '@/utils/customer';

export const useCustomerValidation = ({ onUpdateData }: { onUpdateData: (params: Partial<AddressMemberSchemaType>) => void }) => {
	const [errors, setErrors] = useState<ErrorsCustomer>(initializeErrors());

	const onValidateClient = (data: Partial<AddressMemberSchemaType>) => {
		console.log(data);
		const validateCustomer = AddressSchema.safeParse(data);
		const validationErrors = validateCustomer.error?.errors;

		const newErrors = validationErrors?.reduce((acc: ErrorsCustomer, error) => {
			const key = error.path[0] === 'customer' ? `${error.path[1]}` : `${error.path[0]}`;
			acc[key as keyof ErrorsCustomer] = error.message;
			return acc;
		}, initializeErrors());

		setErrors((prevErrors) => ({ ...prevErrors, ...(newErrors ?? initializeErrors()) }));
		onUpdateData(data);
		return newErrors;
	};

	return { errors, onValidateClient };
};
