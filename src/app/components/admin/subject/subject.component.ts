import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from '../../../models/subjects.model';
import { SubjectService } from '../../../services/subject.service';
import { Subscription } from 'rxjs';
import { EduProgramService } from '../../../services/edu-program.service';
import { AdminClassService } from '../../../services/admin-class.service';
import { CourseService } from '../../../services/course.service';
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit, OnDestroy {

  subjects: any[] = [];
  subscription: Subscription;
  subject: Object = {
    name: '',
    credit: 0,
    teacher_id: [],
    program_id: [],
  };
  // subject : Subject = new Subject();
  teacher: any[] = [];
  course: any[] = [];
  p: number = 1;
  total: number;
  teacher_id: any;
  courseSelected = -1;
  courseAdded = -1;
  programs : any[] = [];

  constructor(
    public subjectService: SubjectService,
    public eduProgramService: EduProgramService,
    public adminClassService: AdminClassService,
    public courseService: CourseService
  ) { }

  ngOnInit() {
    // this.subject = new Subject();
    // this.loadCourse();
    // this.loadTeacher();
    this._loadSubject();
    this._loadProgram();
    this.loadTeacher();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  _loadSubject(){
    this.subscription = this.subjectService.getSubjectPage(this.p).subscribe( data => {
      this.subjects = data['results'];
      this.total = data['count'];
    });
  }

  _loadProgram(){
    this.subscription = this.eduProgramService.getAllEduPrograms().subscribe( data => {
      this.programs = data;
    });
  }

  changePage(){
    this.subjectService.getSubjectPage(this.p).subscribe( data => {
      this.subjects = data['results'];
    });
  }


  loadCourse(){
    this.courseService.getAllCourses().subscribe(data => {
      this.course = data;
      this.courseAdded = data[0].id;
      this.loadSubjects(data[0].id);
      this.subject["program_id"].push(this.course[0].id);
    });
  }

  loadSubjects(id) {
    this.subjectService.getSubjectOfCourse(id).subscribe( (data: Subject[] ) => {
      this.subjects = data["results"];
      this.p = 1;
      this.total = data.length;
    });
  }

  change(id) {
    // this.courseSelected = id;
    if( id == "ALL"){
      this._loadSubject();
    }else{
      this.subjectService.getSubjectOfProgram(id).subscribe( data => {
        this.subjects = data['results'];
        this.p = 1;
        this.total = data.length;
      });
    }
  }

  loadTeacher() {
    this.subscription = this.adminClassService.getTeacher().subscribe( (data : any[]) => {
      this.teacher = data['results'];
      console.log(data);
      // this.subject["teacher_id"].push(data[0].id);
    });
  }

  changeteacher(value) {
    this.subject["teacher_id"][0] = value;
  }

  changeProgram(value) {
    this.courseAdded = value;
    this.loadSubjects(value);
    this.subject["program_id"][0] = value;
  }

  addSub(frm) {
    this.subject["name"] = frm.controls.name.value;
    this.subject["credit"] = frm.controls.credit.value;
    const subjectJSON = JSON.stringify(this.subject);
    this.adminClassService.postSubject(subjectJSON).subscribe(data => {
      this.subject = {
        name: '',
        credit: 0,
        teacher_id: [this.teacher[0].id],
        program_id: [this.course[0].id],
      };
    });
    window.location.reload();
  }

  delete(id) {
    this.adminClassService.deleteSubject(id).subscribe(data => {
      this.loadSubjects(this.courseSelected);
    });
  }

}
