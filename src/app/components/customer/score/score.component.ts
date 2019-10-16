import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScoreService } from './../../../services/score.service';
// import { Schedule } from './../../../models/schedual.model';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course.model';
import { Transcript } from 'src/app/models/transcript.model';
import { TranscriptService } from './../../../services/transcript.service';

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
    public scoreService: ScoreService,
    public courseService: CourseService,
    public transcriptService: TranscriptService
  ) { }

  ngOnInit() {
    this.loadScore();
    this.loadTranscript();
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
}
