import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EduProgramService } from '../../../services/edu-program.service';
import { CourseService } from '../../../services/course.service';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { AdminClassService } from '../../../services/admin-class.service'
import { environment } from 'src/environments/environment';
import { Course } from 'src/app/models/course.model';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


declare const $;

@Component({
  selector: 'app-course',
  templateUrl: './admin-course.component.html',
  styleUrls: ['./admin-course.component.scss']
})
export class AdminCourseComponent implements OnInit,OnDestroy {

  subscription: Subscription;
  course: any[] = [];
  program: any[] = [];
  p: number = 1;
  total: number;
  public formCourse : FormGroup;
  public formCourseDetail : FormGroup;

  imgView : any;
  imgViewDetail : any;

  courseDetail : Course = new Course();

  courseAdded : string;

  new_Course : Object = {
    name: '',
    start_year : '',
    end_year : '',
    fee : -1,
    images : '',
    program_id : -1,
  }


  constructor(
    public courseService: CourseService,
    public eduProgramService: EduProgramService,
    public formBuilder : FormBuilder,
    private adminClassService  :AdminClassService,
    private http : HttpClient

  ) { }

  ngOnInit(){
    this.loadCourse();
    this.loadProgram();
    this.createForm();

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadCourse(){
    this.courseService.getAllCourses().subscribe(data => {
      this.course = data;
    });
  }

  loadProgram(){
    this.eduProgramService.getAllEduPrograms().subscribe(data => {
      this.program = data;
      // this.changeCourse(this.program[0].id);
      this.new_Course['program_id'] = data[0].id;
    });
  }

  addCourse(){

    let formData = new FormData();

    formData.append('name',this.formCourse.get('name').value);  
    formData.append('start_year',this.formCourse.get('start_year').value);
    formData.append('end_year',this.formCourse.get('end_year').value);
    formData.append('image', this.formCourse.get('image').value);
    formData.append('fee',this.formCourse.get('fee').value);
    formData.append('program_id',this.formCourse.get('program').value);

    let url = `${environment.urlApi}/api/course/create/`;

    $.ajax({
      url,
      data: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      processData: false,
      contentType: false,
      type: 'POST',
      success: data => {
        this.loadCourse();
      },
      error: error => {
        console.log(error);
      }
    });

    // formData.forEach((value, key) => {
    //   console.log(key + ": " + value)
    // });

    // this.adminClassService.postCourse(formData).subscribe(data =>{
    //   console.log(data);
    // })
  }

  onFileSelect(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formCourse.get('image').setValue(file);

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (_event) => { 
      this.imgView = reader.result; 
      }
    }
  }

  date(value){
    console.log(value);
  }

  createForm() {
    this.formCourse = this.formBuilder.group({
      name : ['',[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]],
      start_year : ['',Validators.required],
      end_year : ['', Validators.required],
      fee : ['', Validators.required],
      program : ['1', Validators.required],
      image : [''],
    });
  }
  editForm() {
    this.formCourseDetail = this.formBuilder.group({
      image : [''],
    });
  }
  delete(id){
    this.adminClassService.delCourse(id).subscribe(data => { 
      this.loadCourse();
    })
  }

  detail(id){
    this.adminClassService.deltailCourse(id).subscribe(data => {
      this.courseDetail = data;
      console.log(this.courseDetail);
      this.editForm();
    })
  }

  changeImgDetail : boolean = false
  imgDetail : any;
  onChangeImgDetail(event){
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formCourseDetail.get('image').setValue(file);
      this.changeImgDetail = true;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (_event) => { 
      this.courseDetail.image = reader.result; 
      }
    }
  }

  editCourse(){

    let url = `${environment.urlApi}/api/course/${this.courseDetail.id}/`;
      let formData = new FormData();
    formData.append('name', this.courseDetail.name);  
    formData.append('start_year',this.courseDetail.start_year);
    formData.append('end_year',this.courseDetail.end_year);
    formData.append('image', this.formCourseDetail.get('image').value);
    formData.append('fee', this.courseDetail.fee.toString());
    formData.append('program_id', this.courseDetail.program_id.toString());
    
    formData.forEach((value, key) => {
      console.log(key + ": " + value)
    });

    
    console.log(url);
    
    $.ajax({
      url,
      data: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      processData: false,
      contentType: false,
      type: 'patch',
      success: data => {
        Swal.fire({
          position: 'center',
          type: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        this.loadCourse();
      },
      error: error => {
        console.log(error);
      }
    });
    
    this.imgDetail = '';
  }
}
