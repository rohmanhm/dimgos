import * as React from 'react';
import styled from 'styled-components';
import { color } from '../../constants/styles';

export interface DropzonProps {
  bgImage?: string;
};

export const StyledDropzone = styled.div`
  border: 4px dashed ${ color.default };
  box-sizing: border-box;
  padding: 0 8%;
  background: #FFFFFF;
  height: 295px;
  box-shadow: 0px 4px 25px rgba(0, 23, 31, 0.12);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${ color.default };
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  margin: 20px 0;
  backgroundImage: ${ (props: DropzonProps) => props.bgImage ? `url(${props.bgImage})` : '' };
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

class Dropzone extends React.Component<DropzonProps, null> {
  constructor (props: Object) {
    super(props);
  }

  render() {
    return (
      <StyledDropzone bgImage={(this.props as DropzonProps).bgImage}>
        {this.props.children}
      </StyledDropzone>
    );
  }
}

export default Dropzone;
