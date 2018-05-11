



<p align="center">
  <img  style="text-align: center;" src="https://github.com/Centroida/ngx-image-editor/raw/master/assets/editor.png">
  <h1 align="center">ngx-image-editor</h1>
</p>


Awesome editor for Angular 6 based on [Angular Material](https://github.com/angular/material2)

[![npm version](https://badge.fury.io/js/ngx-image-editor.svg)](https://badge.fury.io/js/ngx-image-editor)
[![Build Status](https://travis-ci.org/Centroida/ngx-image-editor.svg?branch=master)](https://travis-ci.org/hggeorgiev/ngx-image-editor)

**[Live Demo on Slackblitz](https://stackblitz.com/edit/ngx-image-editor-demo)**

## Getting started

### Pre-requisites:

##### Step 1: Install Angular Material (+ Material Icons) and Angular Flex Layout

- [Angular Material](https://material.angular.io/guide/getting-started)
- [Angular Flex-Layout](https://github.com/angular/flex-layout)

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


#####  Step 3: Install `ngx-image-editor`:
```bash
     npm install --save ngx-image-editor
```
    
##### Step 4: Import the `NgxImageEditorModule` within your app:
```js
      import {NgxImageEditorModule} from "ngx-image-editor";

      @NgModule({
        imports: [
          NgxImageEditorModule
        ]
      })
```

### API


   | Property          | Description                                                    |
   | -------------- | -------------------------------------------------------------- |
   | `[config]`         | An object containing editor configuration (see **Configuration**)                  |
   | `(file)` | The emitted file after editing.         |


#### Configuration
| Property          | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| ImageName         | Name of the image.             |
| ImageUrl | URL of the image (if it coming from a CDN) .           |
| File | File object of the image (if it is being uploaded through the browser.          |
| ImageType    | Type of the image (default is `image/jpeg`)             |
| AspectRatios | Array of aspect ratios. Available options: `0:0`, `1:1` , `2:3` ,`4:3`, `16:9`l . (default is `0:0`)             |


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


### Contributors

## Team

| [![Hristo Georgiev](https://github.com/hggeorgiev.png?size=100)](https://github.com/hggeorgiev) | [![Taulant Disha](https://github.com/taulantdisha.png?size=100)](https://github.com/taulantdisha) |
|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| [Hristo Gorgiev](https://github.com/hggeorgiev)                                                | [Taulant Disha](https://github.com/taulantdisha)                                              |


