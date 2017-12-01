



<p align="center">
  <img  style="text-align: center;" src="https://github.com/Centroida/ngx-image-editor/raw/master/assets/editor.png">
  <h1 align="center">ngx-image-editor</h1>
</p>


Awesome editor for Angular 5 based on [Angular Material](https://github.com/angular/material2)

[![npm version](https://badge.fury.io/js/ngx-image-editor.svg)](https://badge.fury.io/js/ngx-image-editor)

**NOTE:** This package is still under development. Contributions are appreciated. 

**[Live Demo](https://ngx-image-editor.firebaseapp.com/)**

# Usage

## Getting started

### Pre-requisites:

  - Angular Material 2.0.0-beta.11
  - Cropper js 1.1.3

### Install:

  ```bash
  npm install --save ngx-image-editor
  ```

### Usage:
Import the `NgxImageEditorModule` within your app:

```js
import {NgxImageEditorModule} from "ngx-image-editor";

@NgModule({
  imports: [ 
    NgxImageEditorModule
  ]
})
```

Add `cropperjs` file paths in your `.angular-cli.json`
  
  ```json
  {
    "styles": [
      "../node_modules/cropperjs/dist/cropper.css"
    ],
    "scripts": [
      "../node_modules/cropperjs/dist/cropper.js"
    ]
}
  ```

Ready to use `NgxImageEditorComponent` like the following example.
```js
openEditor() {
    const dialogRef = this.dialog.open(NgxImageEditorComponent, {
        width: '800px',
        height: 'auto',
        data: {
            name: 'Some image',
            ratios: ["4:3", "16:9"],
            file: this.file
            url: 'https://static.pexels.com/photos/248797/pexels-photo-248797.jpeg',
            type: 'image/jpeg'
        } as NgxImageEditorConfig
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The editor was closed');
        console.log(result);
    });
}
```

### NgxImageEditorConfig

- name: `String`
- url: `String` 
- type: `String`
- file: `File`
- ratios: `RatioType[]`

### RatioTypes

- "16:9" | '4:3' | '1:1' | '2:3' | 'Free'
