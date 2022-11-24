import { ApiService } from './../services/api.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  
  produtoForm!: FormGroup;
  actionBtn: String = 'Guardar';

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.produtoForm = this.formbuilder.group({
      name: ['', Validators.required],
      website: ['', Validators.required],
      foundation: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Actualizar';
      this.produtoForm.controls['name'].setValue(this.editData.name);
      this.produtoForm.controls['website'].setValue(this.editData.website);
      this.produtoForm.controls['foundation'].setValue(
        this.editData.foundation
      );
    }
  }

  addProduto() {
    if (!this.editData) {
      if (this.produtoForm.valid) {
        this.api.postProduto(this.produtoForm.value).subscribe({
          next: (res) => {
            alert('Editado con exito!!');
            this.produtoForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Error al editar!');
          },
        });
      }
    } else {
      this.updateProduto();
    }
  }
  updateProduto() {
    this.api.putProduto(this.produtoForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Actualizado con exito!');
        this.produtoForm.reset();
        this.dialogRef.close('Atualizar');
      },
      error: () => {
        alert('Error al actualizar!');
      },
    });
  }
}
