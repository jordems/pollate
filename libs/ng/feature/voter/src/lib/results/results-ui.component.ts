import { Component, Input } from '@angular/core';
import { DisplayResponse, MemoizedQuestionData } from '@pollate/type';

interface Portion {
  amount: number;
  colour: string;
}

@Component({
  selector: 'pollate-results-ui',
  templateUrl: './results-ui.component.html',
  styleUrls: ['./results-ui.component.scss'],
})
export class ResultsUIComponent {
  @Input() responses!: DisplayResponse[];

  @Input() memoizedQuestionData!: MemoizedQuestionData;

  get portions(): string {
    const { responses } = this;
    const { responseCount, activeResponses } = this.memoizedQuestionData;

    if (!this.responses || this.responses.length === 0) {
      return '';
    }

    const portions = responses.map((response) =>
      ResultsUIComponent.calculatePortionOf360(
        activeResponses,
        response,
        responseCount
      )
    );

    return ResultsUIComponent.formatConicGradient(portions);
  }

  /**
   * Calculate a response's portion of 360 for the pie chart
   */
  private static calculatePortionOf360(
    activeResponses: MemoizedQuestionData['activeResponses'],
    response: DisplayResponse,
    responseCount: number
  ): Portion {
    return {
      amount: Math.round(
        360 * (activeResponses[response.response] / responseCount)
      ),
      colour: response.colour,
    };
  }

  /**
   * Formats the portions of 360 degrees into the css conic-gradient input for display
   */
  private static formatConicGradient(portions: Portion[]): string {
    let delta = 0;

    const css: string[] = [];

    // * Add portions with starting degree and ending degree
    for (const portion of portions) {
      if (portion.amount) {
        css.push(`${portion.colour} ${delta}deg ${delta + portion.amount}deg`);
        delta += portion.amount;
      }
    }

    return `background-image: conic-gradient(${css.join(',\n')});`;
  }
}
