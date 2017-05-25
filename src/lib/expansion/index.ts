import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompatibilityModule, UNIQUE_SELECTION_DISPATCHER_PROVIDER} from '../core';
import {
  MdExpansionPanelHeader,
  MdExpansionPanelDescription,
  MdExpansionPanelTitle
} from './expansion-panel-header';
import {MdExpansionPanel} from './expansion-panel';
import {CdkAccordion} from './accordion';
import {CdkAccordionItem} from './accordion-item';

@NgModule({
  imports: [CompatibilityModule, CommonModule],
  exports: [
    MdExpansionPanel,
    MdExpansionPanelHeader,
    CdkAccordion,
    MdExpansionPanelTitle,
    MdExpansionPanelDescription
  ],
  declarations: [
    MdExpansionPanel,
    MdExpansionPanelHeader,
    CdkAccordion,
    MdExpansionPanelTitle,
    MdExpansionPanelDescription
  ],
  providers: [UNIQUE_SELECTION_DISPATCHER_PROVIDER]
})
export class MdExpansionModule {}

export {CdkAccordion} from './accordion';
export {CdkAccordionItem} from './accordion-item';
export {MdExpansionPanel} from './expansion-panel';
export {
  MdExpansionPanelHeader,
  MdExpansionPanelDescription,
  MdExpansionPanelTitle
} from './expansion-panel-header';
