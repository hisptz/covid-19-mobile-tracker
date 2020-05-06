(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["rumor-rumor-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/rumor/rumor.page.html":
/*!*****************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/rumor/rumor.page.html ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button></ion-back-button>\n    </ion-buttons>\n    <ion-title>Report Rumor</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n\n</ion-content>\n");

/***/ }),

/***/ "./src/app/rumor/rumor-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/rumor/rumor-routing.module.ts ***!
  \***********************************************/
/*! exports provided: RumorPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RumorPageRoutingModule", function() { return RumorPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _rumor_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rumor.page */ "./src/app/rumor/rumor.page.ts");




const routes = [
    {
        path: '',
        component: _rumor_page__WEBPACK_IMPORTED_MODULE_3__["RumorPage"]
    }
];
let RumorPageRoutingModule = class RumorPageRoutingModule {
};
RumorPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], RumorPageRoutingModule);



/***/ }),

/***/ "./src/app/rumor/rumor.module.ts":
/*!***************************************!*\
  !*** ./src/app/rumor/rumor.module.ts ***!
  \***************************************/
/*! exports provided: RumorPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RumorPageModule", function() { return RumorPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
/* harmony import */ var _rumor_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rumor-routing.module */ "./src/app/rumor/rumor-routing.module.ts");
/* harmony import */ var _rumor_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rumor.page */ "./src/app/rumor/rumor.page.ts");







let RumorPageModule = class RumorPageModule {
};
RumorPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _rumor_routing_module__WEBPACK_IMPORTED_MODULE_5__["RumorPageRoutingModule"]
        ],
        declarations: [_rumor_page__WEBPACK_IMPORTED_MODULE_6__["RumorPage"]]
    })
], RumorPageModule);



/***/ }),

/***/ "./src/app/rumor/rumor.page.scss":
/*!***************************************!*\
  !*** ./src/app/rumor/rumor.page.scss ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3J1bW9yL3J1bW9yLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/rumor/rumor.page.ts":
/*!*************************************!*\
  !*** ./src/app/rumor/rumor.page.ts ***!
  \*************************************/
/*! exports provided: RumorPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RumorPage", function() { return RumorPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let RumorPage = class RumorPage {
    constructor() { }
    ngOnInit() {
    }
};
RumorPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-rumor',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./rumor.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/rumor/rumor.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./rumor.page.scss */ "./src/app/rumor/rumor.page.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], RumorPage);



/***/ })

}]);
//# sourceMappingURL=rumor-rumor-module-es2015.js.map