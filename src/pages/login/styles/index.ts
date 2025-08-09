import { styled } from "styled-components"
import fonts from "../../../types/fonts"
import colors from "../../../types/colores"


export const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: white;
`

export const Card = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`

export const Title = styled.h1`
  font-family: ${fonts.family.heading};
  font-size: ${fonts.size.title};
  font-weight: ${fonts.weight.bold};
  margin-bottom: 8px;
  color: ${colors.grayStandard};
`

export const Subtitle = styled.p`
  font-family: ${fonts.family.body};
  font-size: ${fonts.size.base};
  color: ${colors.grayStandard};
  margin-bottom: 24px;
`

export const ToggleBtn = styled.div`
  position: absolute;
  display: flex;
  right: 12px;
  bottom: 14px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
`

export const RecoverLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 16px;
  color: ${colors.standardBlue};
  font-family: ${fonts.family.body};
  font-size: ${fonts.size.sm};
  text-decoration: underline;
  cursor: pointer;
`