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
import * as _ from 'lodash';
import { getRepository, Repository, In } from 'typeorm';
import {
  ProgramEntity,
  ProgramProgramStageEntity,
  ProgramStageSectionEntity,
  ProgramStageEntryFormEntity,
  ProgramTrackedEntityAttributeEntity,
  TrackedEntityAttributeEntity,
} from 'src/app/entites';
import {
  Program,
  ProgramTrackedEntityAttribute,
  TrackedEntityAttribute,
} from 'src/app/models';
import { CONNECTION_NAME } from 'src/app/constants/db-options';
import { DataElementService } from './data-element.service';

@Injectable({
  providedIn: 'root',
})
export class ProgramFormMetadataService {
  constructor(private dataElementService: DataElementService) {}

  async getProgramByIds(ids: string[], shouldIncludeAllMetadata = true) {
    let programs = [];
    try {
      // TODO Entry forms
      const programEntites: Program[] = await this.getProgramEntities(ids);
      const programTrackedEntityAttributes = await this.getprogramTrackedEntityAttributes(
        ids,
      );
      const programStages = [];
      programs = shouldIncludeAllMetadata
        ? _.map(programEntites, (programEntity: any) => {
            return {
              ...programEntity,
              programTrackedEntityAttributes,
              programStages,
            };
          })
        : programEntites;
    } catch (error) {}
    return _.flattenDeep(programs);
  }

  async getprogramTrackedEntityAttributes(programIds: string[]) {
    let programTrackedEntityAttributes = [];
    try {
      const programTrackedEntityAttributeEntites = await this.getProgramTrackedEntityAttributeEntities(
        programIds,
      );
      const programTrackedEntityAttributeIs = _.map(
        programTrackedEntityAttributeEntites,
        (programTrackedEntityAttributeEntity: ProgramTrackedEntityAttribute) =>
          programTrackedEntityAttributeEntity.id || '',
      );
      const trackedEntityAttributeEntities: any[] = await this.getProgramTrackedEntityAttributeEntities(
        programTrackedEntityAttributeIs,
      );
      programTrackedEntityAttributes = _.map(
        programTrackedEntityAttributeEntites,
        (
          programTrackedEntityAttributeEntity: ProgramTrackedEntityAttribute,
        ) => {
          const trackedEntityAttribute = _.find(
            trackedEntityAttributeEntities,
            (trackedEntityAttributeEntity: TrackedEntityAttribute) => {
              return (
                programTrackedEntityAttributeEntity &&
                programTrackedEntityAttributeEntity.id &&
                trackedEntityAttributeEntity &&
                trackedEntityAttributeEntity.programTrackedEntityAttributeId &&
                trackedEntityAttributeEntity.programTrackedEntityAttributeId ===
                  programTrackedEntityAttributeEntity.id
              );
            },
          );
          return {
            ...programTrackedEntityAttributeEntity,
            trackedEntityAttribute: _.omit(trackedEntityAttribute, [
              'programTrackedEntityAttributeId',
            ]),
          };
        },
      );
    } catch (error) {}
    return programTrackedEntityAttributes;
  }

  async getprogramStages(programIds: string) {
    let programStages = [];
    try {
      programStages = _.map([], (d) => d);
    } catch (error) {}
    return programStages;
  }

  async getProgramEntities(ids: string[]) {
    const programRepository = getRepository(
      'ProgramEntity',
      CONNECTION_NAME,
    ) as Repository<ProgramEntity>;
    return await programRepository.findByIds(ids);
  }

  async getTrackedEntityAttributeEntities(ids: string[]) {
    const repository = getRepository(
      TrackedEntityAttributeEntity,
      CONNECTION_NAME,
    );
    return await repository.find({ programTrackedEntityAttributeId: In(ids) });
  }

  async getProgramTrackedEntityAttributeEntities(prograIds: string[]) {
    const repository = getRepository(
      ProgramTrackedEntityAttributeEntity,
      CONNECTION_NAME,
    );
    return await repository.find({ programId: In(prograIds) });
  }

  async getProgramProgramStageEntities(prograIds: string[]) {
    const repository = getRepository(
      ProgramProgramStageEntity,
      CONNECTION_NAME,
    );
    return await repository.find({ programId: In(prograIds) });
  }

  async getProgramStageSectionEntities(programStageIds: string[]) {
    const repository = getRepository(
      ProgramStageSectionEntity,
      CONNECTION_NAME,
    );
    return await repository.find({ programStageId: In(programStageIds) });
  }

  async getProgramStageEntryFormEntities(programStageIds: string[]) {
    const repository = getRepository(
      ProgramStageEntryFormEntity,
      CONNECTION_NAME,
    );
    return await repository.find({ id: In(programStageIds) });
  }
}
