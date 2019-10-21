import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  profile: any;
  form: FormGroup;

  constructor(
    public profileService: ProfileService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loadProfile();
    this.form = this.formBuilder.group({
      image: ['']
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadProfile() {
    this.subscription = this.profileService.getProfile().subscribe( data => {
      this.profile = data[0];
    });
  }

  updateProfile() {
    const obj = {
      "first_name" : this.profile['first_name'],
      "last_name" : this.profile['last_name'],
      "email" : this.profile['email'],
      "phone" : this.profile['phone'],
      "address" : this.profile['address']
    };
    this.subscription = this.profileService.updateProfile_Json(this.profile['id'], obj).subscribe( data => {
      console.log(data);
    });

    // const formData = new FormData();
    // formData.append('first_name', this.profile['first_name']);
    // formData.append('last_name', this.profile['last_name']);
    // formData.append('email', this.profile['email']);
    // formData.append('phone', this.profile['phone']);
    // formData.append('address', this.profile['address']);
    // // formData.append('image', this.form.get('image').value);
    // // console.log(formData);
    // this.subscription = this.profileService.updateProfile_FormData(this.profile['id'], formData).subscribe( data => {
    //   console.log(data);
    // });
  }

  submitFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('image').setValue(file);
    }
    // this.profileService.updateAvatar(this.profile['id'], file.item(0), file.item(0)['name']).subscribe( data => {
    //   console.log(data);
    // });
  }

}
