import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  public items:any=[];
  constructor() { }

  ngOnInit() {

    // for(int i=0; i<10; i++)
    //   {
    //    let obj={id:"aaaa",name:"dddd",desc:"ffff"};
    //     items.push(obj);
    //    }


for(let i = 0;i<5;i++)
{

let obj  = {id : "aa",name: "ss",desc:"vv"};
this.items.push(obj);

}

  }

}
