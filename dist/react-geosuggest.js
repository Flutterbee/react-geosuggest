(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Geosuggest = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global google */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _GeosuggestItem = require('./GeosuggestItem');

var _GeosuggestItem2 = _interopRequireDefault(_GeosuggestItem);

// eslint-disable-line

var Geosuggest = _react2['default'].createClass({
  displayName: 'Geosuggest',

  /**
   * Get the default props
   * @return {Object} The state
   */
  getDefaultProps: function getDefaultProps() {
    return {
      fixtures: [],
      initialValue: '',
      placeholder: 'Search places',
      disabled: false,
      className: '',
      location: null,
      radius: 0,
      bounds: null,
      country: null,
      types: null,
      googleMaps: null,
      onSuggestSelect: function onSuggestSelect() {},
      onFocus: function onFocus() {},
      onBlur: function onBlur() {},
      onChange: function onChange() {},
      skipSuggest: function skipSuggest() {},
      getSuggestLabel: function getSuggestLabel(suggest) {
        return suggest.description;
      },
      autoActivateFirstSuggest: false,
      autoShowSuggest: false
    };
  },

  /**
   * Get the initial state
   * @return {Object} The state
   */
  getInitialState: function getInitialState() {
    return {
      isSuggestsHidden: true,
      userInput: this.props.initialValue,
      placeholder: this.props.placeholder,
      activeSuggest: null,
      fixtures: this.props.fixtures,
      suggests: [],
      disabled: this.props.disabled,
      className: this.props.className
    };
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this.props.blurred) {
      this.hideSuggests();
      _react2['default'].findDOMNode(this.refs['geosuggestInput']).blur();
    }
  },

  /**
   * Change inputValue if prop changes
   * @param {Object} props The new props
   */
  componentWillReceiveProps: function componentWillReceiveProps(props) {
    if (this.props.initialValue !== props.initialValue) {
      this.setState({ userInput: props.initialValue });
    }

    if (props.coordinates) {
      var coords = props.coordinates.split(',');
      var latlng = {
        lat: parseFloat(coords[0]),
        lng: parseFloat(coords[1])
      };

      this.reverseGeocode(latlng, false, false);
    }

    this.setState({
      fixtures: props.fixtures
    });

    // if(props.initialValue===''){
    //   this.refs.geosuggestInput.focus();
    // }
    if (this.props.autoShowSuggest) {
      this.state.fixtures = props.fixtures;
      this.showSuggests();
    }
  },

  /**
   * Called on the client side after component is mounted.
   * Google api sdk object will be obtained and cached as a instance property.
   * Necessary objects of google api will also be determined and saved.
   */
  componentDidMount: function componentDidMount() {
    var googleMaps = this.props.googleMaps || google && google.maps || this.googleMaps;

    if (!googleMaps) {
      console.error('Google map api was not found in the page.');
    } else {
      this.googleMaps = googleMaps;
    }

    this.autocompleteService = new googleMaps.places.AutocompleteService();
    this.geocoder = new googleMaps.Geocoder();
    this.refs['big-locality'].style['display'] = "none";
    this.setInputValue({ value: this.props.initialValue, placeId: this.props.placeId });

    // if(!this.props.initialValue && !this.props.placeId){
    //   this.refs.geosuggestInput.focus();
    // }
    //this.refs.geosuggestInput.focus();
    //this.hideSuggests();
    //this.showSuggests();
  },

  /**
   * Method used for setting initial value.
   * @param {string} value to set in input
   */
  setInputValue: function setInputValue(obj) {

    var _this = this;
    if (obj.value) {
      this.setState({
        userInput: obj.value
      });
    } else if (obj.placeId) {
      this.geocoder.geocode({
        placeId: obj.placeId
      }, function (results, status) {
        var gmaps = results[0],
            location = gmaps.geometry.location;

        var value = gmaps.formatted_address;
        _this.setState({
          userInput: value
        });
        _this.hideSuggests();
      });
    }
  },

  /**
   * When the input got changed
   */
  onInputChange: function onInputChange() {
    var userInput = this.refs.geosuggestInput.value;

    this.setState({ userInput: userInput }, (function () {
      this.showSuggests();
      this.props.onChange(userInput);
    }).bind(this));
  },

  /**
   * When the input gets focused
   */
  onFocus: function onFocus() {
    if (this.state.className === "loading-geolocation") {

      this.setState({
        userInput: '',
        className: ''
      });
    }
    this.props.onFocus();
    this.showSuggests();
  },

  /**
   * Update the value of the user input
   * @param {String} value the new value of the user input
   */
  update: function update(value) {
    this.setState({ userInput: value });
    this.props.onChange(value);
  },

  /*
   * Clear the input and close the suggestion pane
   */
  clear: function clear() {
    this.setState({ userInput: '' });
    this.refs['geosuggestInput'].focus();
  },

  /**
   * Search for new suggests
   */
  searchSuggests: function searchSuggests() {
    if (!this.state.userInput) {
      this.updateSuggests();
      return;
    }

    var options = {
      input: this.state.userInput,
      location: this.state.location || new this.googleMaps.LatLng(0, 0),
      radius: this.state.radius || 0
    };

    if (this.props.bounds) {
      options.bounds = this.props.bounds;
    }

    if (this.props.types) {
      options.types = this.props.types;
    }

    if (this.props.country) {
      options.componentRestrictions = {
        country: this.props.country
      };
    }

    this.autocompleteService.getPlacePredictions(options, (function (suggestsGoogle) {
      this.updateSuggests(suggestsGoogle);

      if (this.props.autoActivateFirstSuggest) {
        this.activateSuggest('next');
      }
    }).bind(this));
  },

  isAlreadyPresnt: function isAlreadyPresnt(suggests, suggest) {
    for (var i = suggests.length - 1; i >= 0; i--) {
      if (suggests[i].placeId === suggest.place_id) {
        return true;
      }
    };
    return false;
  },

  /**
   * Update the suggests
   * @param  {Object} suggestsGoogle The new google suggests
   */
  updateSuggests: function updateSuggests(suggestsGoogle) {
    var _this2 = this;

    var _this = this;
    if (!suggestsGoogle) {
      suggestsGoogle = [];
    }

    var suggests = [],
        regex = new RegExp(this.state.userInput, 'gim'),
        skipSuggest = this.props.skipSuggest;

    this.state.fixtures.forEach(function (suggest) {
      if (!skipSuggest(suggest.gmaps) && (!_this.state.userInput || suggest.label.match(regex))) {
        suggest.placeId = suggest.placeId || suggest.label;
        suggests.push(suggest);
      }
    });

    suggestsGoogle.forEach(function (suggest) {
      if (!skipSuggest(suggest) && !_this2.isAlreadyPresnt(suggests, suggest)) {
        suggests.push({
          label: _this2.props.getSuggestLabel(suggest),
          placeId: suggest.place_id
        });
      }
    });

    this.setState({ suggests: suggests });
  },

  /**
   * When the input gets focused
   */
  showSuggests: function showSuggests() {
    this.searchSuggests();
    this.setState({ isSuggestsHidden: false });
  },

  /**
   * When the input loses focused
   */
  hideSuggests: function hideSuggests() {
    this.props.onBlur();
    setTimeout((function () {
      this.setState({ isSuggestsHidden: true });
    }).bind(this), 100);
  },

  clearLocality: function clearLocality() {
    this.setState({
      locality: undefined,
      placeholder: this.props.placeholder,
      activeSuggest: undefined
    });
    this.refs['big-locality'].style['display'] = "none";
    this.refs['geosuggestInput'].style['padding-left'] = 12 + 20 + "px";
    //this.refs['geosuggestInput'].focus();
  },

  clearIfLocality: function clearIfLocality(argument) {
    if (this.state.userInput === "") {
      this.clearLocality();
    }
  },

  /**
   * When a key gets pressed in the input
   * @param  {Event} event The keypress event
   */
  onInputKeyDown: function onInputKeyDown(event) {
    switch (event.which) {
      case 40:
        // DOWN
        event.preventDefault();
        this.activateSuggest('next');
        break;
      case 38:
        // UP
        event.preventDefault();
        this.activateSuggest('prev');
        break;
      case 13:
        // ENTER
        event.preventDefault();
        this.selectSuggest(this.state.activeSuggest);
        break;
      case 9:
        // TAB
        this.selectSuggest(this.state.activeSuggest);
        break;
      case 27:
        // ESC
        this.hideSuggests();
        break;
      case 8:
        //Backspace
        this.clearIfLocality();
      default:
        break;
    }
  },

  /**
   * Activate a new suggest
   * @param {String} direction The direction in which to activate new suggest
   */
  activateSuggest: function activateSuggest(direction) {
    if (this.state.isSuggestsHidden) {
      this.showSuggests();
      return;
    }

    var suggestsCount = this.state.suggests.length - 1,
        next = direction === 'next',
        newActiveSuggest = null,
        newIndex = 0,
        i = 0; // eslint-disable-line id-length

    for (i; i <= suggestsCount; i++) {
      if (this.state.suggests[i] === this.state.activeSuggest) {
        newIndex = next ? i + 1 : i - 1;
      }
    }

    if (!this.state.activeSuggest) {
      newIndex = next ? 0 : suggestsCount;
    }

    if (newIndex >= 0 && newIndex <= suggestsCount) {
      newActiveSuggest = this.state.suggests[newIndex];
    }

    this.setState({ activeSuggest: newActiveSuggest });
  },

  /**
   * When an item got selected
   * @param {GeosuggestItem} suggest The selected suggest item
   */
  selectSuggest: function selectSuggest(suggest) {
    if (!suggest) {
      return;
    }

    this.setState({
      isSuggestsHidden: true
    });

    if (suggest.type && suggest.type === "geolocate") {

      // on Success

      var success = function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var accuracy = position.coords.accuracy;
        suggest.position = position;

        var latlng = {
          lat: parseFloat(latitude),
          lng: parseFloat(longitude)
        };

        // this.setState handled in reverseGeocode()

        _this.reverseGeocode(latlng, suggest, accuracy);
      }

      // on Error
      ;

      var error = function error(err) {
        alert('We are unable to locate you. Please check your location settings.');
        console.error('geoLocateUser() failed! Error message = ' + err.message);

        _this.setState({
          userInput: _this.props.initialValue,
          className: _this.props.className
        });

        return false;
      };

      // Check if browser supports geolocation
      if (!navigator.geolocation) {
        alert('Sorry! Your browser does not support geolocation. Please enter your locality manually.');
        return;
      }

      this.setState({
        userInput: "Fetching Location...",
        className: 'loading-geolocation'
      });

      var _this = this;

      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true
      });

      return;
    }

    if (suggest.skipGeoCoding || suggest.location) {
      this.setState({
        userInput: suggest.label
      });

      this.clearLocality();
      this.props.onSuggestSelect(suggest);
      return;
    }

    this.geocodeSuggest(suggest);
  },

  /**
   * Reverse Geocode from latLng to formattedAddress
   */
  reverseGeocode: function reverseGeocode(latlng, suggest, accuracy) {
    var _this = this;

    this.geocoder.geocode({ 'location': latlng }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          // Set formatted address
          latlng.formattedAddress = results[1].formatted_address;

          // Handle inaccurate location
          if (accuracy > 100) {
            var userResponse = window.confirm('Are you located at ' + latlng.formattedAddress.toString() + '?\n');

            if (userResponse !== true) {
              alert('Please enter your location manually.');
              _this.setState({
                userInput: _this.props.initialValue,
                className: _this.props.className
              });
              return;
            }
          }

          // Pass formatted address to userInput
          _this.setState({
            userInput: latlng.formattedAddress,
            className: _this.props.className
          });

          // Trigger select if suggest object is passed
          if (typeof suggest === "object") {
            suggest.gmaps = {
              formatted_address: latlng.formattedAddress
            };
            _this.props.onSuggestSelect(suggest);
          }
        }
      }
    });
  },

  /**
   * Geocode a suggest
   * @param  {Object} suggest The suggest
   */
  geocodeSuggest: function geocodeSuggest(suggest) {

    var geoCodeInput = {};
    if (suggest.placeId) {
      geoCodeInput.placeId = suggest.placeId;
    } else if (suggest.label) {
      geoCodeInput.address = suggest.label;
    }

    this.geocoder.geocode(geoCodeInput, (function (results, status) {

      if (status !== this.googleMaps.GeocoderStatus.OK) {
        return;
      }

      var gmaps = results[0],
          location = gmaps.geometry.location;
      suggest.gmaps = gmaps;

      this.setState({
        userInput: suggest.label
      });
      suggest.location = {
        lat: location.lat(),
        lng: location.lng()
      };
      this.clearLocality();
      this.props.onSuggestSelect(suggest);
    }).bind(this));
  },

  /**
   * Render the view
   * @return {Function} The React element to render
   */
  render: function render() {
    var bigLocalityVisible = this.state.locality ? 'block' : 'none';
    return (// eslint-disable-line no-extra-parens
      _react2['default'].createElement(
        'div',
        { className: 'geosuggest ' + this.state.className,
          onClick: this.onClick },
        _react2['default'].createElement('input', {
          className: 'geosuggest__input',
          ref: 'geosuggestInput',
          type: 'text',
          value: this.state.userInput,
          placeholder: this.state.placeholder,
          disabled: this.state.disabled,
          onKeyDown: this.onInputKeyDown,
          onChange: this.onInputChange,
          onFocus: this.onFocus,
          onBlur: this.hideSuggests }),
        _react2['default'].createElement(
          'div',
          { ref: 'edit-locality', onClick: this.clear, className: ['edit-locality', this.state.userInput ? '' : 'hidden'].join(' ') },
          _react2['default'].createElement(
            'span',
            null,
            'Change'
          )
        ),
        _react2['default'].createElement(
          'div',
          { ref: 'big-locality', className: 'locality', style: { display: bigLocalityVisible } },
          _react2['default'].createElement(
            'span',
            null,
            this.state.locality
          ),
          _react2['default'].createElement(
            'span',
            { onClick: this.clearLocality, className: 'delete-icon' },
            'X'
          )
        ),
        _react2['default'].createElement('div', { className: 'marker-icon' }),
        _react2['default'].createElement(
          'ul',
          { className: this.getSuggestsClasses() },
          this.getSuggestItems()
        )
      )
    );
  },

  /**
   * Get the suggest items for the list
   * @return {Array} The suggestions
   */
  getSuggestItems: function getSuggestItems() {

    if (!this.state.suggests.length && this.state.userInput) {
      this.state.suggests.push({
        label: 'No results found',
        className: 'no-results'
      });
    }

    if (this.props.showGeoLocate && !this.state.userInput) {
      if (this.state.suggests.length == 0 || this.state.suggests[0].type !== 'geolocate') {
        this.state.suggests.unshift({
          label: 'Use my location',
          className: 'geolocate',
          type: 'geolocate'
        });
      }
    }

    return this.state.suggests.map((function (suggest) {
      var isActive = this.state.activeSuggest && suggest.placeId === this.state.activeSuggest.placeId;

      return (// eslint-disable-line no-extra-parens
        _react2['default'].createElement(_GeosuggestItem2['default'], {
          key: suggest.placeId,
          suggest: suggest,
          isActive: isActive,
          onSuggestSelect: this.selectSuggest })
      );
    }).bind(this));
  },

  /**
   * The classes for the suggests list
   * @return {String} The classes
   */
  getSuggestsClasses: function getSuggestsClasses() {
    var classes = 'geosuggest__suggests';

    classes += this.state.isSuggestsHidden ? ' geosuggest__suggests--hidden' : '';

    return classes;
  }
});

