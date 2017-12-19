import { AfterViewInit, OnDestroy } from '@angular/core';
import { MdDialogRef } from '@angular/material';
export declare class NgxImageEditorComponent implements AfterViewInit, OnDestroy {
    dialogRef: MdDialogRef<any>;
    private data;
    state: any;
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
    ratios: {
        value: number;
        text: string;
    }[];
    previewImage: any;
    croppedImg: any;
    constructor(dialogRef: MdDialogRef<any>, data: any);
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    handleCrop(): void;
    undoCrop(): void;
    saveImage(): void;
    private initializeCropper();
    zoomChange(input: any, zoom?: string): void;
    setImageWidth(canvasWidth: number): void;
    setImageHeight(canvasHeight: number): void;
    setCropBoxWidth(cropBoxWidth: number): void;
    setCropBoxHeight(cropBoxHeight: number): void;
    centerCanvas(): void;
}
