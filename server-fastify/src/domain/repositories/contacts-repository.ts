import { Contact } from '../entities/Contact'

export abstract class ContactsRepository {
  abstract deleteById(id: string): Promise<void>
  abstract findMany({
    page,
    search,
  }: {
    page?: number
    search?: string
  }): Promise<Contact[]>

  abstract findUnique(id: string): Promise<Contact>
  abstract save(contact: Contact): Promise<Contact>
  abstract create(contact: Contact): Promise<void>
  abstract count(): Promise<number>
}