import { getRouteApi, Link, useNavigate, useRouter } from '@tanstack/react-router';
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
import { UsersPagination } from '@/routes/_authenticated/(users)/users';
import { updateUser } from '@/lib/user/putUser';

const route = getRouteApi('/_authenticated/users/$id');

const UserEdit = () => {
  const navigate = useNavigate();
  const loaderData = route.useParams();
  const router = useRouter();

  const [user, setUser] = useState<MemberData | null>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    role: MemberRole.MEMBER,
    status: MemberStatus.ACTIVE
  });
  useEffect(() => {
    const getUser = async () => {
      if (loaderData.id) {
        const user = await getUserById(loaderData.id);
        setUser(user);
        if (user) {
          setFormData({
            first_name: user.member_name,
            last_name: user.member_lastname,
            role: user.member_role_app,
            status: user.member_status
          });}
        console.log(user);
      }
    };

    getUser();
  }, [loaderData.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      try {
        await updateUser({
          id: user.member_id,
          first_name: formData.first_name,
          last_name: formData.last_name,
          role: formData.role,
          status: formData.status
        });
        router.invalidate();
        window.alert('Cambios realizados correctamente');
        navigate({
          to: '/users',
          search: (prev) => ({ ...prev as UsersPagination })
        });
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };
  const getStatusText = (status: MemberStatus) => (status === MemberStatus.ACTIVE ? 'Activo' : 'Inactivo');

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
                <form className="grid grid-cols-1 gap-8 md:grid-cols-2"  onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="name" className="text-lg">Nombre</Label>
                    <Input
                      id="first_name"
                      type="text"
                      autoComplete="off"
                      placeholder="Nombre"
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50"
                      value={formData.first_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastname" className="text-lg">Apellido</Label>
                    <Input
                      id="last_name"
                      type="text"
                      placeholder="Apellido"
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50"
                      value={formData.last_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-lg">Rol</Label>
                    <Select value={formData.role} onValueChange={(value) => handleSelectChange('role', value)}>
                      <SelectTrigger className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50">
                        <SelectValue placeholder={getRoleText(user?.member_role_app)} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={MemberRole.MEMBER}>Miembro</SelectItem>
                        <SelectItem value={MemberRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={MemberRole.SELLER}>Vendedor</SelectItem>
                        <SelectItem value={MemberRole.STOREKEEPER}>Almacenero</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status" className="text-lg">Estado</Label>
                    <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                      <SelectTrigger className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50">
                        <SelectValue placeholder={getStatusText(user?.member_status)} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={MemberStatus.ACTIVE}>Activo</SelectItem>
                        <SelectItem value={MemberStatus.INACTIVE}>Inactivo</SelectItem>
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
