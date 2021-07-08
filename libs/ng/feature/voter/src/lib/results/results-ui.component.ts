import { Component, Input, OnInit } from '@angular/core';
import { MemoizedQuestionData } from '@pollate/type';
@Component({
  selector: 'pollate-results-ui',
  templateUrl: './results-ui.component.html',
  styleUrls: ['./results-ui.component.scss'],
})
export class ResultsUIComponent implements OnInit {
  @Input() memoizedQuestionData!: MemoizedQuestionData;

  constructor() {
    null;
  }

  ngOnInit(): void {
    null;
  }
}
