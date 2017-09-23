import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgxImageEditorComponent} from './ngx-image-editor.component';
import {
    MdAutocompleteModule,
    MdButtonModule, MdButtonToggleModule, MdIconModule, MdInputModule, MdMenuModule, MdProgressSpinnerModule,
    MdSliderModule,MatTooltipModule,MdDialogModule,
    MdTabsModule, MdTooltipModule
} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({

    declarations: [
        NgxImageEditorComponent
    ],
    providers: [
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        FlexLayoutModule,
        MdButtonModule,
        MdIconModule,
        MdDialogModule,
        MdInputModule,
        MatTooltipModule,
        MdMenuModule,
        MdProgressSpinnerModule,
        MdTabsModule,
        MdTooltipModule,
        MdButtonToggleModule,
        MdSliderModule,
        MdAutocompleteModule
    ],
    exports: [NgxImageEditorComponent],
    entryComponents: [NgxImageEditorComponent]
})
export class NgxImageEditorModule {
    public constructor() {}
}

