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
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { getRepository, In } from 'typeorm';
import { HttpClientService } from './http-client.service';
import { AttributeReservedValueEntity } from 'src/app/entites';
import { CONNECTION_NAME, MAXIMUM_RESERVED_VALUES } from 'src/app/constants';
import { Program, AttributeReservedValue } from 'src/app/models';
import { ProgramFormMetadataService } from './program-form-metadata.service';
import {
  getAttributesWithReservedValues,
  generateUid,
  getExpiriedAttributeReservedValues,
} from 'src/app/helpers';

@Injectable({
  providedIn: 'root',
})
export class AttributeReservedValueManagerService {
  constructor(
    private programFormMetadataService: ProgramFormMetadataService,
    private httpClientService: HttpClientService,
  ) {}

  async regenerateAttributeReservedValues(programs?: Program[]) {
    try {
      programs =
        programs && programs.length > 0
          ? programs
          : await this.programFormMetadataService.getProgramByIds([]);
      const attributes = getAttributesWithReservedValues(programs);
      for (const attribute of attributes) {
        const attributeReservedValues = await this.getAttributeReservedValues(
          attribute,
        );
        const expiriedAttributeReservedValues = getExpiriedAttributeReservedValues(
          attributeReservedValues,
        );
        const numberToReserve =
          MAXIMUM_RESERVED_VALUES +
          expiriedAttributeReservedValues.length -
          attributeReservedValues.length;
        if (numberToReserve > 0) {
          await this.clearExpiredAttributeReservedValues(
            expiriedAttributeReservedValues,
          );
          let generatedAttributeReservedValues = await this.getGeneratedAttributeValuesFromServer(
            attribute,
            numberToReserve,
          );
          generatedAttributeReservedValues = _.map(
            generatedAttributeReservedValues,
            (generatedAttributeReservedValue: any) => {
              return {
                ...generatedAttributeReservedValue,
                id: generateUid(),
                attribute,
              };
            },
          );
          await this.saveGeneratedAttributeReservedValues(
            generatedAttributeReservedValues,
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getGeneratedAttributeValuesFromServer(
    attribute: string,
    numberToReserve = MAXIMUM_RESERVED_VALUES,
  ) {
    const generatedValues = [];
    try {
      const url = `/api/trackedEntityAttributes/${attribute}/generateAndReserve?numberToReserve=${numberToReserve}`;
      const response = await this.httpClientService.get(url, true);
      generatedValues.push(response);
    } catch (error) {}
    return _.flattenDeep(generatedValues);
  }

  async clearExpiredAttributeReservedValues(
    expiriedAttributeReservedValues: AttributeReservedValue[],
  ) {
    const repository = getRepository(
      AttributeReservedValueEntity,
      CONNECTION_NAME,
    );
    try {
      const ids = _.flattenDeep(
        _.map(
          expiriedAttributeReservedValues,
          (attributeReservedValue: AttributeReservedValue) =>
            attributeReservedValue.id || [],
        ),
      );
      if (ids.length > 0) {
        await repository.delete({ id: In(ids) });
      }
    } catch (error) {}
  }

  async getAttributeReservedValues(attribute?: string) {
    const repository = getRepository(
      AttributeReservedValueEntity,
      CONNECTION_NAME,
    );
    return attribute
      ? await repository.find({ attribute: In([attribute]) })
      : await repository.find();
  }

  async saveGeneratedAttributeReservedValues(
    generatedAttributeReservedValues: any[],
  ) {
    const repository = getRepository(
      AttributeReservedValueEntity,
      CONNECTION_NAME,
    );
    const chunk = 50;
    await repository.save(generatedAttributeReservedValues, { chunk });
  }
}
