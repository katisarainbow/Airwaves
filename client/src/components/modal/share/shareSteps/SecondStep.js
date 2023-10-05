import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  ModalBody,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';

import Cropper from 'react-easy-crop';
import getCroppedImg from './utils/cropImage';
import ThirdStep from './ThirdStep';

const SecondStep = ({ imageToCrop, setImageToCrop, onClose }) => {
  const [isImageCropped, setIsImageCropped] = useState(false);
  const [previewImageForm, setPreviewImageForm] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      const { file } = await getCroppedImg(
        imageToCrop,
        croppedAreaPixels,
        rotation
      );
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageForm(reader.result.toString());
        setIsImageCropped(true);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {!isImageCropped ? (
        <>
          <ModalBody w="100%" borderTop="1px" borderColor="secondary">
            <Flex
              mt="1rem"
              justify="space-around"
              h="80%"
              align="center"
              direction="column"
            >
              <Box
                sx={{
                  background: 'secondary',
                  position: 'relative',
                  width: '100%',
                  height: '30rem',
                }}
              >
                <Cropper
                  objectFit="contain"
                  aspect={4 / 3}
                  image={imageToCrop}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                  onCropChange={setCrop}
                  onCropComplete={cropComplete}
                />
              </Box>
              <Flex w="100%" bg="secondary" direction="column" padding="2rem">
                <Box
                  color="text"
                  display="flex"
                  flexDirection="column"
                  mt="1.2rem"
                >
                  <Text align="initial"> Zoom: {zoomPercent(zoom)}</Text>
                  <Slider
                    colorScheme="purple"
                    mt="1rem"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(zoom) => setZoom(zoom)}
                    aria-label="slider-ex-1"
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Box>
                <Box display="flex" flexDirection="column" mt="1rem">
                  <Text align="initial" color="text">
                    {' '}
                    Rotation: {rotation + '°'}
                  </Text>
                  <Slider
                    colorScheme="purple"
                    mt="1rem"
                    min={0}
                    max={300}
                    value={rotation}
                    onChange={(rotation) => setRotation(rotation)}
                    aria-label="slider-ex-1"
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Box>
              </Flex>
            </Flex>
            <Flex justify="flex-end" mt="1rem">
              <Button
                variant="textOnly"
                width="200px"
                onClick={() => {
                  setImageToCrop(null);
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={cropImage}>
                Next
              </Button>
            </Flex>
          </ModalBody>
        </>
      ) : (
        <ThirdStep {...{ previewImageForm, setImageToCrop, onClose }} />
      )}
    </>
  );
};

export default SecondStep;

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};
