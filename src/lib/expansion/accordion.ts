import {Directive, Input} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {coerceBooleanProperty} from '../core/coercion/boolean-property';
import 'rxjs/add/operator/takeUntil';

export type CdkAccordionDisplayMode = 'default' | 'flat';

/** Unique ID counter */
let nextId = 0;

/**
 * Directive whose purpose is to manage the expanded state of CdkAccordionItem children.
 */
@Directive({
  selector: '[cdk-accordion]',
})
export class CdkAccordion {
  /** A readonly id value to use for unique selection coordination. */
  readonly id = `cdk-accordion-${nextId++}`;

  /** Whether the expansion indicator should be hidden. */
  @Input() get hideToggle(): boolean { return this._hideToggle; }
  set hideToggle(show: boolean) { this._hideToggle = coerceBooleanProperty(show); }
  private  _hideToggle: boolean = false;

  /** Whether the panel set should use flat styling. */
  @Input() displayMode: CdkAccordionDisplayMode = 'default';

  /** Whether the panel set should allow multiple open panels. */
  @Input() get multi(): boolean { return this._multi; }
  set multi(multi: boolean) { this._multi = coerceBooleanProperty(multi); }
  private  _multi: boolean = false;
}
