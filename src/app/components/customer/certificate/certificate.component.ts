import { Component, OnInit } from '@angular/core';
import { NgxPrinterService } from 'ngx-printer';
import { SharingDataService } from './../../../services/sharing-data.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {

  private student: string;
  private course: string;
  private ranking : string;
  private data;
  constructor(
    private printerService: NgxPrinterService,
    private sharingDataService: SharingDataService,
  ) { 
    // this.data = sharingDataService.getOption();
    // console.log("Data")
    // console.log(this.data);
  }

  ngOnInit() {
    this.getGraduation();
    this.printCertificate();
  }

  printCertificate(){
    this.printerService.printCurrentWindow();
    console.log('in');
    // this.courseService.getInfo(2).subscribe(data => {
    //   console.log(data);
      
    // })
  }

  getGraduation(){
    this.data = this.sharingDataService.getOption();
    console.log("Data");
    console.log(this.data);
  }

}
