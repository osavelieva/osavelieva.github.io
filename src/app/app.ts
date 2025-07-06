import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as resumeJson from '../data/resume.json';
import { NgClass } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [DatePipe, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block' //max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-8
  }
})
export class App {
  protected readonly resume = resumeJson;
  protected readonly workItems = this.resume.work.map(workItem => ({
    ...workItem,
    summaryItems: workItem.summary.split('\n').map(item => item.replace('• ', '').replace('- ', '')).filter(Boolean)
  }));
  protected readonly skills = this.resume.skills.map(skill => skill.name).sort((a, b) => a.localeCompare(b));
  protected readonly currentYear = new Date().getFullYear();
}
