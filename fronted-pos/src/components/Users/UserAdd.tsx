import { useState } from 'react';
import { User, MemberRole, MemberStatus } from '@/types/members';
import { addUsers } from '@/lib/user/addUsers';

const UserAdd = () => {
  const [formData, setFormData] = useState<User>({
    email: '',
    name: '',
    lastname: '',
    role_app: MemberRole.MEMBER,
    status: MemberStatus.ACTIVE,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addUsers({ user: formData });
      if (response.errors) {
        setErrorMessage(response.errors[0].message);
      } else {
        // Clear form fields after successful submission
        setFormData({
          email: '',
          name: '',
          lastname: '',
          role_app: MemberRole.MEMBER,
          status: MemberStatus.ACTIVE,
        });
        // Handle success scenario
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required minLength={3} />
        </div>
        <div>
          <label>Lastname:</label>
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required minLength={3} />
        </div>
        <div>
          <label>Role:</label>
          <select name="role_app" value={formData.role_app} onChange={handleChange}>
            <option value={MemberRole.MEMBER}>Member</option>
            <option value={MemberRole.OTRO_ROL}>Admin</option>
            <option value={MemberRole.SELLER}>Seller</option>
            <option value={MemberRole.STOREKEEPER}>Storekeeper</option>
          </select>
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value={MemberStatus.ACTIVE}>Active</option>
            <option value={MemberStatus.INACTIVE}>Inactive</option>
          </select>
        </div>
        <button type="submit">Add User</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default UserAdd;
