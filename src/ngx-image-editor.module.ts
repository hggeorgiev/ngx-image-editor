import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgxImageEditorComponent} from './ngx-image-editor.component';
export * from './ngx-image-editor.component';
@NgModule({

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
