import { getRouteApi, Link } from '@tanstack/react-router';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { stepUserEdit } from '@/data/steps';
import { getUserById } from '@/lib/user/getUser';
import { MemberData, MemberRole, MemberStatus } from '@/types/members';
import { useEffect, useState } from 'react';
import { Loading } from '../Loader/Loading';

const route = getRouteApi('/_authenticated/users/$id');

const UserEdit = () => {
  
  const loaderData = route.useParams();

  const [user, setUser] = useState<MemberData | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (loaderData.id) {
        const user = await getUserById(loaderData.id);
        setUser(user);
        console.log(user);
      }
    };

    getUser();
  }, [loaderData.id]);
  const getStatusText = (status: MemberStatus) => (status === MemberStatus.ACTIVE ? 'Activo' : 'Inactivo');
  const statusText = user?.member_status ? getStatusText(user.member_status) : '';

  const getRoleText = (role_app: MemberRole) => {
		switch (role_app) {
			case MemberRole.MEMBER:
				return 'Miembro';
			case MemberRole.ADMIN:
				return 'Administrador';
			case MemberRole.SELLER:
				return 'Vendedor';
			case MemberRole.STOREKEEPER:
				return 'Almacenero';
			default:
				return '';
		}
	};
  if (!user) {
    return <div className="flex items-center justify-center min-h-screen"><Loading></Loading></div>; // O cualquier indicador de carga que prefieras
  }

  
  return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-7xl">
        <div className='flex items-center justify-between mb-12'>
          <div className='flex items-center'>
            <Link
              to='/users'
              className={buttonVariants({
                variant: 'outline',
                className: 'mr-4 flex items-center'
              })}
              search={{ pageSize: 10, current: 1, filter: 'ALL' }}
            >
              <ChevronLeft className='h-5 w-5' />
              <span className='ml-2'>Volver</span>
            </Link>
            <h1 className='text-4xl font-bold'>Editar Usuario</h1>
          </div>
        </div>
        <div className="grid gap-12 md:grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="p-8 shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl mb-4">Editar Usuario</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name" className="text-lg">Nombre</Label>
                    <Input
                      id="name"
                      type="text"
                      autoComplete="off"
                      placeholder="Nombre"
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50"
                      defaultValue={user?.member_name}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastname" className="text-lg">Apellido</Label>
                    <Input
                      id="lastname"
                      type="text"
                      placeholder="Apellido"
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50"
                      defaultValue={user?.member_lastname}
                    />
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-lg">Rol</Label>
                    <Select>
                      <SelectTrigger className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50">
                        <SelectValue placeholder={getRoleText(user?.member_role_app)} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="member">Miembro</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="seller">Vendedor</SelectItem>
                        <SelectItem value="storekeeper">Almacenero</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status" className="text-lg">Estado</Label>
                    <Select>
                      <SelectTrigger className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50">
                        <SelectValue placeholder={statusText} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Activo</SelectItem>
                        <SelectItem value="Inactive">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2 flex justify-end space-x-4">
                    <Button type="submit" className="bg-green-600 text-white">Guardar Cambios</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          <Card className="p-4 shadow-lg lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl mb-4">Paso para Editar Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {stepUserEdit.map((step, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <span className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-500 text-white flex items-center justify-center text-lg">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-md font-medium">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
