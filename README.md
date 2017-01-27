## MediaPro Shared Components ##

### Pre requisites ###

* NodeJS > v 4.4.2

### About ###

Shared components used across MediaPro Angular 2 stack of applications

### Installation ###

```bash
$ npm install @mediapro/shared --save
```
** Make sure you have required peerDependencies installed **

### Import ###

```typescript
import { NgModule } from '@angular/core';
import { MpSharedModule } from ng-color-picker;

...
@NgModule({
  ...
  imports: [
    ...
    MpSharedModule,
    ...
  ]
  ...
})
...
```

### Components ###
1) [Date Picker](src/date-picker/README.md)
2) [Left Side Panel](src/left-side-panel/README.md)
3) [Select Box](src/select-box/README.md)
4) [Sort Button](src/sort-button/README.md)
5) [Bread Crumbs](src/breadcrumbs/README.md)
6) [Header](src/header/README.md)
7) [Navigation Tabs](src/navigation-tabs/README.md)
8) [Pagination](src/pagination/README.md)

### Services
1) [Auth Service](src/auth/README.md)

### Set up ###

* Clone repository
* Install all `peerDependencies` i.e. `$ npm install @angular/core @angular/common ...`
* Run `$ npm install`

### Style guide ###

* Make use of the [official Angular 2 Style Guide](https://angular.io/styleguide)
