import { AddContactDialog } from '@/components/Dialogs/AddContact'
import { Pagination } from '@/components/Pagination'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { useState } from 'react'

type ContactsListResponse = {
  contacts: {
    id: string
    name: string
    phone_1: string
    phone_2: string
    phone_3: string
    phone_4: string
    phone_5: string
    contact_1: string
    contact_2: string
    contact_3: string
    contact_4: string
    contact_5: string
    address: string
    email: string
    observations: string
  }[]
  totalCount: number
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')

  const { data, isLoading, error } = useQuery({
    queryKey: ['contatos', currentPage, search],
    queryFn: async () => {
      return api
        .get<ContactsListResponse>(
          search
            ? `/contacts/list/${currentPage}/${search.toUpperCase()}`
            : `/contacts/list/${currentPage}/`,
        )
        .then((res) => res.data)
    },
  })

  if (error) {
    console.log(error)
    return <h1>Error</h1>
  }

  return (
    <div className="text-gray-800 h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-[1200px] bg-white shadow-sm rounded-md p-4">
        <h2 className="font-medium text-xl">Contatos</h2>
        <div className="w-full flex items-center justify-between mt-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={classNames(
              'bg-slate-100 w-[83%] px-3 py-2 rounded-md shadow-sm',
              'focus:placeholder:px-1 placeholder:duration-200',
              'disabled:cursor-not-allowed',
              'focus:outline-none focus:ring-1',
              'border border-transparent focus:border-emerald-400 focus:ring-emerald-400',
            )}
            placeholder="Pesquisar Contato"
          />
          <AddContactDialog />
        </div>
        {!isLoading && data ? (
          <>
            <table className="w-full">
              <thead>
                <tr className="">
                  <th className="text-left font-medium py-3 px-2">Nome</th>
                  <th className="text-left font-medium py-3 px-2">Telefone</th>
                  <th className="text-left font-medium py-3 px-2">Email</th>
                  <th className="text-left font-medium py-3 px-2">Opções</th>
                </tr>
              </thead>
              <tbody>
                {data.contacts.map((contact) => (
                  <tr
                    className="[&_td]:py-3 [&_td]:px-3 [&_td]:odd:bg-slate-100"
                    key={contact.id}
                  >
                    <td className="rounded-l-md">{contact.name}</td>
                    <td>{contact.phone_1}</td>
                    <td>{contact.email}</td>
                    <td className="rounded-r-md">Opções</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              onPageChange={setCurrentPage}
              totalCountOfRegisters={data.totalCount}
              currentPage={currentPage}
              registersPerPage={10}
            />
          </>
        ) : (
          <>
            <h1>Loading</h1>
          </>
        )}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx)
  const token = cookies['agendav2.token']

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
