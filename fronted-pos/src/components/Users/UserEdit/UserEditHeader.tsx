import React from 'react';
import { Link } from '@tanstack/react-router';
import { UsersPagination } from '@/routes/_authenticated/(users)/users';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserEditHeaderProps {
    handleSubmit: (onSubmit: (data: any) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    onSubmit: (data: any) => void;
}

const UserEditHeader: React.FC<UserEditHeaderProps> = ({ handleSubmit, onSubmit }) => {
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
                <h1 className="text-4xl font-bold">Editar Usuario</h1>
            </div>
        </div>
    );
};

export default UserEditHeader;
