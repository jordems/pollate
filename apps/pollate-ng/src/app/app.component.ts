import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgAuthService } from '@pollate/ng/shared/auth';

@Component({
  selector: 'pollate-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private readonly ngAuthService: NgAuthService) {}

  ngOnInit(): void {
    this.ngAuthService.upsertUser({}).subscribe();
  }
}
