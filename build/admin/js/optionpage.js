/******/ (function() { // webpackBootstrap
/******/ 	/************************************************************************/
/*!*********************************!*\
  !*** ./admin/js/option-page.js ***!
  \*********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/* eslint-disable camelcase */

/**
 * WordPress dependencies
 */
var __ = wp.i18n.__;
var _wp$components = wp.components,
    BaseControl = _wp$components.BaseControl,
    Button = _wp$components.Button,
    ExternalLink = _wp$components.ExternalLink,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    Placeholder = _wp$components.Placeholder,
    Spinner = _wp$components.Spinner,
    ToggleControl = _wp$components.ToggleControl;
var _wp$element = wp.element,
    render = _wp$element.render,
    Component = _wp$element.Component,
    Fragment = _wp$element.Fragment;

var App = /*#__PURE__*/function (_Component) {
  _inherits(App, _Component);

  var _super = _createSuper(App);

  function App() {
    var _this;

    _classCallCheck(this, App);

    _this = _super.apply(this, arguments);
    _this.changeOptions = _this.changeOptions.bind(_assertThisInitialized(_this));
    _this.state = {
      isAPILoaded: false,
      isAPISaving: false,
      blank_plugin_analytics_status: false,
      blank_plugin_analytics_key: ''
    };
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      wp.api.loadPromise.then(function () {
        _this2.settings = new wp.api.models.Settings();

        if (false === _this2.state.isAPILoaded) {
          _this2.settings.fetch().then(function (response) {
            _this2.setState({
              blank_plugin_analytics_status: Boolean(response.blank_plugin_analytics_status),
              blank_plugin_analytics_key: response.blank_plugin_analytics_key,
              isAPILoaded: true
            });
          });
        }
      });
    }
  }, {
    key: "changeOptions",
    value: function changeOptions(option, value) {
      var _this3 = this;

      this.setState({
        isAPISaving: true
      });
      var model = new wp.api.models.Settings(_defineProperty({}, option, value));
      model.save().then(function (response) {
        var _this3$setState;

        _this3.setState((_this3$setState = {}, _defineProperty(_this3$setState, option, response[option]), _defineProperty(_this3$setState, "isAPISaving", false), _this3$setState));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      if (!this.state.isAPILoaded) {
        return wp.element.createElement(Placeholder, null, wp.element.createElement(Spinner, null));
      }

      return wp.element.createElement(Fragment, null, wp.element.createElement("div", {
        className: "blank-plugin-header"
      }, wp.element.createElement("div", {
        className: "blank-plugin-container"
      }, wp.element.createElement("div", {
        className: "blank-plugin-logo"
      }, wp.element.createElement("h1", null, __('Blank Plugin'))))), wp.element.createElement("div", {
        className: "blank-plugin-main"
      }, wp.element.createElement(PanelBody, {
        title: __('Settings')
      }, wp.element.createElement(PanelRow, null, wp.element.createElement(BaseControl, {
        label: __('Google Analytics Key'),
        help: 'In order to use Google Analytics, you need to use an API key.',
        id: "blank-plugin-options-google-analytics-api",
        className: "blank-plugin-text-field"
      }, wp.element.createElement("input", {
        type: "text",
        id: "blank-plugin-options-google-analytics-api",
        value: this.state.blank_plugin_analytics_key,
        placeholder: __('Google Analytics API Key'),
        disabled: this.state.isAPISaving,
        onChange: function onChange(e) {
          return _this4.setState({
            blank_plugin_analytics_key: e.target.value
          });
        }
      }), wp.element.createElement("div", {
        className: "blank-plugin-text-field-button-group"
      }, wp.element.createElement(Button, {
        isPrimary: true,
        disabled: this.state.isAPISaving,
        onClick: function onClick() {
          return _this4.changeOptions('blank_plugin_analytics_key', _this4.state.blank_plugin_analytics_key);
        }
      }, __('Save')), wp.element.createElement(ExternalLink, {
        href: "#"
      }, __('Get API Key'))))), wp.element.createElement(PanelRow, null, wp.element.createElement(ToggleControl, {
        label: __('Track Admin Users?'),
        help: 'Would you like to track views of logged-in admin accounts?.',
        checked: this.state.blank_plugin_analytics_status,
        onChange: function onChange() {
          return _this4.changeOptions('blank_plugin_analytics_status', !_this4.state.blank_plugin_analytics_status);
        }
      }))), wp.element.createElement(PanelBody, null, wp.element.createElement("div", {
        className: "blank-plugin-info"
      }, wp.element.createElement("h2", null, __('Got a question for us?')), wp.element.createElement("p", null, __('We would love to help you out if you need any help.')), wp.element.createElement("div", {
        className: "blank-plugin-info-button-group"
      }, wp.element.createElement(Button, {
        isSecondary: true,
        target: "_blank",
        href: "#"
      }, __('Ask a question')), wp.element.createElement(Button, {
        isSecondary: true,
        target: "_blank",
        href: "#"
      }, __('Leave a review')))))));
    }
  }]);

  return App;
}(Component);

render(wp.element.createElement(App, null), document.getElementById('blank-plugin'));
/******/ })()
;