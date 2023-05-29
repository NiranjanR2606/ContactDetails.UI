import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contacts.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit{
  
  addContactRequest:Contact={
    id:"",
    firstName:"",
    lastName:"",
    email:"",
    phoneNumber:"",
    address:"",
    city:"",
    state:"",
    country:"",
    postalCode:""
  };

  constructor(private contactsService:ContactsService,private router:Router) { }

  ngOnInit() { }

  addContact(){
    this.contactsService.addContact(this.addContactRequest).subscribe({
      next:(contact)=>{
        this.router.navigate(["contacts"]);
      },
      error:(response)=>{
        console.log(response);
      }
    });
  }
}
