import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IItems } from 'src/app/models/IItem';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.scss']
})
export class FormDataComponent implements OnInit, OnChanges {

  @Input() itemFilho!: IItems;

  itemForm!: FormGroup;
  id!: string;

  constructor(private itemService: ItemsService, 
              private ActivedRoute: ActivatedRoute, 
              private formBuilder: FormBuilder) {
                
    this.itemForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.id = this.ActivedRoute.snapshot.params['id'];
    console.log(this.id);

    if (this.id && this.itemFilho) {
      this.itemForm.patchValue(this.itemFilho);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemFilho'] && this.itemFilho) {
      this.itemForm.patchValue(this.itemFilho);
    }
  }

  onSave() {
    if (this.itemForm.valid) {
      if (this.itemFilho && this.itemFilho.id) {
        this.itemService.updateItem((this.itemFilho.id).toString(), this.itemForm.value).subscribe(() => {
          console.log('Item atualizado com sucesso');
          this.itemForm.reset()
        });
      } else {
        this.itemService.createItem(this.itemForm.value).subscribe(() => {
          console.log('Item criado com sucesso');
        });
      }
    } 
  }

  limpar() {
    this.itemForm.reset()

  }
}
