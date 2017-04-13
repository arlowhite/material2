import {Output, EventEmitter, Input, OnDestroy, Optional, Host} from '@angular/core';
import {UniqueSelectionDispatcher} from '../core';
import {CdkAccordion} from './accordion';

/** Used to generate unique ID for each expansion panel. */
let nextId = 0;

/**
 * An abstract class to be extended and decorated as a component.  Sets up all
 * events and attributes needed to be managed by a CdkAccordion parent.
 */
export abstract class CdkAccordionItem implements OnDestroy {
  /** Event emitted every time the MdAccordianChild is closed. */
  @Output() closed = new EventEmitter<void>();
  /** Event emitted every time the MdAccordianChild is opened. */
  @Output() opened = new EventEmitter<void>();
  /** Event emitted when the MdAccordianChild is destroyed. */
  @Output() destroyed = new EventEmitter<void>();
  /** The unique MdAccordianChild id. */
  readonly id = `cdk-accordion-child-${nextId++}`;
  /** Whether the MdAccordianChild is expanded. */
  @Input() get expanded(): boolean { return this._expanded; }
  set expanded(expanded: boolean) {
    // Only emit events and update the internal value if the value changes.
    if (this._expanded !== expanded) {
      this._expanded = expanded;
      if (expanded) {
        this.opened.emit();
        /**
         * In the unique selection dispatcher, the id parameter is the id of the CdkAccordonItem,
         * the name value is the id of the accordion.
         */
        let accordionId = this.accordion ? this.accordion.id : this.id;
        this._uniqueSelectionDispatcher.notify(this.id, accordionId);
      } else {
        this.closed.emit();
      }
    }
  }
  private _expanded: boolean;

  constructor(@Optional() @Host() public accordion: CdkAccordion,
              protected _uniqueSelectionDispatcher: UniqueSelectionDispatcher) {
     _uniqueSelectionDispatcher.listen((id: string, accordionId: string) => {
       if (this.accordion && !this.accordion.multi &&
           this.accordion.id === accordionId && this.id !== id) {
         this.expanded = false;
       }
     });
    }

  /** Emits an event for the accordion child being destroyed. */
  ngOnDestroy() {
    this.destroyed.emit();
  }
}
