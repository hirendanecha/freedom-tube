import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { CommonService } from 'src/app/@shared/services/common.service';
import { ToastService } from 'src/app/@shared/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, AfterViewInit {
  useDetails: any = {};
  allCountryData: any = [];
  isEdit = false;

  apiUrl = environment.apiUrl + 'customers/';

  userForm = new FormGroup({
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    Country: new FormControl('', [Validators.required]),
    Zip: new FormControl('', [Validators.required]),
    MobileNo: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    City: new FormControl('', [Validators.required]),
    State: new FormControl('', [Validators.required]),
    Username: new FormControl('', [Validators.required]),
    UserID: new FormControl('', [Validators.required]),
    ProfilePicName: new FormControl('', [Validators.required]),
    CoverPicName: new FormControl('', [Validators.required]),
  });

  constructor(
    public authService: AuthService,
    private commonService: CommonService,
    private toasterService: ToastService,
    private spinner: NgxSpinnerService
  ) {
    this.useDetails = JSON.parse(this.authService.getUserData() as any);
    console.log(this.useDetails);
  }
  ngOnInit(): void {
    this.getAllCountries();
    this.getUserDetails();
  }
  ngAfterViewInit(): void {
  }

  getUserDetails(): void {
    const data = {
      FirstName: this.useDetails?.FirstName,
      LastName: this.useDetails?.LastName,
      Country: this.useDetails?.Country,
      Zip: this.useDetails?.Zip,
      City: this.useDetails?.City,
      State: this.useDetails?.State,
      Username: this.useDetails?.Username,
      MobileNo: this.useDetails?.MobileNo || '',
      UserID: this.useDetails?.UserID,
      ProfilePicName: this.useDetails?.ProfilePicName,
      CoverPicName: this.useDetails?.CoverPicName,
    };
    this.userForm.setValue(data);
  }

  saveChanges(): void {
    this.spinner.show();
    if (this.userForm?.value) {
      const profileId = this.useDetails.Id;
      const apiUrl = `${this.apiUrl}profile/${profileId}`;
      this.commonService.update(apiUrl, this.userForm.value).subscribe({
        next: (res: any) => {
          this.spinner.hide();
          this.isEdit = false;
          this.toasterService.success(res.message);
        },
        error: (error: any) => {
          this.spinner.hide();
          console.log(error);
        },
      });
    } else {
      this.spinner.hide();
      this.toasterService.danger('something went wrong!');

    }
  }

  getAllCountries() {
    this.commonService.get(`${this.apiUrl}countries`).subscribe({
      next: (result) => {
        this.allCountryData = result;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  changeCountry(e: any) {
    this.userForm.get('Country')!.setValue(e.target.value);
    this.userForm.get('Zip')!.setValue('');
    this.userForm.get('State')!.setValue('');
    this.userForm.get('City')!.setValue('');
  }

  onZipChange() {
    const country = this.userForm.value.Country;
    this.commonService.get(`${this.apiUrl}zip/?country=${country}`).subscribe({
      next: (data: any[]) => {
        const zip_data = data[0];
        if (zip_data?.state) {
          zip_data
            ? this.userForm.get('State')!.setValue(zip_data.state)
            : null;
          zip_data ? this.userForm.get('City')!.setValue(zip_data.city) : null;
        } else {
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  resetForm() {
    this.getUserDetails();
  }

  onChangeData(): void {
    this.isEdit = true;
  }
}
