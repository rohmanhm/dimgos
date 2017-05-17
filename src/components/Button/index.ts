import styled from 'styled-components';
import { color } from '../../constants/styles';

export interface ButtonProps {
  bg?: string;
};

const Default = styled.button`
  background: ${ (props: ButtonProps) => props.bg ? props.bg : color.default };
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  color: #FFFFFF;
  width: 160px;
  height: 40px;
  border: 0;
  margin: 0 10px;
`;

export const Red = styled(Default)`
  background: ${ color.red };
`;

export default Default;
