(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["self-check-self-check-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/self-check/self-check.page.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/self-check/self-check.page.html ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header class=\"ion-no-border\">\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-back-button></ion-back-button>\n    </ion-buttons>\n    <ion-title>Self Check</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button [routerLink]=\"['/self-check-profile']\">\n        <ion-icon name=\"person-circle\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-router-outlet id=\"main\"></ion-router-outlet>\n  <ion-tabs>\n    <ion-tab-bar color=\"primary\" slot=\"top\">\n      <ion-tab-button tab=\"home\">\n        <ion-icon name=\"home\"></ion-icon>\n        <ion-label>Home</ion-label>\n      </ion-tab-button>\n\n      <ion-tab-button tab=\"status\">\n        <ion-icon name=\"heart-outline\"></ion-icon>\n        <ion-label>Status</ion-label>\n      </ion-tab-button>\n\n      <ion-tab-button tab=\"progress\">\n        <ion-icon name=\"stats-chart-outline\"></ion-icon>\n        <ion-label>Progress</ion-label>\n      </ion-tab-button>\n    </ion-tab-bar>\n  </ion-tabs>\n  <ion-fab vertical=\"bottom\" horizontal=\"start\" slot=\"fixed\">\n    <ion-button shape=\"round\" color=\"success\" [routerLink]=\"['/self-check-enrollment']\">\n      <ion-icon slot=\"start\" name=\"person-add\"></ion-icon>\n      <ion-label>Enroll</ion-label>\n    </ion-button>\n  </ion-fab>\n  <ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\">\n    <ion-button shape=\"round\" [routerLink]=\"['/manage-self-check']\">\n      <ion-icon slot=\"start\" name=\"heart-outline\"></ion-icon>\n      <ion-label>Check-up</ion-label>\n    </ion-button>\n  </ion-fab>\n\n</ion-content>\n");

/***/ }),

/***/ "./src/app/self-check/self-check-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/self-check/self-check-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: SelfCheckPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelfCheckPageRoutingModule", function() { return SelfCheckPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _self_check_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./self-check.page */ "./src/app/self-check/self-check.page.ts");




const routes = [
    {
        path: '',
        component: _self_check_page__WEBPACK_IMPORTED_MODULE_3__["SelfCheckPage"],
        children: [
            {
                path: 'home',
                loadChildren: () => __webpack_require__.e(/*! import() | self-check-home-self-check-home-module */ "self-check-home-self-check-home-module").then(__webpack_require__.bind(null, /*! ../self-check-home/self-check-home.module */ "./src/app/self-check-home/self-check-home.module.ts")).then((m) => m.SelfCheckHomePageModule),
            },
            {
                path: 'progress',
                loadChildren: () => __webpack_require__.e(/*! import() | self-check-progress-self-check-progress-module */ "self-check-progress-self-check-progress-module").then(__webpack_require__.bind(null, /*! ../self-check-progress/self-check-progress.module */ "./src/app/self-check-progress/self-check-progress.module.ts")).then((m) => m.SelfCheckProgressPageModule),
            },
            {
                path: 'status',
                loadChildren: () => __webpack_require__.e(/*! import() | self-check-status-self-check-status-module */ "self-check-status-self-check-status-module").then(__webpack_require__.bind(null, /*! ../self-check-status/self-check-status.module */ "./src/app/self-check-status/self-check-status.module.ts")).then((m) => m.SelfCheckStatusPageModule),
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            },
        ],
    },
];
let SelfCheckPageRoutingModule = class SelfCheckPageRoutingModule {
};
SelfCheckPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], SelfCheckPageRoutingModule);



/***/ }),

/***/ "./src/app/self-check/self-check.module.ts":
/*!*************************************************!*\
  !*** ./src/app/self-check/self-check.module.ts ***!
  \*************************************************/
/*! exports provided: SelfCheckPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelfCheckPageModule", function() { return SelfCheckPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
/* harmony import */ var _self_check_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./self-check-routing.module */ "./src/app/self-check/self-check-routing.module.ts");
/* harmony import */ var _self_check_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./self-check.page */ "./src/app/self-check/self-check.page.ts");







let SelfCheckPageModule = class SelfCheckPageModule {
};
SelfCheckPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _self_check_routing_module__WEBPACK_IMPORTED_MODULE_5__["SelfCheckPageRoutingModule"]],
        declarations: [_self_check_page__WEBPACK_IMPORTED_MODULE_6__["SelfCheckPage"]],
    })
], SelfCheckPageModule);



/***/ }),

/***/ "./src/app/self-check/self-check.page.scss":
/*!*************************************************!*\
  !*** ./src/app/self-check/self-check.page.scss ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".check-up-button {\n  position: fixed;\n  right: 10px;\n  bottom: 60px;\n}\n\n.enroll-button {\n  position: fixed;\n  left: 10px;\n  bottom: 60px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL21rb213YS9kZXZlbG9wbWVudHMvcGxheWdyb3VuZC9sYWIvc3JjL2FwcC9zZWxmLWNoZWNrL3NlbGYtY2hlY2sucGFnZS5zY3NzIiwic3JjL2FwcC9zZWxmLWNoZWNrL3NlbGYtY2hlY2sucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FDQ0Y7O0FERUE7RUFDRSxlQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL3NlbGYtY2hlY2svc2VsZi1jaGVjay5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2hlY2stdXAtYnV0dG9uIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICByaWdodDogMTBweDtcbiAgYm90dG9tOiA2MHB4O1xufVxuXG4uZW5yb2xsLWJ1dHRvbiB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgbGVmdDogMTBweDtcbiAgYm90dG9tOiA2MHB4O1xufVxuIiwiLmNoZWNrLXVwLWJ1dHRvbiB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgcmlnaHQ6IDEwcHg7XG4gIGJvdHRvbTogNjBweDtcbn1cblxuLmVucm9sbC1idXR0b24ge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGxlZnQ6IDEwcHg7XG4gIGJvdHRvbTogNjBweDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/self-check/self-check.page.ts":
/*!***********************************************!*\
  !*** ./src/app/self-check/self-check.page.ts ***!
  \***********************************************/
/*! exports provided: SelfCheckPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelfCheckPage", function() { return SelfCheckPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let SelfCheckPage = class SelfCheckPage {
    constructor() { }
    ngOnInit() { }
};
SelfCheckPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-self-check',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./self-check.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/self-check/self-check.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./self-check.page.scss */ "./src/app/self-check/self-check.page.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], SelfCheckPage);



/***/ })

}]);
//# sourceMappingURL=self-check-self-check-module-es2015.js.map