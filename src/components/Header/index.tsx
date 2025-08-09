import styled from 'styled-components'
import logo from '../../assets/Logo.png'


const Header = () => {
  return (
    <Container>
      <img src={logo} alt="Logo La Serena Research" height={79}  />
    </Container>
  )
}

export default Header


const Container = styled.header`
  height: 104px;
  background-color: rgba(163, 243, 248, 0.05);
  display: flex;
  align-items: center;
  max-width: 100vw;
  z-index: 999;
  padding-left: 0px;
  box-shadow: 0px 4px 4px rgba(52, 52, 52, 0.25);
  img {
    margin-left: 16px;
  }
`

