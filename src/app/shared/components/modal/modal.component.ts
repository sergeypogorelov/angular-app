import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input('header') header = 'Modal';
  @Output('onClose') closeEvent = new EventEmitter<any>();

  constructor() { }

  handleClose() {
    this.closeEvent.emit();
  }

  ngOnInit() {
  }

}
