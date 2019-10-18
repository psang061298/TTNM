import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {

  user : any[] = [];
  subscription : Subscription;
  checkArray : any[] = [];

  public p: number = 1;
  public total : number;

  constructor(
    public userService : UserService,
  ) { }

  ngOnInit() {
    this.loadAllUser(this.p);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadAllUser(page){
    this.subscription = this.userService.getAllUser(page).subscribe(data => {
      this.user = data['results'];
      this.total = data['count'];
      console.log(this.user);
      console.log("TOTAL: "+this.total);
    });
  }

  OnCheck(id: number){
    for(var i = 0; i < this.checkArray.length; i++){
      if( id == this.checkArray[i] ){
        this.checkArray.splice(i,1);
        return;
      }
    }

    this.checkArray.push(id);
  }

  addUser(username, password,confirmpass ,email){
    if(password != confirmpass){
      Swal.fire({
        title: '<strong>Confirm Error</strong>',
        type: 'error',
        html: 'Confirm password incorrect!',
        showCloseButton: true,
        focusConfirm: false,
      });
      return;
    }

    this.userService.addUser(username, password, email, 'teacher').subscribe(data => {
      Swal.fire({
        title: '<strong>Successful!</strong>',
        type: 'success',
        html: 'Add user successfully!',
        showCloseButton: true,
        focusConfirm: false,
      });
    },
    error => {
      Swal.fire({
        title: '<strong>Duplicated username!</strong>',
        type: 'error',
        html: 'This username is existed. Please try again!',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
      });
      console.log(error);
    });
  }
}
