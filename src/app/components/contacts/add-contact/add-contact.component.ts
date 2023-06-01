import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contacts.model';
import { ContactsService } from 'src/app/services/contacts.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

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
    if(this.validateContact())
    {
      this.contactsService.addContact(this.addContactRequest).subscribe({
        next:(contact)=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Contact Updated Successfully',
            showConfirmButton: false,
            timer: 1500,
            customClass: 'swal-wide',
          });
          this.router.navigate(["contacts"]);
        },
        error:(response)=>{
          console.log(response);
        }
      });
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Please Fill Needed Details',
        showConfirmButton: true,
        customClass: 'swal-wide',
        confirmButtonColor:"#0D6EFD",
      });
    }
  }
  validateContact():boolean{
    if(this.addContactRequest.firstName.trim() != "" && this.addContactRequest.lastName.trim() != "" && this.addContactRequest.email.trim() != "" && this.addContactRequest.phoneNumber.trim() != ""){
      return true;
    }
    return false;
  }
}
