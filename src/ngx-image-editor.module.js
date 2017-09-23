var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxImageEditorComponent } from './ngx-image-editor.component';
import { MdAutocompleteModule, MdButtonModule, MdButtonToggleModule, MdIconModule, MdInputModule, MdMenuModule, MdProgressSpinnerModule, MdSliderModule, MatTooltipModule, MdDialogModule, MdTabsModule, MdTooltipModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
var NgxImageEditorModule = (function () {
    function NgxImageEditorModule() {
    }
    NgxImageEditorModule = __decorate([
        NgModule({
            declarations: [
                NgxImageEditorComponent
            ],
            providers: [],
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
        }),
        __metadata("design:paramtypes", [])
    ], NgxImageEditorModule);
    return NgxImageEditorModule;
}());
export { NgxImageEditorModule };
//# sourceMappingURL=ngx-image-editor.module.js.map