
# ngx-image-editor
[![npm version](https://badge.fury.io/js/ngx-image-editor.svg)](https://badge.fury.io/js/ngx-image-editor)

Awesome editor for Angular 5 based on [Angular Material](https://github.com/angular/material2)




# Usage

## Getting started

 Pre-requisites:
  Make sure you have installed [Angular Material](https://material.angular.io/guide/getting-started)

1.Install `ngx-image-editor` via npm:

```bash
npm install --save ngx-image-editor
```

2.Import the `NgxImageEditorModule` within your app:

```js
import {NgxImageEditorModule} from "ngx-image-editor";

@NgModule({
  imports: [ 
    NgxImageEditorModule
  ]
})
```

3.Since ngx-image-editor depends on [Cropperjs](https://github.com/fengyuanchen/cropperjs)
  Add these in your .angular-cli.json
  ```json
  "styles": [
          "../node_modules/cropperjs/dist/cropper.css",
        ],
        "scripts": [
          "../node_modules/cropperjs/dist/cropper.js"
        ]
  ```

4. Ready to use NgxImageEditorComponent like the following example.
```js
openEditor() {
        const dialogRef = this.dialog.open(NgxImageEditorComponent, {
            width: '800px',
            height: 'auto',
            data: {
                name: 'Some image',
                url: 'https://static.pexels.com/photos/248797/pexels-photo-248797.jpeg',
                type: 'image/jpeg'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The editor was closed');
            console.log(result);
        });
    }
```

# TODO
 
