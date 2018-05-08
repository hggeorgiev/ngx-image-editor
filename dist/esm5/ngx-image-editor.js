import { Component, ViewEncapsulation, ViewChild, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatSliderModule, MatDialogModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

var NgxImageEditorComponent = /** @class */ (function () {
    function NgxImageEditorComponent() {
        this.close = new EventEmitter();
        this.file = new EventEmitter();
        this.zoomIn = 0;
        this.sliderValue = 0;
        this.loading = true;
        this.canvasFillColor = '#fff';
        this.state = new EditorOptions();
    }
    Object.defineProperty(NgxImageEditorComponent.prototype, "config", {
        set: function (config) {
            this.state = config;
        },
        enumerable: true,
        configurable: true
    });
    NgxImageEditorComponent.prototype.ngOnInit = function () {
        this.handleStateConfig();
    };
    NgxImageEditorComponent.prototype.ngOnDestroy = function () {
        this.cropper.destroy();
    };
    NgxImageEditorComponent.prototype.ngAfterViewInit = function () {
        if (!this.state.File && this.state.ImageUrl) {
            this.initializeCropper();
        }
    };
    NgxImageEditorComponent.prototype.handleStateConfig = function () {
        this.state.ImageType = this.state.ImageType ? this.state.ImageType : 'image/jpeg';
        if (this.state.ImageUrl) {
            this.state.File = null;
            this.previewImageURL = this.state.ImageUrl;
        }
        if (this.state.File) {
            this.state.ImageUrl = null;
            this.convertFileToBase64(this.state.File);
        }
        if (this.state.AspectRatios) {
            this.addRatios(this.state.AspectRatios);
        }
        else {
            this.ratios = NGX_DEFAULT_RATIOS;
        }
        if (!this.state.ImageUrl && !this.state.File) {
            console.error("Property ImageUrl or File is missing, Please provide an url or file in the config options.");
        }
        if (!this.state.ImageName) {
            console.error("Property ImageName is missing, Please provide a name for the image.");
        }
    };
    NgxImageEditorComponent.prototype.convertFileToBase64 = function (file) {
        var _this = this;
        var reader = new FileReader();
        reader.addEventListener("load", function (e) {
            _this.previewImageURL = e.target["result"];
        }, false);
        reader.readAsDataURL(file);
        reader.onloadend = (function () {
            _this.initializeCropper();
        });
    };
    NgxImageEditorComponent.prototype.addRatios = function (ratios) {
        var _this = this;
        this.ratios = [];
        ratios.forEach(function (ratioType) {
            var addedRation = NGX_DEFAULT_RATIOS.find(function (ratio) {
                return ratio.text === ratioType;
            });
            _this.ratios.push(addedRation);
        });
    };
    NgxImageEditorComponent.prototype.handleCrop = function () {
        var _this = this;
        this.loading = true;
        setTimeout(function () {
            _this.croppedImage = _this.cropper.getCroppedCanvas({ fillColor: _this.canvasFillColor })
                .toDataURL(_this.state.ImageType);
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
        this.file.emit(new File([this.blob], this.state.ImageName, { type: this.state.ImageType }));
    };
    NgxImageEditorComponent.prototype.initializeCropper = function () {
        var _this = this;
        this.cropper = new Cropper(this.previewImage.nativeElement, {
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
        this.setRatio(this.ratios[0].value);
    };
    NgxImageEditorComponent.prototype.setRatio = function (value) {
        this.cropper.setAspectRatio(value);
    };
    NgxImageEditorComponent.prototype.zoomChange = function (input, zoom) {
        if (this.croppedImage) {
            if (zoom) {
                zoom === 'zoomIn' ? this.zoomIn += 0.1 : this.zoomIn -= 0.1;
            }
            else {
                if (input < this.sliderValue) {
                    this.zoomIn = -Math.abs(input / 100);
                }
                else {
                    this.zoomIn = Math.abs(input / 100);
                }
            }
            if (this.zoomIn <= 0.1) {
                this.zoomIn = 0.1;
            }
        }
        else {
            if (zoom) {
                this.cropper.zoom(input);
                this.zoomIn = input;
            }
            else {
                if (input < this.sliderValue) {
                    this.cropper.zoom(-Math.abs(input / 100));
                }
                else {
                    this.cropper.zoom(Math.abs(input / 100));
                }
                if (input === 0) {
                    this.cropper.zoom(-1);
                }
            }
        }
        if (!zoom) {
            this.sliderValue = input;
        }
        else {
            input > 0 ? this.sliderValue += Math.abs(input * 100) : this.sliderValue -= Math.abs(input * 100);
        }
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
    return NgxImageEditorComponent;
}());
NgxImageEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-image-editor',
                template: "\n        <div class=\"ngx-image-editor-component\" fxLayout=\"column\" fxLayoutAlign=\"center stretch\">\n            <div mat-dialog-title class=\"photo-editor-header\">\n                <mat-icon>photo</mat-icon>\n                <div class=\"file-name\">{{state.ImageName}}</div>\n                <button [hidden]=\"croppedImage\" mat-icon-button color=\"accent\" matTooltip=\"Crop image\" (click)=\"handleCrop()\">\n                    <mat-icon>crop</mat-icon>\n                </button>\n                <button mat-icon-button\n                        [hidden]=\"croppedImage\"\n                        color=\"accent\"\n                        matTooltip=\"Center canvas\"\n                        (click)=\"centerCanvas()\">\n                    <mat-icon>center_focus_strong</mat-icon>\n                </button>\n                <button mat-icon-button matTooltip=\"Fullscreen\">\n                    <mat-icon>fullscreen</mat-icon>\n                </button>\n                <button mat-icon-button matTooltip=\"Close\" (click)=\"close.emit()\">\n                    <mat-icon>clear</mat-icon>\n                </button>\n            </div>\n\n            <div mat-dialog-content\n                 #dialogCropContainer\n                 class=\"dialog-crop-container\"\n                 fxLayout=\"column\"\n                 fxLayoutAlign=\"center center\"\n                 fxFlex=\"grow\">\n                <ng-template [ngIf]=\"!croppedImage\">\n                    <div\n                            [style.visibility]=\"loading ? 'hidden' : 'visible'\"\n                            [style.background]=\"canvasFillColor\"\n                            class=\"img-container\">\n                        <img #previewimg\n                             [src]=\"previewImageURL\">\n                    </div>\n                </ng-template>\n                <ng-template [ngIf]=\"croppedImage && !loading\">\n                    <div class=\"cropped-image\">\n                        <img #croppedImg\n                             [ngStyle]=\"{'transform': 'scale(' + zoomIn + ')'}\"\n                             [src]=\"croppedImage\">\n                    </div>\n                </ng-template>\n                <mat-progress-spinner *ngIf=\"loading\" mode=\"indeterminate\"></mat-progress-spinner>\n            </div>\n\n            <div\n                    class=\"dialog-button-actions\"\n                    mat-dialog-actions\n                    fxLayout=\"column\"\n                    align=\"start\"\n                    fxFlex=\"nogrow\">\n\n                <div class=\"image-detail-toolbar\" fxFlex=\"100\">\n                    <div class=\"image-dimensions\"><b>Width:</b> {{imageWidth}}px <b>Height:</b> {{imageHeight}}px</div>\n                    <span fxFlex></span>\n                    <div class=\"image-zoom\">\n                        <button mat-icon-button color=\"accent\" (click)=\"zoomChange(0.1, 'zoomIn')\">\n                            <mat-icon>zoom_in</mat-icon>\n                        </button>\n                        <mat-slider [value]=\"sliderValue\" (input)=\"zoomChange($event.value)\" thumbLabel></mat-slider>\n                        <button mat-icon-button color=\"accent\" (click)=\"zoomChange(-0.1, 'zoomOut')\">\n                            <mat-icon>zoom_out</mat-icon>\n                        </button>\n                    </div>\n                </div>\n                <div class=\"cropped-image-buttons\" [style.visibility]=\"!croppedImage ? 'hidden' : 'visible'\">\n                    <button mat-raised-button color=\"accent\" (click)=\"saveImage()\">\n                        <mat-icon>done</mat-icon>\n                        <span>Save</span>\n                    </button>\n                    <button mat-raised-button color=\"accent\" (click)=\"undoCrop()\">\n                        <mat-icon>undo</mat-icon>\n                        <span>Undo</span>\n                    </button>\n                </div>\n                <div fxLayout=\"row\" [style.visibility]=\"croppedImage ? 'hidden' : 'visible'\">\n                    <mat-button-toggle-group\n                            #dragMode=\"matButtonToggleGroup\"\n                            (change)=\"cropper.setDragMode($event.value)\"\n                            value=\"move\">\n                        <mat-button-toggle value=\"move\" matTooltip=\"Move mode\">\n                            <mat-icon>open_with</mat-icon>\n                        </mat-button-toggle>\n                        <mat-button-toggle value=\"crop\" matTooltip=\"Crop mode\">\n                            <mat-icon>crop</mat-icon>\n                        </mat-button-toggle>\n                    </mat-button-toggle-group>\n\n                    <mat-button-toggle-group\n                            #selectRatio=\"matButtonToggleGroup\"\n                            (change)=\"setRatio($event.value)\"\n                            value=\"{{ratios[0].value}}\">\n                        <mat-button-toggle *ngFor=\"let ratio of ratios\" value=\"{{ratio.value}}\" matTooltip=\"Aspect ratio\">\n                            {{ratio.text}}\n                        </mat-button-toggle>\n                    </mat-button-toggle-group>\n\n                </div>\n                <div\n                        class=\"canvas-config\"\n                        fxLayout=\"row\"\n                        fxLayoutAlign=\"start space-between\"\n                        fxLayoutGap=\"10px\"\n                        [style.visibility]=\"croppedImage ? 'hidden' : 'visible'\">\n\n                    <mat-form-field color=\"accent\"  fxFlex=\"100\">\n                        <input matInput\n                               fxFlex=\"100\"\n                               id=\"imageWidth\"\n                               placeholder=\"Canvas width\"\n                               type=\"number\"\n                               (ngModelChange)=\"setImageWidth($event)\"\n                               [ngModel]=\"canvasWidth\">\n                    </mat-form-field>\n\n                    <mat-form-field color=\"accent\"  fxFlex=\"100\">\n                        <input matInput\n                               fxFlex=\"100\"\n                               id=\"imageHeight\"\n                               placeholder=\"Canvas height\"\n                               type=\"number\"\n                               (ngModelChange)=\"setImageHeight($event)\"\n                               [ngModel]=\"canvasHeight\">\n                    </mat-form-field>\n\n                    <mat-form-field color=\"accent\"  fxFlex=\"100\">\n                        <input matInput\n                               fxFlex=\"100\"\n                               id=\"cropBoxWidth\"\n                               placeholder=\"Cropbox width\"\n                               type=\"number\"\n                               (ngModelChange)=\"setCropBoxWidth($event)\"\n                               [ngModel]=\"cropBoxWidth\">\n                    </mat-form-field>\n\n                    <mat-form-field color=\"accent\"  fxFlex=\"100\">\n                        <input matInput\n                               fxFlex=\"100\"\n                               id=\"cropBoxHeight\"\n                               placeholder=\"Cropbox height\"\n                               type=\"number\"\n                               (ngModelChange)=\"setCropBoxHeight($event)\"\n                               [ngModel]=\"cropBoxHeight\">\n                    </mat-form-field>\n\n                    <!--<md2-colorpicker [(ngModel)]=\"canvasFillColor\"  placeholder=\"Canvas color\"></md2-colorpicker>-->\n\n                </div>\n            </div>\n\n        </div>\n\n    ",
                styles: ["\n      \n        .ngx-image-editor-component .photo-editor-header {\n            display: flex;\n            justify-content: space-around;\n            align-items: center;\n            width: 100%;\n            padding: 5px 0;\n            background: #666;\n            color: #FFF;\n            z-index: 100;\n            margin: 0;\n        }\n        .ngx-image-editor-component .photo-editor-header > .mat-icon {\n            padding: 0 10px;\n        }\n        .ngx-image-editor-component .photo-editor-header > .file-name {\n            flex: 1 1 100%;\n            text-overflow: ellipsis;\n            white-space: nowrap;\n            overflow: hidden;\n        }\n        .ngx-image-editor-component mat-progress-spinner {\n            position: absolute;\n        }\n        .ngx-image-editor-component .dialog-crop-container {\n            width: 800px;\n            height: 400px;\n            overflow: hidden;\n        }\n        .ngx-image-editor-component .cropper-bg {\n            background-image: none !important;\n        }\n        .ngx-image-editor-component .cropper-bg > .cropper-modal {\n            opacity: 1 !important;\n            background: none;\n        }\n        .ngx-image-editor-component .img-container {\n            width: 800px !important;\n            height: 400px !important;\n        }\n        .ngx-image-editor-component .cropped-image img {\n            width: auto !important;\n            height: auto !important;\n            max-width: 800px !important;\n            max-height: 400px !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions {\n            background: #666;\n            position: relative;\n            padding: 0;\n        }\n        .ngx-image-editor-component .dialog-button-actions:last-child {\n            margin: 0;\n        }\n        .ngx-image-editor-component .dialog-button-actions > DIV mat-button-toggle-group {\n            margin: 20px;\n            background-color: white;\n        }\n        .ngx-image-editor-component .dialog-button-actions .cropped-image-buttons {\n            position: absolute;\n            top: 50%;\n            left: 50%;\n            transform: translate(-50%, -50%);\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config {\n            padding: 5px;\n            margin: 0 20px;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config .mat-input-wrapper > .mat-input-table > .mat-input-infix {\n            color: white !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config .mat-input-placeholder.mat-empty:not(.mat-focused) {\n            color: white;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config .mat-input-underline {\n            border-color: white;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config md2-colorpicker {\n            width: 200px !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config md2-colorpicker .md2-colorpicker-input {\n            border-bottom: 1px solid white !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config md2-colorpicker .color-picker-selector .md2-colorpicker-input .md2-colorpicker-value {\n            color: white !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config md2-colorpicker .color-picker-selector {\n            padding: 15px 0 !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config md2-colorpicker .color-picker-selector .md2-colorpicker-preview {\n            top: 15px !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config md2-colorpicker .input-focused {\n            color: #6ec140 !important;\n            border-bottom-width: 1.2px;\n            border-color: #6ec140 !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions > .canvas-config md2-colorpicker .input-focused .md2-colorpicker-placeholder {\n            color: #6ec140 !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions .image-detail-toolbar {\n            background-color: #272727;\n            color: white;\n            height: 40px;\n            line-height: 40px;\n        }\n        .ngx-image-editor-component .dialog-button-actions .image-detail-toolbar > .image-zoom {\n            display: flex;\n            align-items: center;\n            padding: 0 10px;\n        }\n        .ngx-image-editor-component .dialog-button-actions .image-detail-toolbar > .image-zoom .mat-slider-horizontal .mat-slider-wrapper {\n            top: 23px !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions .image-detail-toolbar > .image-zoom .mat-slider-horizontal .mat-slider-wrapper .mat-slider-thumb-container {\n            cursor: grab;\n        }\n        .ngx-image-editor-component .dialog-button-actions .image-detail-toolbar > .image-zoom .mat-slider-horizontal .mat-slider-wrapper .mat-slider-thumb-container > .mat-slider-thumb {\n            background-color: #6ec140 !important;\n        }\n        .ngx-image-editor-component .dialog-button-actions .image-detail-toolbar > .image-dimensions {\n            padding: 0 10px;\n            font-size: 14px;\n            width: 200px;\n            max-width: 200px;\n        }\n\n        .mat-dialog-content {\n            margin: 0;\n            padding: 0;\n        }\n\n        .mat-dialog-container {\n            overflow: hidden !important;\n            padding: 0;\n        }\n\n\n\n\n\n\n\n\n\n\n    "],
                encapsulation: ViewEncapsulation.None
            },] },
];
NgxImageEditorComponent.ctorParameters = function () { return []; };
NgxImageEditorComponent.propDecorators = {
    "previewImage": [{ type: ViewChild, args: ['previewimg',] },],
    "croppedImg": [{ type: ViewChild, args: ['croppedImg',] },],
    "config": [{ type: Input },],
    "close": [{ type: Output },],
    "file": [{ type: Output },],
};
var EditorOptions = /** @class */ (function () {
    function EditorOptions() {
    }
    return EditorOptions;
}());
var NGX_DEFAULT_RATIOS = [
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
        value: 0 / 0, text: 'Default'
    }
];
var NgxImageEditorModule = /** @class */ (function () {
    function NgxImageEditorModule() {
    }
    NgxImageEditorModule.forRoot = function () {
        return {
            ngModule: NgxImageEditorModule,
        };
    };
    return NgxImageEditorModule;
}());
NgxImageEditorModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
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

export { NgxImageEditorModule, NgxImageEditorComponent, EditorOptions, NGX_DEFAULT_RATIOS };
//# sourceMappingURL=ngx-image-editor.js.map
