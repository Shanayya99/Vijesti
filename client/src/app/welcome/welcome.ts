import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './welcome.html', 
  styleUrls: ['./welcome.css']
})
export class Welcome implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}