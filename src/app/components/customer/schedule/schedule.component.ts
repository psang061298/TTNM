import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScheduleService } from './../../../services/schedual.service';
import { Schedule } from './../../../models/schedual.model';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  schedule: Schedule[];
  courses: Course[];

  constructor(
      public scheduleService: ScheduleService,
      public courseService: CourseService
  ) { }

  ngOnInit() {
    this.getFilteredSchedule(2);
    this.loadCourses();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadCourses() {
    this.subscription = this.courseService.getAllCourses().subscribe( (data: Course[] ) => {
      this.courses = data;
    });
  }

  changeSelect(value) {
    this.getFilteredSchedule(value);
  }

  getFilteredSchedule(value) {
    this.subscription = this.scheduleService.filterSchedule(value).subscribe( (data: Schedule[] ) => {
      this.schedule = data;
      console.log(this.schedule);
    });
  }

}
