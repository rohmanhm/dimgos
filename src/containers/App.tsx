import * as React from 'react';
import '../assets/styles/App.css';
import styled from 'styled-components';
import Header from '../components/Header';
import Dropzone from '../components/Dropzone';
import Button from '../components/Button';
import { color } from '../constants/styles';

const StyledInput = styled.input`
  background: #FFFFFF;
  color: ${ color.default }
  border-radius: 4px;
  width: 100%;
  border: 0;
  margin: 20px auto;
  font-size: 16px;
  padding: 15px 20px;
  &:focus {
    box-shadow: 0px 4px 25px rgba(0, 23, 31, 0.12);
  }
`;

const DownloadSection = styled.div`
  width: 540px;
  max-width: 95%;
  margin: 10px auto;
`;

const DownloadOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

class App extends React.Component<{}, null> {
  public imgPreview: HTMLImageElement | void;

  constructor (props: {}) {
    super(props);
    this.handleOnDrop = this.handleOnDrop.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.imgPreview = undefined;
  }

  loadImage (url: string) {
    return new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => resolve(img);
      img.src = url;
    });
  }

  async getImageBase64 (url: string) {
    try {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      const img = await this.loadImage(url);
      canvas.height = (img as HTMLImageElement).height;
      canvas.width = (img as HTMLImageElement).width;

      const context = canvas.getContext('2d');

      if (context) {
        context.drawImage((img as HTMLImageElement), 0, 0);
      }

      return await canvas.toDataURL('image/jpeg');
    } catch (e) {
      throw new Error(`Bimage: ${ e }`);
    }
  }

  /* tslint:disable */
  handlePaste (event: any) {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (const index in items) {
      const item = items[index];
      if (item.kind === 'file') {
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (event: any) => {
          if (event.target && event.target.result) {
            (this.imgPreview as HTMLImageElement).src = event.target.result
          }
        };
        reader.readAsDataURL(blob);
      }
    }
  }
  /* tslint:enable */

  handleOnDrop (event: any) { // tslint:disable-line no-any
    event.stopPropagation();
    event.preventDefault(); 
    const imageUrl = event.dataTransfer.getData('URL');
    this.getImageBase64(imageUrl).then(result => {
      (this.imgPreview as HTMLImageElement).src = result;
    });
  }

  handleNoop (event: any) { // tslint:disable-line no-any
    event.stopPropagation();
    event.preventDefault(); 
  }

  handleReset () {
    this.imgPreview = undefined;
  }

  render() {
    return (
      <div
        className="App"
        onPaste={this.handlePaste}
        onDragStart={this.handleNoop}
        onDragExit={this.handleNoop}
        onDragOver={this.handleNoop}
        onDrop={this.handleOnDrop}
      >
        <Header />
        <div className="main">
          <img ref={input => this.imgPreview = input} src="" alt=""/>
          <DownloadSection>
            <Dropzone>
              Drag or paste image to here
            </Dropzone>
            <div className="optional-message" style={{textAlign: 'center'}}>
              <label htmlFor="input-url">Or just paste Image URL</label>
            </div>
            <StyledInput id="input-url" type="text" placeholder="http://yourimagepath.com/image.jpg"/>
            <DownloadOption>
              <div className="checkbox">
                <input type="checkbox" id="cb-autofilename"/>
                <label htmlFor="cb-autofilename">Auto file name</label>
              </div>
              <div className="button">
                <Button bg={color.red}>Reset</Button>
                <Button>Download</Button>
              </div>
            </DownloadOption>
          </DownloadSection>
        </div>
      </div>
    );
  }
}

export default App;
