import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appIfAuth]',
})
export class IfAuthDirective {
  @Input('appIfAuth')
  isDisplayIfAuth = false;
  subscription?: Subscription;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.isAuthenticated$.subscribe(
      (isAuth) => {
        this.viewContainer.clear();
        if (this.isDisplayIfAuth && isAuth) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
        if (!this.isDisplayIfAuth && !isAuth) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
