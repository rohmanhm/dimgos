import * as React from 'react';
import styled from 'styled-components';
import { color } from '../../constants/styles';

export const StyledHeader = styled.header`
  background-color: ${ color.default };
  width: 100%;
  color: #FFF;
  padding: 15px 0;
  text-align: center;
`;

class Header extends React.Component<{}, null> {
  render() {
    return (
      <StyledHeader>
        Dimgos
      </StyledHeader>
    );
  }
}

export default Header;
