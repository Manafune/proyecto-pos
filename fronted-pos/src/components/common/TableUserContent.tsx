import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { MemberData } from '@/types/members';
import React from 'react';

interface TypeTableContent {
  users: MemberData[];
}

export const TableUserContent = ({ users }: TypeTableContent) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Apellido</TableHead>
          <TableHead>Rol</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>
            <span className='sr-only'>Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map(({ member_id, member_lastname, member_name, member_role_app, member_status }) => (
          <TableRow key={member_id}>
            <TableCell>{member_name}</TableCell>
            <TableCell>{member_lastname}</TableCell>
            <TableCell>{member_role_app}</TableCell>
            <TableCell>{member_status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