module.exports = Geosuggest;

},{"./GeosuggestItem":2}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var GeosuggestItem = _react2['default'].createClass({
  displayName: 'GeosuggestItem',

  /**
   * Get the default props
   * @return {Object} The props
   */
  getDefaultProps: function getDefaultProps() {
    return {
      isActive: false,
      suggest: {
        label: ''
      },
      onSuggestSelect: function onSuggestSelect() {}
    };
  },

  /**
   * When the element gets clicked
   * @param  {Event} event The click event
   */
  onClick: function onClick(event) {
    event.preventDefault();
    this.props.onSuggestSelect(this.props.suggest);
  },

  /**
   * Render the view
   * @return {Function} The React element to render
   */
  render: function render() {
    var split = this.props.suggest.label.split(',');
    var city = split.splice(split.length - 3).join(',');
    var locality = split.join(',');

    return (// eslint-disable-line no-extra-parens
      _react2['default'].createElement(
        'li',
        { className: this.getSuggestClasses(),
          onClick: this.onClick },
        _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'span',
            { className: 'locality-item' },
            locality
          ),
          _react2['default'].createElement(
            'span',
            { className: 'city-item' },
            city
          )
        )
      )
    );
  },

  /**
   * The classes for the suggest item
   * @return {String} The classes
   */
  getSuggestClasses: function getSuggestClasses() {
    var className = this.props.suggest.className;
    var classes = 'geosuggest-item';

    classes += this.props.isActive ? ' geosuggest-item--active' : '';
    classes += className ? ' ' + className : '';

    return classes;
  }
});

module.exports = GeosuggestItem;

},{}]},{},[1])(1)
});