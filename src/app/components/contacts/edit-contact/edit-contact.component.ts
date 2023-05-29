import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contacts.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contactDetail: Contact = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: ""
  };
  constructor(private route: ActivatedRoute, private contactsService: ContactsService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.contactsService.getContact(id).subscribe({
            next: (contact) => {
              this.contactDetail = contact;
            }
          })
        }
      }
    })
  }

  updateContact() {
    this.contactsService.updateContact(this.contactDetail.id, this.contactDetail).subscribe({
      next: (contact) => {
        this.router.navigate(["contacts"]);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  deleteContact(id:string) {
    this.contactsService.deleteContact(id).subscribe({
      next: (contact) => {
        this.router.navigate(["contacts"]);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}
