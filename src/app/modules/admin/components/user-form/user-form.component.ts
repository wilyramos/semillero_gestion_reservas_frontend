import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode: boolean = false;

  rolesList = [
    { id: 1, name: 'ROLE_ADMIN' },
    { id: 2, name: 'ROLE_USER' }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe el usuario si es edición
  ) {
    this.isEditMode = !!data; // Si data existe, es modo edición

    this.userForm = this.fb.group({
      username: [data?.username || '', [Validators.required, Validators.minLength(4)]],
      password: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]],
      roleIds: [this.mapRolesToIds(data?.roleNames) || [], [Validators.required]]
    });
  }

  ngOnInit(): void { }

  // Convierte los nombres de roles del backend a IDs para el select
  private mapRolesToIds(roleNames: string[] | undefined): number[] {
    if (!roleNames) return [];
    return this.rolesList
      .filter(r => roleNames.includes(r.name))
      .map(r => r.id);
  }

  save(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}