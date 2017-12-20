import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgxImageEditorComponent} from './ngx-image-editor.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {
    MdAutocompleteModule,
    MdButtonModule, MdButtonToggleModule, MdIconModule, MdInputModule, MdMenuModule, MdProgressSpinnerModule,
    MdSliderModule,MdDialogModule,
    MdTabsModule, MdTooltipModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";


export * from './ngx-image-editor.component';

@NgModule({

    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MdButtonModule,
        MdIconModule,
        MdDialogModule,
        MdInputModule,
        MdMenuModule,
        MdProgressSpinnerModule,
        MdTabsModule,
        MdTooltipModule,
        MdButtonToggleModule,
        MdSliderModule,
        MdAutocompleteModule
    ],
    declarations: [
        NgxImageEditorComponent
    ],
    exports: [NgxImageEditorComponent],
    entryComponents: [NgxImageEditorComponent]
})


export class NgxImageEditorModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgxImageEditorModule,
        };
    }
}
