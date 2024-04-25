
import {AfterViewInit, Component, OnInit, ViewChild, inject} from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent  implements OnInit {


  ngOnInit(): void {  
    // this.returnHomeAfterTimeOut();
  }


  // returnHomeAfterTimeOut(){
  //   setTimeout(() => {
  //     console.timeEnd("primer intervalo");
  // }, 1000);
  // }
}
