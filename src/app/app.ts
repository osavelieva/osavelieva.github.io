import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as resumeJson from '../data/resume.json';
import { ResumeSchema } from '../shared/interfaces/resume.interface';

@Component({
  selector: 'app-root',
  imports: [DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block'
  }
})
export class App {
  protected readonly resume: ResumeSchema = resumeJson;
  protected readonly workItems = this.summaryItemsMapper();
  protected readonly skills = (this.resume.skills ?? [])
    .map(skill => skill.name)
    .sort((a, b) => (a ?? '').localeCompare(b ?? ''));
  protected readonly currentYear = new Date().getFullYear();

  private summaryItemsMapper() {
    const withSummaryLines = (this.resume.work ?? []).map(workItem => ({
      ...workItem,
      summaryLines: (workItem.summary ?? '').split('\n')
    }));

    return withSummaryLines.map(workItem => ({
      ...workItem,
      summaryItems: workItem.summaryLines
        .slice(0, workItem.summaryLines.length - 1)
        .map(item => item.replace('• ', ''))
        .filter(Boolean),
      skills: workItem.summaryLines.slice(-1)[0].split(' · ')
    }));
  }
}
