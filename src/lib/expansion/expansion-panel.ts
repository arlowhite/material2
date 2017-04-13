import {
  Component,
  Directive,
  EventEmitter,
  Host,
  Input,
  Output,
  ViewEncapsulation,
  AfterContentInit,
  OnDestroy,
  ContentChildren,
  QueryList,
  Optional,
  forwardRef,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import {CdkAccordion, CdkAccordionDisplayMode} from './accordion';
import {CdkAccordionItem} from './accordion-item';
import {UniqueSelectionDispatcher} from '../core';

export type ExpansionPanelState = 'expanded' | 'collapsed';

/** Time and timing curve for expansion panel animations. */
export const EXPANSION_PANEL_ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';


/**
 * <md-expansion-panel> component.
 *
 * This component can be used as a single element to show expandable content, or as one of
 * multiple children of an element with the CdkAccordion directive attached.
 *
 * Please refer to README.md for examples on how to use it.
 */
@Component({
  moduleId: module.id,
  styleUrls: ['./expansion-panel.css'],
  selector: 'md-expansion-panel, mat-expansion-panel',
  templateUrl: './expansion-panel.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'mat-expansion-panel',
    '[class.mat-expanded]': 'expanded',
    '[@displayMode]': '_getDisplayMode()',
  },
  providers: [
    {provide: CdkAccordionItem, useExisting: forwardRef(() => MdExpansionPanel)}
  ],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({height: '0px'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate(EXPANSION_PANEL_ANIMATION_TIMING)),
    ]),
    trigger('displayMode', [
      state('collapsed', style({margin: '0'})),
      state('default', style({margin: '16px 0'})),
      state('flat', style({margin: '0'})),
      transition('flat <=> collapsed, default <=> collapsed, flat <=> default',
                 animate(EXPANSION_PANEL_ANIMATION_TIMING)),
    ]),
  ],
})
export class MdExpansionPanel extends CdkAccordionItem {
  /** Whether the toggle indicator should be hidden. */
  @Input() hideToggle: boolean = true;

  /** The expansion panel style. */
  @Input() panelStyle: CdkAccordionDisplayMode = 'default';

  constructor(@Optional() @Host() accordion: CdkAccordion,
              _uniqueSelectionDispatcher: UniqueSelectionDispatcher) {
    super(accordion, _uniqueSelectionDispatcher);
  }

  /** Toggles the expanded state of the panel. */
  toggle(): void {
    this.expanded = !this.expanded;
  }

  /** Whether the expansion indicator should be hidden. */
  _getHideToggle(): boolean {
    if (this.accordion) {
      return this.accordion.hideToggle;
    }
    return this.hideToggle;
  }

  /** Gets the panel's display mode. */
  _getDisplayMode(): CdkAccordionDisplayMode | ExpansionPanelState {
    if (!this.expanded) {
      return this._getExpandedState();
    }
    if (this.accordion) {
      return this.accordion.displayMode;
    }
    return this._getExpandedState();
  }

  /** Gets the expanded state string. */
  _getExpandedState(): ExpansionPanelState {
    return this.expanded ? 'expanded' : 'collapsed';
  }
}
