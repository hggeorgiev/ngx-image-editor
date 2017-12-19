



<p align="center">
  <img  style="text-align: center;" src="https://github.com/Centroida/ngx-image-editor/raw/master/assets/editor.png">
  <h1 align="center">ngx-image-editor</h1>
</p>


Awesome editor for Angular 5 based on [Angular Material](https://github.com/angular/material2)

[![npm version](https://badge.fury.io/js/ngx-image-editor.svg)](https://badge.fury.io/js/ngx-image-editor)


**[Live Demo](https://ngx-image-editor.firebaseapp.com/)**

## Getting started

### Pre-requisites:

  - [Angular Material](https://material.angular.io/)
    ```bash
      npm install --save --save-exact @angular/material@2.0.0-beta.11
     ```
  - [Angular Flex-Layout](https://github.com/angular/flex-layout)
     ```bash
      npm install --save --save-exact @angular/flex-layout@2.0.0-beta.9
    ```
  - [Cropperjs](https://github.com/fengyuanchen/cropper)
    - `Step 1`: Install cropperjs
      ```bash
        npm install --save cropperjs
      ```
    - `Step 2`: Add `cropperjs` file paths in your `.angular-cli.json`
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

### Usage:
   ####  Step 1: Install `ngx-image-editor`:
    ```bash
     npm install --save ngx-image-editor
    ```
  #### Step 2`: Import the `NgxImageEditorModule` within your app:
    ```js
      import {NgxImageEditorModule} from "ngx-image-editor";

      @NgModule({
        imports: [
          NgxImageEditorModule
        ]
      })
    ```
### EditorOptions:
  - ImageName: `String` (required)
  - ImageUrl: `String`  (optional)
  - ImageType: `String` (optional)
    - Default type is image/jpeg
  - File: `File` (optional)
  - AspectRatios: `RatioType[]` (optional)
    - '6:9' | '4:3' | '1:1' | '2:3' | 'Default'

**Notes:**
- In the `EditorOptions` can pass either `ImageUrl` or `File`.


### Example
```js
openEditor() {
    const dialogRef = this.dialog.open(NgxImageEditorComponent, {
        width: '800px',
        height: 'auto',
        data: {
            ImageName: 'Some image',
            AspectRatios: ["4:3", "16:9"],
            ImageUrl: 'https://static.pexels.com/photos/248797/pexels-photo-248797.jpeg',
            ImageType: 'image/jpeg'
        } as EditorOptions
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The editor was closed');
        console.log(result);
    });
}
```