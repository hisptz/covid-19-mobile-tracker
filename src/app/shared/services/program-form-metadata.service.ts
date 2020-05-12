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
  TrackedEntityAttributeEntity,
  ProgramProgramTrackedEntityAttributeEntity,
} from 'src/app/entites';
import {
  Program,
  ProgramTrackedEntityAttribute,
  TrackedEntityAttribute,
  ProgramProgramStage,
  ProgramStageSection,
} from 'src/app/models';
import { CONNECTION_NAME } from 'src/app/constants/db-options';
import { DataElementService } from './data-element.service';
import { ProgramStageSectionService } from './program-stage-section.service';

@Injectable({
  providedIn: 'root',
})
export class ProgramFormMetadataService {
  constructor(
    private dataElementService: DataElementService,
    private programStageSectionService: ProgramStageSectionService,
  ) {}

  async getProgramByIds(ids: string[], shouldIncludeAllMetadata = true) {
    let programs = [];
    try {
      // TODO Entry forms
      // TODO get program rules
      const programEntites: Program[] = await this.getProgramEntities(ids);
      const programTrackedEntityAttributes = await this.getprogramTrackedEntityAttributes(
        ids,
      );
      const programStages = await this.getprogramStages(ids);
      programs = shouldIncludeAllMetadata
        ? _.map(programEntites, (programEntity: any) => {
            const id = programEntity.id || '';
            return {
              ...programEntity,
              programTrackedEntityAttributes: _.filter(
                programTrackedEntityAttributes,
                (programTrackedEntityAttribute: any) => {
                  return (
                    programTrackedEntityAttribute &&
                    programTrackedEntityAttribute.programId &&
                    programTrackedEntityAttribute.programId === id
                  );
                },
              ),
              programStages: _.filter(programStages, (programStage: any) => {
                return (
                  programStage &&
                  programStage.programId &&
                  programStage.programId === id
                );
              }),
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
      const programTrackedEntityAttributeIs = _.flattenDeep(
        _.map(
          programTrackedEntityAttributeEntites,
          (
            programTrackedEntityAttributeEntity: ProgramTrackedEntityAttribute,
          ) => programTrackedEntityAttributeEntity.id || [],
        ),
      );
      const trackedEntityAttributeEntities: any[] = await this.getTrackedEntityAttributeEntities(
        programTrackedEntityAttributeIs,
      );
      programTrackedEntityAttributes = _.map(
        programTrackedEntityAttributeEntites,
        (
          programTrackedEntityAttributeEntity: ProgramTrackedEntityAttribute,
        ) => {
          let trackedEntityAttributeObj = _.find(
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
          trackedEntityAttributeObj = trackedEntityAttributeObj
            ? trackedEntityAttributeObj
            : {
                trackedEntityAttribute: {
                  id: programTrackedEntityAttributeEntity.id,
                },
              };
          return {
            ...programTrackedEntityAttributeEntity,
            trackedEntityAttribute:
              trackedEntityAttributeObj.trackedEntityAttribute,
          };
        },
      );
    } catch (error) {}
    return programTrackedEntityAttributes;
  }

  async getprogramStages(programIds: string[]) {
    let programStages = [];
    try {
      const programProgramStageEntities: any = await this.getProgramProgramStageEntities(
        programIds,
      );
      const programStageIds = _.flattenDeep(
        _.map(
          programProgramStageEntities,
          (programProgramStageEntity: ProgramProgramStage) =>
            programProgramStageEntity.id || [],
        ),
      );
      const dataElements = await this.getProgramStageDataElements(
        programProgramStageEntities,
      );
      const programStageSectionsByProgram = await this.getProgramStageSections(
        programStageIds,
      );
      programStages = _.map(
        programProgramStageEntities,
        (programProgramStageEntity: ProgramProgramStage) => {
          const {
            programStageDataElements,
            programStageSections,
          } = programProgramStageEntity;
          return {
            ...programProgramStageEntity,
            programStageDataElements: _.map(
              programStageDataElements,
              (programStageDataElement) => {
                const id =
                  programStageDataElement &&
                  programStageDataElement.dataElement &&
                  programStageDataElement.dataElement.id
                    ? programStageDataElement.dataElement.id
                    : '';
                const dataElement = _.find(
                  dataElements,
                  (dataElementObj: any) =>
                    dataElementObj &&
                    dataElementObj.id &&
                    dataElementObj.id === id,
                );
                return {
                  ...programStageDataElement,
                  dataElement: dataElement ? dataElement : { id },
                };
              },
            ),
            programStageSections: _.flattenDeep(
              _.map(programStageSections, (programStageSection: any) => {
                const id =
                  programStageSection && programStageSection.id
                    ? programStageSection.id
                    : '';
                const section = _.find(
                  programStageSectionsByProgram,
                  (sectionObj: ProgramStageSection) => {
                    return sectionObj && sectionObj.id === id;
                  },
                );
                return section
                  ? {
                      ...section,
                      dataElements: _.map(
                        section.dataElements,
                        (dataElement: any) => {
                          const dataElementId =
                            dataElement && dataElement.id ? dataElement.id : '';
                          const filteredDataElement = _.find(
                            dataElements,
                            (dataElementObj: any) =>
                              dataElementObj &&
                              dataElementObj.id &&
                              dataElementObj.id === dataElementId,
                          );
                          return filteredDataElement || dataElement;
                        },
                      ),
                    }
                  : [];
              }),
            ),
          };
        },
      );
    } catch (error) {}
    return programStages;
  }

  async getProgramStageDataElements(programProgramStageEntities) {
    const dataElementIds = _.map(
      _.flattenDeep(
        _.map(
          programProgramStageEntities,
          (programProgramStageEntity: ProgramProgramStage) =>
            programProgramStageEntity.programStageDataElements || [],
        ),
      ),
      (programStageDataElement: any) => {
        return programStageDataElement &&
          programStageDataElement.dataElement &&
          programStageDataElement.dataElement.id
          ? programStageDataElement.dataElement.id
          : [];
      },
    );
    return await this.dataElementService.getSavedDataElementsByIds(
      dataElementIds,
    );
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
      ProgramProgramTrackedEntityAttributeEntity,
      CONNECTION_NAME,
    );
    return await repository.find({ programId: In(prograIds) });
  }

  async getProgramProgramStageEntities(programIds: string[]) {
    const repository = getRepository(
      ProgramProgramStageEntity,
      CONNECTION_NAME,
    );
    return await repository.find({ programId: In(programIds) });
  }

  async getProgramStageSections(programStageIds: string[]) {
    const repository = getRepository(
      ProgramStageSectionEntity,
      CONNECTION_NAME,
    );
    const programStageSectionEntities = await repository.find({
      programStageId: In(programStageIds),
    });
    const sectionsIds = _.flattenDeep(
      _.map(
        programStageSectionEntities,
        (programStageSectionEntity: any) => programStageSectionEntity.id || [],
      ),
    );
    return await this.programStageSectionService.getProgramStageSectionsByIds(
      sectionsIds,
    );
  }

  async getProgramStageEntryFormEntities(programStageIds: string[]) {
    const repository = getRepository(
      ProgramStageEntryFormEntity,
      CONNECTION_NAME,
    );
    return await repository.find({ id: In(programStageIds) });
  }
}
