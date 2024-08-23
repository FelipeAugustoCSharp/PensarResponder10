import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IItems } from 'src/app/models/IItem';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit{

  itemList$!: Observable<IItems[]>;
  selectedItem!: IItems;

  constructor(private itemService: ItemsService) { }

  ngOnInit(): void {
    this.itemList$ = this.itemService.itemList$;
  }

  onUpdate(item: IItems) {
   this.selectedItem = item;
   
  }

  onDelete(id: string) {
    this.itemService.deleteItem(id).subscribe(() => {
      console.log('Item deletado com sucesso');
    });
  }
}