import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Repository } from 'typeorm';
import { Contact } from 'src/contacts/entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>) {
  }

  async create(CreateContactDto: CreateContactDto) {
    const contact = this.contactsRepository.create(CreateContactDto);

    return await this.contactsRepository.save(contact);
  }

  async findAll() {
    return await this.contactsRepository.find({
      order: {
        createdAt: 'DESC', 
      },
    });
  }

  async findOne(id: number) {
    return await this.contactsRepository.findOne({ where: { id } });
  }

  async update(id: number, UpdateContactDto: UpdateContactDto) {
    const contact = await this.findOne(id);
    if (!contact) {
      throw new NotFoundException();
    }

    Object.assign(contact, UpdateContactDto);

    return await this.contactsRepository.save(contact);
  }

  async remove(id: number) {
    const contact = await this.findOne(id);
    if (!contact) {
      throw new NotFoundException();
    }

    return await this.contactsRepository.remove(contact);
  }
}