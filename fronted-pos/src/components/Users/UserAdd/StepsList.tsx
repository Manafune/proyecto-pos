import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { stepUsers } from '@/data/steps';

const UserSteps = () => {
    return (
        <Card className="p-4 shadow-lg lg:col-span-1">
            <CardHeader>
                <CardTitle className="text-xl mb-4">Paso para Registrar Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {stepUsers.map((step, index) => (
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
    );
};

export default UserSteps;
