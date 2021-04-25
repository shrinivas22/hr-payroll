import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../Services/employee.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { headerTitleService } from '../../Services/title.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-employee-edit',
    templateUrl: './employee-edit.component.html',
    styleUrls: ['./star-rating.css'],
})
export class EmployeeEditComponent implements OnInit {

    employee: any = {};
    _id: String = "";
    selectedFile!: File;
    img_path: any = "../../../assets/image-employee.png";
    stars: number[] = [1, 2, 3, 4, 5];
    selectedValue: number = 0;

    constructor(private activatedRoute: ActivatedRoute, private _employeeService: EmployeeService,
        private router: Router, private _headerTitleService: headerTitleService, private sanitizer: DomSanitizer) {

    }




    ngOnInit() {
        function blobToDataURL(blob: any, callback: any, img_path: any) {
            var a = new FileReader();
            a.onload = function (e: any) {
                callback(e.target.result);
                img_path = e.target.result;
                console.log(e.target.result);
            }
            a.readAsDataURL(blob);

        }

        this.activatedRoute.params.subscribe(params => {
            console.log('IN edit component');

            this._id = params['employeeId'];
            console.log(this._id);
            console.log('Above is the id');
            this._employeeService.getEmployeeById(this._id)
                .subscribe(
                    (data: any) => {
                        this.employee = data;
                        console.log('in getEmployee');
                        console.log(JSON.stringify(data));
                        console.log(URL.createObjectURL(new Blob([data.image], { type: 'image/png' })));
                        this.img_path = 'data:image/png;base64,' + this.employee.image;

                        //this.img_path=this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(new Blob([data.image], { type: 'image/png' })));
                        console.log(this.img_path);

                    },
                    (error) => console.log(error)
                );
        });
        this._headerTitleService.setTitle('Employees Home');
        this._headerTitleService.setRoute('');

    }
    onFileChanged(event: any) {
        console.log(event.target.files);
        this.selectedFile = event.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event)=>{
            this.img_path=reader.result;
        };
    }
    onUpload() {
        // this.http is the injected HttpClient
        const uploadData = new FormData();
        uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
        console.log( this.selectedFile,uploadData);
        this.employee.image = uploadData;
    }

    deleteEmployee() {
        this._employeeService.deleteEmployee(this._id)
            .subscribe(
                (data: any) => {
                    console.log('inside delete');
                    //this.router.navigate(['/main'])

                },
                (error) => console.log(error)
            );
    }
    countStar(star: any) {
        this.selectedValue = star;
        this.employee.rating = star;
        console.log('Value of star', star, this.stars);
    }
    updateEmployee() {
        console.log('I am inside update employee');
        console.log(this.employee);
        console.log(this.employee.bonus, this.employee.bonus.reimbursements);
        this._employeeService.updateEmployee(this._id, this.employee)
            .subscribe(
                (data: any) => {
                    console.log('I am in update employee');
                    this.router.navigate(['/main'])
                },
                (error) => console.log(error));

    }

}