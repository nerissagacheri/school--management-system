import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../service/student';

@Component({
  selector: 'app-add-student',
  imports: [ReactiveFormsModule],
  templateUrl: './add-student.html',
  styleUrl: './add-student.css'
})
export class AddStudent implements OnInit {
  studentForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    grade: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  isEditMode = false;
  editingId: number | null = null;
  pageTitle = 'Add New Student';
  buttonText = 'Save Student';

  constructor(
    private studentService: StudentService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.editingId = +id;
        this.pageTitle = 'Edit Student';
        this.buttonText = 'Update Student';
        
        this.studentService.getStudentById(this.editingId).subscribe(student => {
          if (student) {
            this.studentForm.patchValue({
              firstName: student.firstName,
              lastName: student.lastName,
              grade: student.grade,
              email: student.email
            });
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const studentData = {
        firstName: this.studentForm.value.firstName || '',
        lastName: this.studentForm.value.lastName || '',
        grade: this.studentForm.value.grade || '',
        email: this.studentForm.value.email || ''
      };

      if (this.isEditMode) {
        this.studentService.updateStudent({ id: this.editingId!, ...studentData }).subscribe(() => {
          this.studentForm.reset();
          this.router.navigate(['/']);
        });
      } else {
        this.studentService.addStudent(studentData).subscribe(() => {
          this.studentForm.reset();
          this.router.navigate(['/']);
        });
      }
    }
  }
}
