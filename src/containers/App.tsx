import * as React from 'react';
import '../assets/styles/App.css';
import styled from 'styled-components';
import lastText = require('last-text-url');
import * as autobind from 'autobind-decorator';
import Header from '../components/Header';
import Dropzone from '../components/Dropzone';
import Button from '../components/Button';
import { color } from '../constants/styles';
import { makeImage } from '../utils/image';

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

interface State {
  imgSrc: string | void;
  fileName: string | void;
};

class App extends React.Component<{}, State> {
  constructor (props: {}) {
    super(props);
  }

  componentDidMount () {
    this.setState({
      imgSrc: undefined,
      fileName: undefined
    });
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
  @autobind
  handlePaste (event: any) {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (const index in items) {
      const item = items[index];
      if (item.kind === 'file') {
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (event: any) => {
          if (event.target && event.target.result) {
            this.setState({
              imgSrc: event.target.result,
              fileName: Math.random().toString(36).substr(2, 5)
            });
          }
        };
        reader.readAsDataURL(blob);
      }
    }
  }
  /* tslint:enable */

  @autobind
  handleOnDrop (event: any) { // tslint:disable-line no-any
    event.stopPropagation();
    event.preventDefault(); 
    const imageUrl = event.dataTransfer.getData('URL');
    makeImage(imageUrl)
      .catch(error => alert('CORS Error, try to copy paste the image.'))
      .then((img: HTMLImageElement) => {
        this.setState({
          imgSrc: img.src,
          fileName: lastText(imageUrl)
        });
      });
  }

  @autobind
  handleNoop (event: any) { // tslint:disable-line no-any
    event.stopPropagation();
    event.preventDefault(); 
  }

  @autobind
  handleReset () {
    this.setState({
      imgSrc: undefined,
      fileName: undefined
    });
  }

  @autobind
  handleDownload () {
    const link = document.createElement('a');
    link.download = (this.state.fileName as string);
    link.href = (this.state.imgSrc as string);

    link.click();
  }

  render() {
    let dropzoneProps = {};
    if (this.state) {
      if (this.state.imgSrc) {
        dropzoneProps = Object.assign(dropzoneProps, {
          bgImage: this.state.imgSrc
        });
      }

      const inputURL = document.getElementById('input-url');
      (inputURL as HTMLInputElement).value = this.state.fileName || '';
    }

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
          <DownloadSection>
            <Dropzone {...dropzoneProps}>
              Drag or paste image to here
            </Dropzone>
            <div className="optional-message" style={{textAlign: 'center'}}>
              <label htmlFor="input-url">Or just paste Image URL</label>
            </div>
            <StyledInput
              id="input-url"
              type="text"
              placeholder="http://yourimagepath.com/image.jpg"
            />
            <DownloadOption>
              &nbsp;
              {/*<div className="checkbox">
                <input type="checkbox" id="cb-autofilename"/>
                <label htmlFor="cb-autofilename">Auto file name</label>
              </div>*/}
              <div className="button">
                <Button onClick={this.handleReset} bg={color.red}>Reset</Button>
                <Button onClick={this.handleDownload}>Download</Button>
              </div>
            </DownloadOption>
          </DownloadSection>
        </div>
      </div>
    );
  }
}

export default App;
