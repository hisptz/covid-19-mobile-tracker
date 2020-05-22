import { Component, OnInit } from '@angular/core';
import { ProgramFormMetadataService } from 'src/app/shared/services/program-form-metadata.service';
import { DEFAULT_SELF_CHECK_PROGRAMS } from 'src/app/constants';
import { Observable } from 'rxjs';
import { Program } from 'src/app/models';

@Component({
  selector: 'app-manage-self-check',
  templateUrl: './manage-self-check.page.html',
  styleUrls: ['./manage-self-check.page.scss'],
})
export class ManageSelfCheckPage implements OnInit {
  currentProgram$: Observable<Program>;
  constructor(private programMetadata: ProgramFormMetadataService) {}

  async ngOnInit() {
    const programs = await this.programMetadata.getProgramByIds(
      DEFAULT_SELF_CHECK_PROGRAMS.map((program: any) => program.id),
    );
    console.log(programs);
  }
}
