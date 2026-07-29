"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import Cropper from "react-easy-crop"
import "react-easy-crop/react-easy-crop.css"
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function CropModal({ open, image, cropShape, aspect, onCropComplete, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const croppedAreaPixelsRef = useRef(null)

  useEffect(() => {
    if (open) {
      setCrop({ x: 0, y: 0 })
      setZoom(1)
    }
  }, [open])

  const onCropChange = useCallback((location) => {
    setCrop(location)
  }, [])

  const onZoomChange = useCallback((z) => {
    setZoom(z)
  }, [])

  const onCropAreaComplete = useCallback((croppedArea, croppedAreaPixels) => {
    croppedAreaPixelsRef.current = croppedAreaPixels
  }, [])

  const handleConfirm = useCallback(async () => {
    const pixels = croppedAreaPixelsRef.current
    if (!pixels) return

    const imgElement = document.querySelector('.reactEasyCrop_Image')
    if (!imgElement) return

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = pixels.width
    canvas.height = pixels.height

    ctx.drawImage(
      imgElement,
      pixels.x,
      pixels.y,
      pixels.width,
      pixels.height,
      0,
      0,
      pixels.width,
      pixels.height,
    )

    canvas.toBlob(
      (blob) => {
        if (blob) onCropComplete(blob)
      },
      "image/jpeg",
      0.9,
    )
  }, [onCropComplete])

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel?.()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-80 overflow-hidden rounded-lg bg-black/10">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect ?? 1}
            cropShape={cropShape ?? "rect"}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropAreaComplete}
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Zoom</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
