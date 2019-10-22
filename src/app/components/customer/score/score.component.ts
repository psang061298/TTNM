import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScoreService } from './../../../services/score.service';
// import { Schedule } from './../../../models/schedual.model';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course.model';
import { Router } from '@angular/router';
import { NgxPrinterService } from 'ngx-printer';

import { Transcript } from 'src/app/models/transcript.model';
import { TranscriptService } from './../../../services/transcript.service';
import { SharingDataService } from './../../../services/sharing-data.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  subscription: Subscription;
  // courses: Course[];

  courses : any[] = [];
  transcript : Transcript[] = [];
  acc: number;

  // course : Object = {
  //   name : '',
  //   subject : [
  //     {
  //       name : '',
  //       score : -1,
  //     }
  //   ]
  // }

  course : Object = {
    name : '',
    score : -1,
  }


  constructor(
    public routerService: Router,
    public scoreService: ScoreService,
    public courseService: CourseService,
    private printerService: NgxPrinterService,
    public transcriptService: TranscriptService,
    public sharingDataService : SharingDataService,
  ) { }

  ngOnInit() {
    this.loadScore();
    this.loadTranscript();
    // this.setGraduation2();
  }

  loadScore(){
    this.subscription = this.scoreService.getAllScore().subscribe(data => {
      for (let index = 0; index < data.length; index++) {
        var course : Object = {
          name : '',
          score : -1,
        }
        course['name'] = data[index]['subject_id']['name'];
        course['score'] = data[index]['score'];
        this.courses.push(course);
        
      }
      console.log(this.courses);
      
    })
  }

  // loadCourses() {
  //   this.subscription = this.courseService.getAllCourses().subscribe( (data: Course[] ) => {

  //   });
  // }

  // changeSelect(value) {
  //   this.subscription = this.scheduleService.filterSchedule(value).subscribe( (data: Schedule[] ) => {
  //     this.schedule = data;
  //     console.log(this.schedule);
  //   });
  // }

  print(){
    this.printerService.printCurrentWindow();
    console.log('in');
    this.courseService.getInfo(2).subscribe(data => {
      console.log(data);
    })
  }

  loadTranscript(){
    this.subscription = this.transcriptService.getAllTranScript().subscribe( (data: Transcript[] ) => {
      this.transcript = data;
      console.log(data);
      console.log(typeof(this.transcript[0]['accumutation']));
    });
  }

  checkGraduate(acc){
    if(acc.accumutation >= 25){
      return true;
    }
    return false;
  }

  setGraduation(student, course, gpa){
    this.sharingDataService.setOption('student', student);
    this.sharingDataService.setOption('course', course);
    this.sharingDataService.setOption('rank', gpa);
    console.log(this.sharingDataService.getOption());

    this.routerService.navigateByUrl('certificate');
  }

  // setGraduation2(){
  //   this.sharingDataService.setOption('student', "student");
  //   this.sharingDataService.setOption('course', "course");
  //   this.sharingDataService.setOption('rank', "gpa");
  //   console.log(this.sharingDataService.getOption());
  // }
}
