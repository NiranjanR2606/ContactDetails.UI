import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Contact } from 'src/app/models/contacts.model'
import { ContactsService } from 'src/app/services/contacts.service';
import { AddContactComponent } from '../add-contact/add-contact.component';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts: Contact[] = [];

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    this.contactsService.getAllContacts()
      .subscribe({
        next: (contacts) => {
          this.contacts = contacts;
        },
        error: (response) => {
          console.log(response);
        }
      });
  }

}
