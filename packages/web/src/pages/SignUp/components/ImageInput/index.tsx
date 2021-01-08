import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'

import * as s from './styles'

type Props = { image: File | null; setImage: Dispatch<SetStateAction<File | null>> }

export const ImageInput = ({ image, setImage }: Props) => {
  function handleFileSelection(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }

    const file = event.target.files[0]

    if (file.type.split('/')[0] !== 'image') {
      toast.error('That file is not an image')
      return
    }

    if (file.size > 0.1 * 1024 * 1024) {
      toast.error('File size must be less than 2MB')
      return
    }

    setImage(file)
  }

  return (
    <s.Container>
      <s.Input htmlFor="imageInput">
        <s.Image
          src={image ? URL.createObjectURL(image) : 'assets/captured-smile.svg'}
          imageIsSelected={!!image}
        />

        <s.UploadButton>
          <img src="assets/plus.svg" />
        </s.UploadButton>
      </s.Input>

      <s.Label>
        Upload a picture <s.Optional>(optional)</s.Optional>
      </s.Label>

      <input
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={handleFileSelection}
        style={{ display: 'none' }}
      />
    </s.Container>
  )
}
