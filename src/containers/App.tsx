import * as React from 'react';
import '../assets/styles/App.css';
import styled from 'styled-components';
import Header from '../components/Header';
import Dropzone from '../components/Dropzone';
import { color } from '../constants/styles';

// const logo = require('../assets/icons/logo.svg');

const StyledInput = styled.input`
  background: #FFFFFF;
  color: ${ color.default }
  box-shadow: 0px 4px 25px rgba(0, 23, 31, 0.12);
  border-radius: 4px;
  width: 100%;
  height: 40px;
  border: 0;
  margin-top: 10px;
  font-size: 13px;
  padding: 0 20px;
`;

const DownloadSection = styled.div`
  width: 540px;
  max-width: 95%;
  margin: 10px auto;
`;

class App extends React.Component<{}, null> {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="main">
          <DownloadSection>
            <Dropzone>
              Drag or paste image to here
            </Dropzone>
            <StyledInput type="text" placeholder="http://yourimagepath.com/image.jpg"/>
          </DownloadSection>
        </div>
      </div>
    );
  }
}

export default App;
