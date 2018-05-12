/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { NgxImageEditorComponent } from './ngx-image-editor.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatSliderModule, MatDialogModule, MatTabsModule, MatTooltipModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
export { NgxImageEditorComponent, EditorOptions, NGX_DEFAULT_RATIOS } from './ngx-image-editor.component';
export class NgxImageEditorModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: NgxImageEditorModule,
        };
    }
}
NgxImageEditorModule.decorators = [
    { type: NgModule, args: [{
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
            },] },
];
function NgxImageEditorModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgxImageEditorModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgxImageEditorModule.ctorParameters;
}
//# sourceMappingURL=ngx-image-editor.module.js.map