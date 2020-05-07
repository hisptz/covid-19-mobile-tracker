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
import { LoginFormField } from 'src/app/models';

export const LOGIN_FORM_FIELDS: LoginFormField[] = [
  {
    id: 'serverUrl',
    placehoder: 'Enter server address',
    type: 'TEXT',
    readonly: false,
    isHidden: true,
    barcodeSettings: {
      allowBarcodeReaderOnText: true,
      allowBarcodeReaderOnNumerical: false,
      activateMultiline: false,
      keyPairSeparator: ':',
      multilineSeparator: ';',
    },
  },
  {
    id: 'username',
    placehoder: 'Enter username',
    type: 'TEXT',
    readonly: false,
    barcodeSettings: {
      allowBarcodeReaderOnText: false,
      allowBarcodeReaderOnNumerical: false,
      activateMultiline: false,
      keyPairSeparator: ':',
      multilineSeparator: ';',
    },
  },
  {
    id: 'password',
    placehoder: 'Enter password',
    type: 'PASSWORD',
    readonly: false,
    barcodeSettings: {
      allowBarcodeReaderOnText: false,
      allowBarcodeReaderOnNumerical: false,
      activateMultiline: false,
      keyPairSeparator: ':',
      multilineSeparator: ';',
    },
  },
];
