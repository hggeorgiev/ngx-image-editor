var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject, ViewEncapsulation, Optional, ViewChild } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
var NgxImageEditorComponent = (function () {
    function NgxImageEditorComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.ratios = [
            {
                value: 16 / 9, text: '16:9'
            },
            {
                value: 4 / 3, text: '4:3'
            },
            {
                value: 1 / 1, text: '1:1'
            },
            {
                value: 2 / 3, text: '2:3'
            },
            {
                value: 0 / 0, text: 'None'
            }
        ];
        this.zoomIn = 0;
        this.sliderValue = 0;
        this.loading = true;
        this.state = data;
        this.canvasFillColor = '#fff';
    }
    NgxImageEditorComponent.prototype.ngOnDestroy = function () {
        this.cropper.destroy();
    };
    NgxImageEditorComponent.prototype.ngAfterViewInit = function () {
        this.initializeCropper();
    };
    NgxImageEditorComponent.prototype.handleCrop = function () {
        var _this = this;
        this.loading = true;
        setTimeout(function () {
            _this.croppedImage = _this.cropper.getCroppedCanvas({ fillColor: _this.canvasFillColor })
                .toDataURL('image/jpeg');
            setTimeout(function () {
                _this.imageWidth = _this.croppedImg.nativeElement.width;
                _this.imageHeight = _this.croppedImg.nativeElement.height;
            });
            _this.cropper.getCroppedCanvas({ fillColor: _this.canvasFillColor }).toBlob(function (blob) {
                _this.blob = blob;
            });
            _this.zoomIn = 1;
            _this.loading = false;
        }, 2000);
    };
    NgxImageEditorComponent.prototype.undoCrop = function () {
        var _this = this;
        this.croppedImage = null;
        this.blob = null;
        setTimeout(function () {
            _this.initializeCropper();
        }, 100);
    };
    NgxImageEditorComponent.prototype.saveImage = function () {
        this.dialogRef.close({ file: new File([this.blob], this.state.name, { type: this.state.type }) });
    };
    NgxImageEditorComponent.prototype.initializeCropper = function () {
        var _this = this;
        this.cropper = new Cropper(this.previewImage.nativeElement, {
            aspectRatio: 16 / 9,
            zoomOnWheel: true,
            viewMode: 0,
            center: true,
            ready: function () { return _this.loading = false; },
            dragMode: 'move',
            crop: function (e) {
                _this.imageHeight = Math.round(e.detail.height);
                _this.imageWidth = Math.round(e.detail.width);
                _this.cropBoxWidth = Math.round(_this.cropper.getCropBoxData().width);
                _this.cropBoxHeight = Math.round(_this.cropper.getCropBoxData().height);
                _this.canvasWidth = Math.round(_this.cropper.getCanvasData().width);
                _this.canvasHeight = Math.round(_this.cropper.getCanvasData().height);
            }
        });
    };
    NgxImageEditorComponent.prototype.zoomChange = function (input, zoom) {
        // TODO fix this implementation.
        if (this.croppedImage) {
            zoom === 'zoomIn' ? this.zoomIn += 0.1 : this.zoomIn -= 0.1;
            if (this.zoomIn <= 0.1) {
                this.zoomIn = 0.1;
            }
        }
        else {
            this.cropper.zoom(input);
            this.zoomIn = input;
        }
        input > 0 ? this.sliderValue += 1 : this.sliderValue -= 1;
        if (this.sliderValue < 0) {
            this.sliderValue = 0;
        }
    };
    NgxImageEditorComponent.prototype.setImageWidth = function (canvasWidth) {
        if (canvasWidth) {
            this.cropper.setCanvasData({
                left: this.cropper.getCanvasData().left,
                top: this.cropper.getCanvasData().top,
                width: Math.round(canvasWidth),
                height: this.cropper.getCanvasData().height
            });
        }
    };
    NgxImageEditorComponent.prototype.setImageHeight = function (canvasHeight) {
        if (canvasHeight) {
            this.cropper.setCanvasData({
                left: this.cropper.getCanvasData().left,
                top: this.cropper.getCanvasData().top,
                width: this.cropper.getCanvasData().width,
                height: Math.round(canvasHeight)
            });
        }
    };
    NgxImageEditorComponent.prototype.setCropBoxWidth = function (cropBoxWidth) {
        if (cropBoxWidth) {
            this.cropper.setCropBoxData({
                left: this.cropper.getCropBoxData().left,
                top: this.cropper.getCropBoxData().top,
                width: Math.round(cropBoxWidth),
                height: this.cropper.getCropBoxData().height
            });
        }
    };
    NgxImageEditorComponent.prototype.setCropBoxHeight = function (cropBoxHeight) {
        if (cropBoxHeight) {
            this.cropper.setCropBoxData({
                left: this.cropper.getCropBoxData().left,
                top: this.cropper.getCropBoxData().top,
                width: this.cropper.getCropBoxData().width,
                height: Math.round(cropBoxHeight)
            });
        }
    };
    NgxImageEditorComponent.prototype.centerCanvas = function () {
        var cropBoxLeft = (this.cropper.getContainerData().width - this.cropper.getCropBoxData().width) / 2;
        var cropBoxTop = (this.cropper.getContainerData().height - this.cropper.getCropBoxData().height) / 2;
        var canvasLeft = (this.cropper.getContainerData().width - this.cropper.getCanvasData().width) / 2;
        var canvasTop = (this.cropper.getContainerData().height - this.cropper.getCanvasData().height) / 2;
        this.cropper.setCropBoxData({
            left: cropBoxLeft,
            top: cropBoxTop,
            width: this.cropper.getCropBoxData().width,
            height: this.cropper.getCropBoxData().height
        });
        this.cropper.setCanvasData({
            left: canvasLeft,
            top: canvasTop,
            width: this.cropper.getCanvasData().width,
            height: this.cropper.getCanvasData().height
        });
    };
    __decorate([
        ViewChild('previewimg'),
        __metadata("design:type", Object)
    ], NgxImageEditorComponent.prototype, "previewImage", void 0);
    __decorate([
        ViewChild('croppedImg'),
        __metadata("design:type", Object)
    ], NgxImageEditorComponent.prototype, "croppedImg", void 0);
    NgxImageEditorComponent = __decorate([
        Component({
            selector: 'ngx-image-editor',
            template: "\n    <div class=\"ngx-image-editor-component\" fxLayout=\"column\" fxLayoutAlign=\"center stretch\">\n    <div md-dialog-title class=\"photo-editor-header\">\n        <md-icon>photo</md-icon>\n        <div class=\"file-name\">{{state.name}}</div>\n        <button [hidden]=\"croppedImage\" md-icon-button color=\"accent\" mdTooltip=\"Crop image\" (click)=\"handleCrop()\">\n            <md-icon>crop</md-icon>\n        </button>\n        <button md-icon-button\n                [hidden]=\"croppedImage\"\n                color=\"accent\"\n                mdTooltip=\"Center canvas\"\n                (click)=\"centerCanvas()\">\n            <md-icon>center_focus_strong</md-icon>\n        </button>\n        <button md-icon-button mdTooltip=\"Fullscreen\">\n            <md-icon>fullscreen</md-icon>\n        </button>\n        <button md-icon-button mdTooltip=\"Close\" (click)=\"dialogRef.close()\">\n            <md-icon>clear</md-icon>\n        </button>\n    </div>\n\n    <div md-dialog-content\n         #dialogCropContainer\n         class=\"dialog-crop-container\"\n         fxLayout=\"column\"\n         fxLayoutAlign=\"center center\"\n         fxFlex=\"grow\">\n        <ng-template [ngIf]=\"!croppedImage\">\n            <div\n                [style.visibility]=\"loading ? 'hidden' : 'visible'\"\n                [style.background]=\"canvasFillColor\"\n                class=\"img-container\">\n                <img #previewimg\n                     [src]=\"state.url\">\n            </div>\n        </ng-template>\n        <ng-template [ngIf]=\"croppedImage && !loading\">\n            <div class=\"cropped-image\">\n                <img #croppedImg\n                     [ngStyle]=\"{'transform': 'scale(' + zoomIn + ')'}\"\n                     [src]=\"croppedImage\">\n            </div>\n        </ng-template>\n        <md-progress-spinner *ngIf=\"loading\" mode=\"indeterminate\"></md-progress-spinner>\n    </div>\n\n    <div\n        class=\"dialog-button-actions\"\n        md-dialog-actions\n        fxLayout=\"column\"\n        align=\"start\"\n        fxFlex=\"nogrow\">\n\n        <div class=\"image-detail-toolbar\" fxFlex=\"100\">\n            <div class=\"image-dimensions\"><b>Width:</b> {{imageWidth}}px <b>Height:</b> {{imageHeight}}px</div>\n            <span fxFlex></span>\n            <div class=\"image-zoom\">\n                <button md-icon-button color=\"accent\" (click)=\"zoomChange(0.1, 'zoomIn')\">\n                    <md-icon>zoom_in</md-icon>\n                </button>\n                <md-slider [value]=\"sliderValue\" [thumb-label]=\"true\"></md-slider>\n                <button md-icon-button color=\"accent\" (click)=\"zoomChange(-0.1, 'zoomOut')\">\n                    <md-icon>zoom_out</md-icon>\n                </button>\n            </div>\n        </div>\n        <div class=\"cropped-image-buttons\" [style.visibility]=\"!croppedImage ? 'hidden' : 'visible'\">\n            <button md-raised-button color=\"accent\" (click)=\"saveImage()\">\n                <md-icon>done</md-icon>\n                <span>Save</span>\n            </button>\n            <button md-raised-button color=\"accent\" (click)=\"undoCrop()\">\n                <md-icon>undo</md-icon>\n                <span>Undo</span>\n            </button>\n        </div>\n        <div fxLayout=\"row\" [style.visibility]=\"croppedImage ? 'hidden' : 'visible'\">\n            <md-button-toggle-group\n                #dragMode=\"mdButtonToggleGroup\"\n                (change)=\"cropper.setDragMode($event.value)\"\n                value=\"move\">\n                <md-button-toggle value=\"move\" mdTooltip=\"Move mode\">\n                    <md-icon>open_with</md-icon>\n                </md-button-toggle>\n                <md-button-toggle value=\"crop\" mdTooltip=\"Crop mode\">\n                    <md-icon>crop</md-icon>\n                </md-button-toggle>\n            </md-button-toggle-group>\n\n            <md-button-toggle-group\n                #selectRatio=\"mdButtonToggleGroup\"\n                (change)=\"cropper.setAspectRatio($event.value)\"\n                value=\"{{ratios[0].value}}\">\n                <md-button-toggle *ngFor=\"let ratio of ratios\" value=\"{{ratio.value}}\" mdTooltip=\"Aspect ratio\">\n                    {{ratio.text}}\n                </md-button-toggle>\n            </md-button-toggle-group>\n\n        </div>\n        <div\n            class=\"canvas-config\"\n            fxLayout=\"row\"\n            fxLayoutAlign=\"start space-between\"\n            fxLayoutGap=\"10px\"\n            [style.visibility]=\"croppedImage ? 'hidden' : 'visible'\">\n\n            <md-input-container color=\"accent\"  fxFlex=\"100\">\n                <input mdInput\n                       fxFlex=\"100\"\n                       id=\"imageWidth\"\n                       placeholder=\"Canvas width\"\n                       type=\"number\"\n                       (ngModelChange)=\"setImageWidth($event)\"\n                       [ngModel]=\"canvasWidth\">\n            </md-input-container>\n\n            <md-input-container color=\"accent\"  fxFlex=\"100\">\n                <input mdInput\n                       fxFlex=\"100\"\n                       id=\"imageHeight\"\n                       placeholder=\"Canvas height\"\n                       type=\"number\"\n                       (ngModelChange)=\"setImageHeight($event)\"\n                       [ngModel]=\"canvasHeight\">\n            </md-input-container>\n\n            <md-input-container color=\"accent\"  fxFlex=\"100\">\n                <input mdInput\n                       fxFlex=\"100\"\n                       id=\"cropBoxWidth\"\n                       placeholder=\"Cropbox width\"\n                       type=\"number\"\n                       (ngModelChange)=\"setCropBoxWidth($event)\"\n                       [ngModel]=\"cropBoxWidth\">\n            </md-input-container>\n\n            <md-input-container color=\"accent\"  fxFlex=\"100\">\n                <input mdInput\n                       fxFlex=\"100\"\n                       id=\"cropBoxHeight\"\n                       placeholder=\"Cropbox height\"\n                       type=\"number\"\n                       (ngModelChange)=\"setCropBoxHeight($event)\"\n                       [ngModel]=\"cropBoxHeight\">\n            </md-input-container>\n\n            <!--<md2-colorpicker [(ngModel)]=\"canvasFillColor\"  placeholder=\"Canvas color\"></md2-colorpicker>-->\n\n        </div>\n    </div>\n\n</div>\n\n",
            styles: ["\n\n        /*\n     * Copyright (c) 2017 Connecto.AI. All rights reserved.\n     */\n        .ngx-image-editor-component .photo-editor-header {\n            display: flex;\n            justify-content: space-around;\n            align-items: center;\n            width: 100%;\n            padding: 5px 0;\n            background: #666;\n            color: #FFF;\n            z-index: 100;\n            margin: 0;\n        }\n        .ngx-image-editor-component .photo-editor-header > .mat-icon {\n            padding: 0 10px;\n        }\n        .ngx-image-editor-component .photo-editor-header > .file-name {\n            flex: 1 1 100%;\n            text-overflow: ellipsis;\n            white-space: nowrap;\n            overflow: hidden;\n        }\n        .ngx-image-editor-component md-progress-spinner {\n            position: absolute;\n        }\n        .ngx-image-editor-component .dialog-crop-container {\n            width: 800px;\n            height: 400px;\n            overflow: hidden;\n        }\n        .ngx-image-editor-component .cropper-bg {\n            background-image: none !important;\n        }\n        .ngx-image-editor-component .cropper-bg > .cropper-modal {\n            opacity: 1 !important;\n            background: none;\n        }\n        .ngx-image-editor-component .img-container {\n            width: 800px !important;\n            height: 400px !important;\n        }\n        .ngx-image-editor-component .cropped-image img {\n            width: auto !important;\n            height: auto !important;\n            max-width: 800px !important;\n            max-height: 400px !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions {\n            background: #666;\n            position: relative;\n            padding: 0;\n        }\n        .ngx-image-editor-component .dialog-button-actions:last-child {\n            margin: 0;\n        }\n        .ngx-image-editor-component .dialog-button-actions > DIV md-button-toggle-group {\n            margin: 20px;\n            background-color: white;\n        }\n        .ngx-image-editor-component .dialog-button-actions .cropped-image-buttons {\n            position: absolute;\n            top: 50%;\n            left: 50%;\n            transform: translate(-50%, -50%);\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config {\n            padding: 5px;\n            margin: 0 20px;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config .mat-input-wrapper > .mat-input-table > .mat-input-infix {\n            color: white !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config .mat-input-placeholder.mat-empty:not(.mat-focused) {\n            color: white;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config .mat-input-underline {\n            border-color: white;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config md2-colorpicker {\n            width: 200px !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config md2-colorpicker .md2-colorpicker-input {\n            border-bottom: 1px solid white !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config md2-colorpicker .color-picker-selector .md2-colorpicker-input .md2-colorpicker-value {\n            color: white !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config md2-colorpicker .color-picker-selector {\n            padding: 15px 0 !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config md2-colorpicker .color-picker-selector .md2-colorpicker-preview {\n            top: 15px !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config md2-colorpicker .input-focused {\n            color: #6ec140 !important;\n            border-bottom-width: 1.2px;\n            border-color: #6ec140 !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config md2-colorpicker .input-focused .md2-colorpicker-placeholder {\n            color: #6ec140 !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions .image-detail-toolbar {\n            background-color: #272727;\n            color: white;\n            height: 40px;\n            line-height: 40px;\n        }\n        .ngx-image-editor-component .dialog-button-actions .image-detail-toolbar > .image-zoom {\n            display: flex;\n            align-items: center;\n            padding: 0 10px;\n        }\n        .ngx-image-editor-component .dialog-button-actions .image-detail-toolbar > .image-zoom .mat-slider-horizontal .mat-slider-wrapper {\n            top: 23px !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions .image-detail-toolbar > .image-zoom .mat-slider-horizontal .mat-slider-wrapper .mat-slider-thumb-container {\n            cursor: grab;\n        }\n        .ngx-image-editor-component .dialog-button-actions .image-detail-toolbar > .image-zoom .mat-slider-horizontal .mat-slider-wrapper .mat-slider-thumb-container > .mat-slider-thumb {\n            background-color: #6ec140 !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions .image-detail-toolbar > .image-dimensions {\n            padding: 0 10px;\n            font-size: 14px;\n            width: 200px;\n            max-width: 200px;\n        }\n\n        .mat-dialog-content {\n            margin: 0;\n            padding: 0;\n        }\n\n        .mat-dialog-container {\n            overflow: hidden !important;\n            padding: 0;\n        }\n\n\n\n\n\n\n\n\n\n\n    "],
            encapsulation: ViewEncapsulation.None
        }),
        __param(1, Optional()), __param(1, Inject(MD_DIALOG_DATA)),
        __metadata("design:paramtypes", [MdDialogRef, Object])
    ], NgxImageEditorComponent);
    return NgxImageEditorComponent;
}());
export { NgxImageEditorComponent };
//# sourceMappingURL=ngx-image-editor.component.js.map