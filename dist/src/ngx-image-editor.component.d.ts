import { AfterViewInit, OnDestroy } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { DomSanitizer } from "@angular/platform-browser";
export declare class NgxImageEditorComponent implements AfterViewInit, OnDestroy {
    dialogRef: MdDialogRef<any>;
    private data;
    _sanitizer: DomSanitizer;
    state: EditorOptions;
    cropper: any;
    croppedImage: string;
    imageWidth: number;
    imageHeight: number;
    canvasWidth: number;
    canvasHeight: number;
    cropBoxWidth: number;
    cropBoxHeight: number;
    canvasFillColor: string;
    blob: Blob;
    loading: boolean;
    private zoomIn;
    sliderValue: number;
    ratios: NgxAspectRatio[];
    previewImageURL: any;
    previewImage: any;
    croppedImg: any;
    constructor(dialogRef: MdDialogRef<any>, data: EditorOptions, _sanitizer: DomSanitizer);
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    private handleStateConfig();
    private convertFileToBase64(file);
    private addRatios(ratios);
    handleCrop(): void;
    undoCrop(): void;
    saveImage(): void;
    private initializeCropper();
    setRatio(value: any): void;
    zoomChange(input: any, zoom?: string): void;
    setImageWidth(canvasWidth: number): void;
    setImageHeight(canvasHeight: number): void;
    setCropBoxWidth(cropBoxWidth: number): void;
    setCropBoxHeight(cropBoxHeight: number): void;
    centerCanvas(): void;
}
export interface EditorOptions {
    ImageName: string;
    ImageUrl?: string;
    ImageType?: string;
    File?: File;
    AspectRatios?: Array<RatioType>;
}
export interface NgxAspectRatio {
    value: number;
    text: RatioType;
}
export declare type RatioType = "16:9" | '4:3' | '1:1' | '2:3' | 'Default';
export declare const NGX_DEFAULT_RATIOS: Array<NgxAspectRatio>;
