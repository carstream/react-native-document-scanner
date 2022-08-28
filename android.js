import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import {
  DeviceEventEmitter, // android
  NativeModules,
  requireNativeComponent,
  View,
} from "react-native";

var iface = {
  name: "DocumentScanner",
  propTypes: {
    documentAnimation: PropTypes.bool,
    detectionCountBeforeCapture: PropTypes.number,
    enableTorch: PropTypes.bool,
    manualOnly: PropTypes.bool,
    overlayColor: PropTypes.string,
    contrast: PropTypes.number,
    brightness: PropTypes.number,
    noGrayScale: PropTypes.bool,
    ...View.propTypes, // include the default view properties
  },
};

const DocumentScanner = requireNativeComponent("DocumentScanner", iface);
const CameraManager = NativeModules.DocumentScannerManager || {};

class Scanner extends PureComponent {
  static defaultProps = {
    onDocumentTaken: () => {},
    onProcessing: () => {},
  };

  componentWillMount() {
    const { onDocumentTaken, onProcessing } = this.props;
    DeviceEventEmitter.addListener("onDocumentTaken", onDocumentTaken);
    DeviceEventEmitter.addListener("onProcessingChange", onProcessing);
  }

  componentWillUnmount() {
    const { onDocumentTaken, onProcessing } = this.props;
    DeviceEventEmitter.removeListener("onDocumentTaken", onDocumentTaken);
    DeviceEventEmitter.removeListener("onProcessingChange", onProcessing);
  }

  capture = () => {
    CameraManager.capture();
  };

  render() {
    return <DocumentScanner {...this.props} />;
  }
}

export default Scanner;
