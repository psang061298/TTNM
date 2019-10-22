import { Component, OnInit } from '@angular/core';
import { NgxPrinterService } from 'ngx-printer';
import { SharingDataService } from './../../../services/sharing-data.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {

  private student: string;
  private course: string;
  private ranking: string;
  fullname: string;
  private data;
  constructor(
    private printerService: NgxPrinterService,
    private sharingDataService: SharingDataService,
    private profileService: ProfileService
  ) {
    // this.data = sharingDataService.getOption();
    // console.log("Data")
    // console.log(this.data);
  }

  ngOnInit() {
    this.getGraduation();
    this.printCertificate();
    this.getUser();
  }

  printCertificate(){
    this.printerService.printCurrentWindow();
    // this.courseService.getInfo(2).subscribe(data => {
    //   console.log(data);

    // })
  }

  getGraduation() {
    this.data = this.sharingDataService.getOption();
  }

  getUser() {
    this.profileService.getProfile().subscribe( data => {
      this.fullname = data[0]['first_name'] + " " + data[0]['last_name'];
    });
  }
}
