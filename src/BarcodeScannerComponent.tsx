import React from 'react'
import { BrowserMultiFormatReader, BrowserMultiFormatReaderInverse, Result } from 'zxing-library2'
import Webcam from 'react-webcam'

const BarcodeScannerComponent = ({
  width,
  height,
  onUpdate,
  inverse
}: {
  width: number;
  height: number;
  onUpdate: (arg0: unknown, arg1?: Result) => void;
  inverse: boolean;
}): React.ReactElement => {
  const webcamRef = React.useRef(null)
  const codeReader = new BrowserMultiFormatReader()
  const InverseCodeReader = new BrowserMultiFormatReaderInverse()

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef?.current?.getScreenshot()
      if (imageSrc) {
        if (!inverse) {
            codeReader.decodeFromImage(undefined, imageSrc).then((result: any) => {
                onUpdate(null, result)
                }).catch((err: any) => {
                onUpdate(err)
            })
        } else {
            InverseCodeReader.decodeFromImage(undefined, imageSrc).then((result: any) => {
                onUpdate(null, result)
                }).catch((err: any) => {
                onUpdate(err)
            })
        }
      }
    },
    [codeReader, onUpdate]
  )

  React.useEffect(() => {
    setInterval(capture, 100)
  }, []);

  return (
    <Webcam
      audio={false}
      width={width}
      height={height}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
    />
  )
}

export default BarcodeScannerComponent
