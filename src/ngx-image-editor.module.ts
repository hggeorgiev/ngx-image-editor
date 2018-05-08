import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgxImageEditorComponent} from './ngx-image-editor.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {
    MatAutocompleteModule,
    MatButtonModule, MatButtonToggleModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule,
    MatSliderModule,MatDialogModule,
    MatTabsModule, MatTooltipModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


export * from './ngx-image-editor.component';

@NgModule({

    imports: [
        FormsModule,
        BrowserAnimationsModule,
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatTooltipModule,
        MatButtonToggleModule,
        MatSliderModule,
        MatAutocompleteModule
    ],
    declarations: [
        NgxImageEditorComponent
    ],
    exports: [NgxImageEditorComponent]
})


export class NgxImageEditorModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgxImageEditorModule,
        };
    }
}
