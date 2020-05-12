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
import { getRepository } from 'typeorm';
import { HttpClientService } from './http-client.service';
import {
  CurrentUser,
  ProgramRuleAction,
  ProgramRuleVariable,
  ProgramRule,
} from 'src/app/models';
import { DEFAULT_APP_METADATA } from 'src/app/constants';
import {
  ProgramRuleEntity,
  ProgramRuleActionEntity,
  ProgramRuleVariableEntity,
} from 'src/app/entites';
import { CONNECTION_NAME } from 'src/app/constants/db-options';

@Injectable({
  providedIn: 'root',
})
export class ProgramRuleEngineService {
  constructor(private httpCLientService: HttpClientService) {}

  discoveringProgramRulesFromServer(currentUser: CurrentUser): Observable<any> {
    const programMetadata = DEFAULT_APP_METADATA.programs;
    const { defaultIds } = programMetadata;
    const resource = 'programRules';
    const fields =
      'id,name,displayName,description,condition,program[id],programRuleActions[id]';
    const filter =
      defaultIds && defaultIds.length > 0
        ? `filter=program.id:in:[${defaultIds.join(',')}]`
        : ``;
    const url = `/api/${resource}.json?paging=false&fields=${fields}&${filter}`;
    return new Observable((observer) => {
      this.httpCLientService
        .get(url, true, currentUser)
        .then((response: any) => {
          const { programRules } = response;
          observer.next(programRules);
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    });
  }

  discoveringProgramRuleActionsFromServer(
    currentUser: CurrentUser,
  ): Observable<any> {
    const programMetadata = DEFAULT_APP_METADATA.programs;
    const { defaultIds } = programMetadata;
    const resource = 'programRuleActions';
    const fields =
      'id,data,content,programRuleActionType,location,programRule[id],dataElement[id],trackedEntityAttribute[id],programStageSection[id],programStage[id]';
    const filter =
      defaultIds && defaultIds.length > 0
        ? `filter=programRule.program.id:in:[${defaultIds.join(',')}]`
        : ``;
    const url = `/api/${resource}.json?paging=false&fields=${fields}&${filter}`;
    return new Observable((observer) => {
      this.httpCLientService
        .get(url, true, currentUser)
        .then((response: any) => {
          const { programRuleActions } = response;
          observer.next(programRuleActions);
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    });
  }

  discoveringProgramRuleVariablesFromServer(
    currentUser: CurrentUser,
  ): Observable<any> {
    const programMetadata = DEFAULT_APP_METADATA.programs;
    const { defaultIds } = programMetadata;
    const resource = 'programRuleVariables';
    const fields =
      'id,name,displayName,programRuleVariableSourceType,program[id],dataElement[id],trackedEntityAttribute[id],programStageSection[id],programStage[id]';
    const filter =
      defaultIds && defaultIds.length > 0
        ? `filter=program.id:in:[${defaultIds.join(',')}]`
        : ``;
    const url = `/api/${resource}.json?paging=false&fields=${fields}&${filter}`;
    return new Observable((observer) => {
      this.httpCLientService
        .get(url, true, currentUser)
        .then((response: any) => {
          const { programRuleVariables } = response;
          observer.next(programRuleVariables);
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    });
  }

  async getAllProgramRulesMetadata(programIds: string[]) {
    const programRuleActions = [];
    const programRules = [];
    const programRuleVariables = [];
    try {
      for (const programId of programIds) {
        const programRuleMetaData = await this.getProgramRulesMetadataByProgramId(
          programId,
        );
        programRuleActions.push(
          _.map(
            programRuleMetaData.programRuleActions || [],
            (programRuleAction: any) => {
              return { ...programRuleAction, programId };
            },
          ),
        );
        programRules.push(
          _.map(programRuleMetaData.programRules || [], (programRule: any) => {
            return { ...programRule, programId };
          }),
        );
        programRuleVariables.push(
          _.map(
            programRuleMetaData.programRuleVariables || [],
            (programRuleVariable: any) => {
              return { ...programRuleVariable, programId };
            },
          ),
        );
      }
    } catch (error) {}
    return {
      programRuleActions: _.flattenDeep(programRuleActions),
      programRules: _.flattenDeep(programRuleActions),
      programRuleVariables: _.flattenDeep(programRuleVariables),
    };
  }

  async getProgramRulesMetadataByProgramId(programId: string) {
    let programRuleActions = [];
    let programRules = [];
    let programRuleVariables = [];
    try {
      programRules = await this.getProgramRules([programId]);
      programRuleVariables = await this.getProgramRuleVaribales([programId]);
      const programRuleIds = _.flattenDeep(
        _.map(programRules, (programRule: any) => programRule.id || []),
      );
      programRuleActions = await this.getProgramRuleActions(programRuleIds);
    } catch (error) {}
    return {
      programRuleActions,
      programRules,
      programRuleVariables,
    };
  }

  async getProgramRuleVaribales(programIds: string[]) {
    const repository = getRepository(
      ProgramRuleVariableEntity,
      CONNECTION_NAME,
    );
    const allEntities = await repository.find();
    return programIds
      ? _.filter(allEntities, (entity: ProgramRuleVariable) => {
          return (
            entity &&
            entity.program &&
            entity.program.id &&
            programIds.includes(entity.program.id)
          );
        })
      : _.map(allEntities, (entity: any) => {
          return { ...{}, ...entity };
        });
  }

  async getProgramRules(programIds: string[]) {
    const repository = getRepository(ProgramRuleEntity, CONNECTION_NAME);
    const allEntities = await repository.find();
    return programIds
      ? _.filter(allEntities, (entity: ProgramRule) => {
          return (
            entity &&
            entity.program &&
            entity.program.id &&
            programIds.includes(entity.program.id)
          );
        })
      : _.map(allEntities, (entity: any) => {
          return { ...{}, ...entity };
        });
  }

  async getProgramRuleActions(programRuleIds: string[]) {
    const repository = getRepository(ProgramRuleActionEntity, CONNECTION_NAME);
    const allEntities = await repository.find();
    return programRuleIds
      ? _.filter(allEntities, (entity: ProgramRuleAction) => {
          return (
            entity &&
            entity.programRule &&
            entity.programRule.id &&
            programRuleIds.includes(entity.programRule.id)
          );
        })
      : _.map(allEntities, (entity: any) => {
          return { ...{}, ...entity };
        });
  }

  savingProgramRulesToLocalStorage(programRules: any[]): Observable<any> {
    return new Observable((observer) => {
      const repository = getRepository(ProgramRuleEntity, CONNECTION_NAME);
      const chunk = 50;
      repository
        .save(programRules, { chunk })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    });
  }

  savingProgramRuleActionsToLocalStorage(
    programRuleActions: any[],
  ): Observable<any> {
    return new Observable((observer) => {
      const repository = getRepository(
        ProgramRuleActionEntity,
        CONNECTION_NAME,
      );
      const chunk = 50;
      repository
        .save(programRuleActions, { chunk })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    });
  }

  savingProgramRuleVariablesToLocalStorage(
    programRuleVariables: any[],
  ): Observable<any> {
    return new Observable((observer) => {
      const repository = getRepository(
        ProgramRuleVariableEntity,
        CONNECTION_NAME,
      );
      const chunk = 50;
      repository
        .save(programRuleVariables, { chunk })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    });
  }
}
