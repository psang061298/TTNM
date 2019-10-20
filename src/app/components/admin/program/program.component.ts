import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EduProgramService } from '../../../services/edu-program.service';
import { CourseService } from '../../../services/course.service';
import { SubjectService } from '../../../services/subject.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  course: any[] = [];
  program: any[] = [];
  subject: any[] = [];
  p: number;
  total: number;

  teacher : any[] = [];

  constructor(
    public courseService: CourseService,
    public eduProgramService: EduProgramService,
    public subjectService: SubjectService,
    public userService : UserService
  ) { }

  ngOnInit(){
    // this.loadCourse();
    this.loadProgram();
    this.loadTeacher();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadProgram(){
    this.eduProgramService.getAllEduPrograms().subscribe(data => {
      this.program = data;
    });
  }

  loadSubjectByProgram(id){
    this.subjectService.getSubjectOfCourse(id).subscribe(data => {
      this.subject = data
    });
  }

  loadTeacher(){
    this.userService.getAllTeacher(2).subscribe(data => {
      this.teacher = data['results'];
    });
  }

}
