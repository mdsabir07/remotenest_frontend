import React from 'react'
import AdminUsersTable from '../../../components/AdminUsersTable'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/authOptions'

export const metadata = { title: 'Admin - Users' }

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== 'admin') {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">Access denied</h2>
        <p>You must be an admin to view this page.</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <AdminUsersTable />
    </div>
  )
}
