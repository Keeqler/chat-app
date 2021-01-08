import styled from 'styled-components'

import { InputLabel } from '@/components/InputLabel'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Input = styled.label`
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
  position: relative;
  cursor: pointer;
`

type ImageProps = { imageIsSelected: boolean }

export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #f4f4f4;
  object-fit: ${({ imageIsSelected }: ImageProps) => (imageIsSelected ? 'cover' : 'none')};
`

export const UploadButton = styled.div`
  width: 52px;
  height: 52px;
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #bab3e0;
`

export const Label = styled(InputLabel)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Optional = styled.span`
  font-size: 14px;
  color: #c6c6c6;
`
