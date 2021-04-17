import { Component} from '@angular/core';
import { MyService } from './Services/MyService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MyService]
})
export class AppComponent {

}
