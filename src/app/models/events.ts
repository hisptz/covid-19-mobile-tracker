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
export interface Events {
  id: string;
  event?: string;
  enrollment?: string;
  program: string;
  programName?: string;
  programStage: string;
  orgUnit: string;
  orgUnitName?: string;
  status: string;
  eventDate: string;
  dueDate: string;
  deleted: string;
  attributeCategoryOptions: string;
  attributeCc?: string;
  notes?: string;
  eventType?: string;
  coordinate?: Coordinate;
  dataValues: EventDataValue[];
  trackedEntityInstance?: string;
}

export interface Coordinate {
  latitude: string;
  longiture: string;
}

export interface EventDataValue {
  dataElement: string;
  value: string;
}
