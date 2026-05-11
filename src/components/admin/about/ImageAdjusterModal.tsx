"use client";

import React, { useState, useCallback } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import * as Dialog from "@radix-ui/react-dialog";
import * as Slider from "@radix-ui/react-slider";
import { X, Check, ZoomIn, ZoomOut, Move } from "lucide-react";
import getCroppedImg from "../../../lib/utils/imageCrop";

interface ImageAdjusterModalProps {
  imageSrc: string | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (croppedImage: string) => void;
}

const ImageAdjusterModal = ({
  imageSrc,
  open,
  onClose,
  onConfirm,
}: ImageAdjusterModalProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleConfirm = async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        if (croppedImage) {
          onConfirm(croppedImage);
          onClose();
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (!imageSrc) return null;

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl z-[70] overflow-hidden outline-none">
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <Dialog.Title className="text-lg font-bold text-white flex items-center gap-2">
              <Move className="w-5 h-5 text-primary" />
              Adjust Profile Photo
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="relative h-96 bg-black">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape="round"
              showGrid={false}
            />
          </div>

          <div className="p-6 space-y-6 bg-gray-900">
            <div className="flex items-center gap-4">
              <ZoomOut className="w-4 h-4 text-gray-400" />
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                value={[zoom]}
                onValueChange={([val]) => setZoom(val)}
                min={1}
                max={3}
                step={0.1}
              >
                <Slider.Track className="bg-gray-800 relative grow h-1.5 rounded-full">
                  <Slider.Range className="absolute bg-primary h-full rounded-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white shadow-lg rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary" />
              </Slider.Root>
              <ZoomIn className="w-4 h-4 text-gray-400" />
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Apply Crop
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ImageAdjusterModal;
