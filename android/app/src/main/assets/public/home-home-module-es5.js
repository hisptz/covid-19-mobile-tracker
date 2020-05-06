function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html":
  /*!***************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html ***!
    \***************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppHomeHomePageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-header class=\"ion-no-border\">\n  <ion-toolbar color=\"primary\" class=\"self-check-block\">\n    <ion-row>\n      <ion-col>\n        <div class=\"tracker-title\">COVID-19 Tracker</div>\n        <div class=\"tracker-subtitle\">Do your own test</div>\n        <div class=\"tracker-description\">\n          Check if you have any covid-19 symptoms and help slow the outbreak!\n        </div>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <ion-button expand=\"block\" shape=\"round\" color=\"success\" fill=\"solid\">\n          <ion-icon slot=\"start\" name=\"heart\"></ion-icon>\n          <ion-label>Self Check now</ion-label>\n        </ion-button>\n      </ion-col>\n    </ion-row>\n  </ion-toolbar>\n</ion-header>\n<ion-content [fullscreen]=\"true\">\n  <div class=\"tracker-subtitle ion-text-center ion-margin-top\">Take step to protect yourself and others</div>\n  <ion-row>\n    <ion-col>\n      <ion-slides pager=\"true\" [options]=\"slideOptions\">\n        <ion-slide>\n          <div class=\"protect-slide\">\n            <ion-img src=\"assets/icon/mask.png\"></ion-img>\n            <div class=\"tracker-subtitle\">Wear Face mask</div>\n          </div>\n        </ion-slide>\n        <ion-slide class=\"protect-slide\">\n          <ion-img src=\"assets/icon/wash_hands.png\"></ion-img>\n          <div class=\"tracker-subtitle\">Wash your hands</div>\n        </ion-slide>\n        <ion-slide class=\"protect-slide\">\n          <ion-img src=\"assets/icon/social_distancing.png\"></ion-img>\n          <div class=\"tracker-subtitle\">Avoid close contacts</div>\n        </ion-slide>\n      </ion-slides>\n    </ion-col>\n  </ion-row>\n\n  <div class=\"chw-block\">\n    <ion-row>\n      <ion-col>\n        <ion-img src=\"assets/icon/chw.svg\"></ion-img>\n      </ion-col>\n      <ion-col>\n        <div class=\"tracker-subtitle\">Are you Health worker?</div>\n        <div class=\"tracker-description\">\n          Track rumors, follow up on patients and their contacts\n        </div>\n        <ion-button fill=\"solid\" color=\"primary\" expand=\"block\" shape=\"round\">\n          <ion-icon slot=\"start\" name=\"log-in\"></ion-icon>\n          <ion-label>Login</ion-label>\n        </ion-button>\n      </ion-col>\n    </ion-row>\n  </div>\n\n</ion-content>\n";
    /***/
  },

  /***/
  "./src/app/home/home-routing.module.ts":
  /*!*********************************************!*\
    !*** ./src/app/home/home-routing.module.ts ***!
    \*********************************************/

  /*! exports provided: HomePageRoutingModule */

  /***/
  function srcAppHomeHomeRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HomePageRoutingModule", function () {
      return HomePageRoutingModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _home_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./home.page */
    "./src/app/home/home.page.ts");

    var routes = [{
      path: '',
      component: _home_page__WEBPACK_IMPORTED_MODULE_3__["HomePage"]
    }];

    var HomePageRoutingModule = function HomePageRoutingModule() {
      _classCallCheck(this, HomePageRoutingModule);
    };

    HomePageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], HomePageRoutingModule);
    /***/
  },

  /***/
  "./src/app/home/home.module.ts":
  /*!*************************************!*\
    !*** ./src/app/home/home.module.ts ***!
    \*************************************/

  /*! exports provided: HomePageModule */

  /***/
  function srcAppHomeHomeModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HomePageModule", function () {
      return HomePageModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _home_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./home.page */
    "./src/app/home/home.page.ts");
    /* harmony import */


    var _home_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./home-routing.module */
    "./src/app/home/home-routing.module.ts");

    var HomePageModule = function HomePageModule() {
      _classCallCheck(this, HomePageModule);
    };

    HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _home_routing_module__WEBPACK_IMPORTED_MODULE_6__["HomePageRoutingModule"]],
      declarations: [_home_page__WEBPACK_IMPORTED_MODULE_5__["HomePage"]]
    })], HomePageModule);
    /***/
  },

  /***/
  "./src/app/home/home.page.scss":
  /*!*************************************!*\
    !*** ./src/app/home/home.page.scss ***!
    \*************************************/

  /*! exports provided: default */

  /***/
  function srcAppHomeHomePageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".login-block {\n  position: fixed;\n  bottom: 0;\n  display: flex;\n  justify-content: center;\n  width: 100%;\n}\n\n.self-check-block {\n  border-bottom-left-radius: 45px;\n  border-bottom-right-radius: 45px;\n  padding: 20px 15px 20px 15px;\n}\n\n.tracker-title {\n  font-weight: 600;\n  padding-bottom: 30px;\n  font-size: 17px;\n}\n\n.tracker-subtitle {\n  font-weight: 600;\n  font-size: 14px;\n  padding-bottom: 10px;\n}\n\n.tracker-description {\n  font-size: 13px;\n  font-weight: 200;\n  text-align: left;\n  padding-bottom: 10px;\n}\n\n.chw-block {\n  position: fixed;\n  bottom: 16px;\n  left: 15px;\n  right: 15px;\n  background-color: #eeeefd;\n  border-radius: 5px;\n  padding: 15px;\n}\n\n.chw-block ion-img {\n  height: 130px;\n}\n\n.chw-content {\n  padding-left: 7px;\n  width: 70%;\n}\n\n.protect-slide {\n  display: block;\n  border-radius: 5px;\n}\n\n.protect-slide ion-img {\n  height: calc(100vh - 520px);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL21rb213YS9kZXZlbG9wbWVudHMvcGxheWdyb3VuZC9sYWIvc3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIiwic3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxXQUFBO0FDQ0Y7O0FERUE7RUFDRSwrQkFBQTtFQUNBLGdDQUFBO0VBQ0EsNEJBQUE7QUNDRjs7QURFQTtFQUNFLGdCQUFBO0VBQ0Esb0JBQUE7RUFDQSxlQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxvQkFBQTtBQ0NGOztBREVBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtBQ0NGOztBREVBO0VBQ0UsZUFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0FDQ0Y7O0FERUE7RUFDRSxhQUFBO0FDQ0Y7O0FERUE7RUFDRSxpQkFBQTtFQUNBLFVBQUE7QUNDRjs7QURFQTtFQUNFLGNBQUE7RUFDQSxrQkFBQTtBQ0NGOztBREVBO0VBQ0UsMkJBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubG9naW4tYmxvY2sge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGJvdHRvbTogMDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uc2VsZi1jaGVjay1ibG9jayB7XG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDQ1cHg7XG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA0NXB4O1xuICBwYWRkaW5nOiAyMHB4IDE1cHggMjBweCAxNXB4O1xufVxuXG4udHJhY2tlci10aXRsZSB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHBhZGRpbmctYm90dG9tOiAzMHB4O1xuICBmb250LXNpemU6IDE3cHg7XG59XG5cbi50cmFja2VyLXN1YnRpdGxlIHtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbn1cblxuLnRyYWNrZXItZGVzY3JpcHRpb24ge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiAyMDA7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xufVxuXG4uY2h3LWJsb2NrIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBib3R0b206IDE2cHg7XG4gIGxlZnQ6IDE1cHg7XG4gIHJpZ2h0OiAxNXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWZkO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDE1cHg7XG59XG5cbi5jaHctYmxvY2sgaW9uLWltZyB7XG4gIGhlaWdodDogMTMwcHg7XG59XG5cbi5jaHctY29udGVudCB7XG4gIHBhZGRpbmctbGVmdDogN3B4O1xuICB3aWR0aDogNzAlO1xufVxuXG4ucHJvdGVjdC1zbGlkZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5wcm90ZWN0LXNsaWRlIGlvbi1pbWcge1xuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA1MjBweCk7XG59XG4iLCIubG9naW4tYmxvY2sge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGJvdHRvbTogMDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uc2VsZi1jaGVjay1ibG9jayB7XG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDQ1cHg7XG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA0NXB4O1xuICBwYWRkaW5nOiAyMHB4IDE1cHggMjBweCAxNXB4O1xufVxuXG4udHJhY2tlci10aXRsZSB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHBhZGRpbmctYm90dG9tOiAzMHB4O1xuICBmb250LXNpemU6IDE3cHg7XG59XG5cbi50cmFja2VyLXN1YnRpdGxlIHtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbn1cblxuLnRyYWNrZXItZGVzY3JpcHRpb24ge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiAyMDA7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xufVxuXG4uY2h3LWJsb2NrIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBib3R0b206IDE2cHg7XG4gIGxlZnQ6IDE1cHg7XG4gIHJpZ2h0OiAxNXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWZkO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDE1cHg7XG59XG5cbi5jaHctYmxvY2sgaW9uLWltZyB7XG4gIGhlaWdodDogMTMwcHg7XG59XG5cbi5jaHctY29udGVudCB7XG4gIHBhZGRpbmctbGVmdDogN3B4O1xuICB3aWR0aDogNzAlO1xufVxuXG4ucHJvdGVjdC1zbGlkZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5wcm90ZWN0LXNsaWRlIGlvbi1pbWcge1xuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA1MjBweCk7XG59Il19 */";
    /***/
  },

  /***/
  "./src/app/home/home.page.ts":
  /*!***********************************!*\
    !*** ./src/app/home/home.page.ts ***!
    \***********************************/

  /*! exports provided: HomePage */

  /***/
  function srcAppHomeHomePageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HomePage", function () {
      return HomePage;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var HomePage = function HomePage() {
      _classCallCheck(this, HomePage);

      this.slideOptions = {
        initialSlide: 0,
        speed: 400,
        cubeEffect: {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94
        }
      };
    };

    HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-home',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./home.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./home.page.scss */
      "./src/app/home/home.page.scss"))["default"]]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], HomePage);
    /***/
  }
}]);
//# sourceMappingURL=home-home-module-es5.js.map