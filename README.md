



<p align="center">
  <img  style="text-align: center;" src="https://github.com/Centroida/ngx-image-editor/raw/master/assets/editor.png">
  <h1 align="center">ngx-image-editor</h1>
</p>


Awesome editor for Angular 6 based on [Angular Material](https://github.com/angular/material2)

[![npm version](https://badge.fury.io/js/ngx-image-editor.svg)](https://badge.fury.io/js/ngx-image-editor)
[![Build Status](https://travis-ci.org/Centroida/ngx-image-editor.svg?branch=master)](https://travis-ci.org/hggeorgiev/ngx-image-editor)

**[Live Demo](https://centroida.github.io/ngx-image-editor/)**

## Getting started

### Pre-requisites:

##### Step 1: Install Angular Material and Angular Flex Layout

**ngx-image-editor will NOT work properly if the following dependencies are not installed:**

- [Angular Material](https://material.angular.io/guide/getting-started)
- [Angular Flex-Layout](https://github.com/angular/flex-layout)
- [Cropperjs](https://github.com/fengyuanchen/cropper)

##### Step 2: Install cropperjs
    
```bash
    npm install --save cropperjs
```
##### Step 2: Add `cropperjs` file paths in your `.angular.json`
      
```json
}
       "styles": [
         "node_modules/cropperjs/dist/cropper.css"
       ],
       "scripts": [
         "node_modules/cropperjs/dist/cropper.js"
       ]
}
```


### Usage:

#####  Step 1: Install `ngx-image-editor`:
```bash
     npm install --save ngx-image-editor
```
    
##### Step 2: Import the `NgxImageEditorModule` within your app:
```js
      import {NgxImageEditorModule} from "ngx-image-editor";

      @NgModule({
        imports: [
          NgxImageEditorModule
        ]
      })
```

### API
   **@Input()**
   config: EditorOptions

   **@Output()**
   close: EventEmitter<void>

   **@Output()**
   file: EventEmitter<File>

### Configuration
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

```typescript

@Component({
  selector: 'app-root',
   styleUrls: ['./app.component.css']
  template: `
      <ngx-image-editor
        [config]="config"
        (close)="close($event)"
        (file)="getEditedFile($event)">
      </ngx-image-editor>

  `,

})
export class AppComponent {
  public config = {
    ImageName: 'Some image',
    AspectRatios: ["4:3", "16:9"],
    ImageUrl: 'https://static.pexels.com/photos/248797/pexels-photo-248797.jpeg',
    ImageType: 'image/jpeg'
  }

  public close() {
    // Fired when the editor is closed.
  }

  public getEditedFile(file: File) {
    // Fired when the file has been processed.
  }
}


```


## TODO
    - Fix adding of styles/scripts
    - Fix requirements (need animationsmodule)



