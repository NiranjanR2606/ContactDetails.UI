import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contacts.model';
import { ContactsService } from 'src/app/services/contacts.service';
import Swal from 'sweetalert2';

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
    if(this.validateContact()){
      this.contactsService.updateContact(this.contactDetail.id, this.contactDetail).subscribe({
        next: (contact) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Contact Updated Successfully',
            showConfirmButton: false,
            timer: 1500,
            customClass: 'swal-wide',
          })
          this.router.navigate(["contacts"]);
        },
        error: (response) => {
          console.log(response);
        }
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Please Fill Needed Details',
        showConfirmButton: true,
        customClass: 'swal-wide',
        confirmButtonColor:"#0D6EFD",
      })
    }
  }

  deleteContact(id:string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: 'swal-wide',
      confirmButtonColor:"#0D6EFD",
      cancelButtonColor:"#DC3545",
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactsService.deleteContact(id).subscribe({
          next: (contact) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Contact Deleted Successfully',
              showConfirmButton: false,
              timer: 1500,
              customClass: 'swal-wide',
            })
            this.router.navigate(["contacts"]);
          },
          error: (response) => {
            console.log(response);
          }
        })
      }
    })
    
  }
  validateContact():boolean{
    if(this.contactDetail.firstName.trim() != "" && this.contactDetail.lastName.trim() != "" && this.contactDetail.email.trim() != "" && this.contactDetail.phoneNumber.trim() != ""){
      return true;
    }
    return false;
  }
}
