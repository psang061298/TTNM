import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScoreService } from './../../../services/score.service';
// import { Schedule } from './../../../models/schedual.model';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course.model';
import { NgxPrinterService } from 'ngx-printer'

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  subscription: Subscription;
  // courses: Course[];

  courses : any[] = [];

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
    public scoreService: ScoreService,
    public courseService: CourseService,
    private printerService: NgxPrinterService
  ) { }

  ngOnInit() {
    this.loadScore();
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

}
