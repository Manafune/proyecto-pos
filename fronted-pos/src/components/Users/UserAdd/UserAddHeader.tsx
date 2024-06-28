import React from 'react';
import { Link } from '@tanstack/react-router';
import { UsersPagination } from '@/routes/_authenticated/(users)/users';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserAddHeaderProps {
    handleSubmit: (onSubmit: (data: any) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    onSubmit: (data: any) => void;
}

const UserAddHeader: React.FC<UserAddHeaderProps> = ({ handleSubmit, onSubmit }) => {
    return (
        <div className="flex items-center justify-between mb-12">
            <div className="flex items-center">
                <Link
                    to="/users"
                    className={buttonVariants({
                        variant: 'outline',
                        className: 'mr-4 flex items-center'
                    })}
                    search={(searchParams) => {
                        const prevSearchParams = searchParams as UsersPagination;
                        return { ...prevSearchParams };
                    }}
                >
                    <ChevronLeft className="h-5 w-5" />
                    <span className="ml-2">Volver</span>
                </Link>
                <h1 className="text-4xl font-bold">Añadir Usuario</h1>
            </div>
            <div className="flex space-x-4">
                <Link
                    className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    to='/users'
                    search={(searchParams) => {
                        const prevSearchParams = searchParams as UsersPagination;
                        return { ...prevSearchParams };
                    }}
                >
                    Descartar
                </Link>
                <Button onClick={handleSubmit(onSubmit)} className="bg-green-600 text-white">Añadir Usuario</Button>
            </div>
        </div>
    );
};

export default UserAddHeader;
