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
import { Program, AttributeReservedValue } from '../models';
import * as _ from 'lodash';

export function getAttributesWithReservedValues(programs: Program[]) {
  return _.uniq(
    _.flattenDeep(
      _.map(programs, (program: Program) => {
        return _.map(
          program.programTrackedEntityAttributes || [],
          (programTrackedEntityAttribute: any) => {
            return programTrackedEntityAttribute &&
              programTrackedEntityAttribute.trackedEntityAttribute &&
              programTrackedEntityAttribute.trackedEntityAttribute.generated
              ? programTrackedEntityAttribute.trackedEntityAttribute.id || []
              : [];
          },
        );
      }),
    ),
  );
}

export function getExpiriedAttributeReservedValues(
  attributeReservedValues: AttributeReservedValue[],
) {
  return _.flattenDeep(
    _.filter(
      attributeReservedValues,
      (attributeReservedValue: AttributeReservedValue) => {
        const expiryDate = new Date(attributeReservedValue.expiryDate);
        const today = new Date();
        return today >= expiryDate;
      },
    ),
  );
}
