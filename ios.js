import React from "react";
import { requireNativeComponent, NativeModules } from "react-native";
import PropTypes from "prop-types";

const RNPdfScanner = requireNativeComponent("RNPdfScanner", PdfScanner);

class PdfScanner extends React.Component {
  sendonDocumentTakenEvent(event) {
    return this.props.onDocumentTaken(event.nativeEvent);
  }

  sendOnRectanleDetectEvent(event) {
    if (!this.props.onRectangleDetect) return null;
    return this.props.onRectangleDetect(event.nativeEvent);
  }

  getImageQuality() {
    if (!this.props.quality) return 0.8;
    if (this.props.quality > 1) return 1;
    if (this.props.quality < 0.1) return 0.1;
    return this.props.quality;
  }

  capture() {
    NativeModules.RNPdfScannerManager.capture();
  }

  render() {
    return (
      <RNPdfScanner
        {...this.props}
        onDocumentTaken={this.sendonDocumentTakenEvent.bind(this)}
        onRectangleDetect={this.sendOnRectanleDetectEvent.bind(this)}
        useFrontCam={this.props.useFrontCam || false}
        brightness={this.props.brightness || 0}
        saturation={this.props.saturation || 1}
        contrast={this.props.contrast || 1}
        quality={this.getImageQuality()}
        detectionCountBeforeCapture={
          this.props.detectionCountBeforeCapture || 5
        }
        detectionRefreshRateInMS={this.props.detectionRefreshRateInMS || 50}
      />
    );
  }
}

PdfScanner.propTypes = {
  onDocumentTaken: PropTypes.func,
  onRectangleDetect: PropTypes.func,
  overlayColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  enableTorch: PropTypes.bool,
  useFrontCam: PropTypes.bool,
  saturation: PropTypes.number,
  brightness: PropTypes.number,
  contrast: PropTypes.number,
  detectionCountBeforeCapture: PropTypes.number,
  detectionRefreshRateInMS: PropTypes.number,
  quality: PropTypes.number,
};

export default PdfScanner;
