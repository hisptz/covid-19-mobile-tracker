/*
 *
 * Copyright 2019 HISP Tanzania
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 *
 * @since 2019
 * @author Joseph Chingalo <profschingalo@gmail.com>
 *
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToasterMessagesService } from 'src/app/shared/services/toaster-messages.service';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
})
export class PasswordInputComponent implements OnInit {
  @Input() dataElementId: string;
  @Input() categoryOptionComboId: string;
  @Input() lockingFieldStatus: boolean;
  @Input() data: any;
  @Input() barcodeSettings: any;
  @Input() placeholder: string;
  @Input() updateOnChangeValue: boolean;

  @Output() change = new EventEmitter();

  inputFieldValue: any;
  showBarcodeScanner: boolean;

  constructor(private toasterMessage: ToasterMessagesService) {
    this.showBarcodeScanner = false;
    this.inputFieldValue = '';
  }

  ngOnInit() {
    if (!this.placeholder) {
      this.placeholder = '';
    }
    const { allowBarcodeReaderOnText } = this.barcodeSettings;
    if (allowBarcodeReaderOnText) {
      this.showBarcodeScanner = allowBarcodeReaderOnText;
    }
    const id = `${this.dataElementId}-${this.categoryOptionComboId}`;
    if (this.data && this.data[id]) {
      this.inputFieldValue = this.data[id].value;
    }
  }
  updatePasswordValue() {
    const id = `${this.dataElementId}-${this.categoryOptionComboId}`;
    const value = this.inputFieldValue;
    const status = 'not-synced';
    this.change.emit({ id, value, status });
  }

  onChangeBarcodeReader(dataResponse) {
    const { isMultlined } = dataResponse;
    const { data } = dataResponse;
    if (!isMultlined && data) {
      this.inputFieldValue = data;
      this.updatePasswordValue();
    } else {
      this.toasterMessage.showToasterMessage(
        'Scanned value for multi line for text values is not yet supported',
      );
    }
  }
}
