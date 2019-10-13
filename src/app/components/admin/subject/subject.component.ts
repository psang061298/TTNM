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

  subjects: Subject[] = [];
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
  p: number;
  total: number;
  teacher_id: any;
  courseSelected = -1;
  courseAdded = -1;

  constructor(
    public subjectService: SubjectService,
    public eduProgramService: EduProgramService,
    public adminClassService: AdminClassService,
    public courseService: CourseService
  ) { }

  ngOnInit() {
    // this.subject = new Subject();
    this.loadCourse();
    this.loadTeacher();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
    this.courseSelected = id;
    this.loadSubjects(id);
  }

  loadTeacher() {
    this.subscription = this.adminClassService.getTeacher().subscribe( (data : any[]) => {
      this.teacher = data;
      this.subject["teacher_id"].push(data[0].id);
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
