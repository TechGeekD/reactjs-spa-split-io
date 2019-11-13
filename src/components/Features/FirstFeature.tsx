import * as React from "react";
import { Image } from "react-bootstrap";

interface FirstFeatureProps {
  treatment: SplitIO.Treatment;
}
const ON = "on";

export class FirstFeature extends React.Component<FirstFeatureProps, {}> {
  render() {
    const { treatment } = this.props;

    if (treatment === ON) {
      return (
        <div className="App-marketing-campaign App-center-item">
          <Image
            className="App-image-banner"
            src={require("../../assets/img/limited-offer.jpg")}
            fluid
          />
          <Image
            className="App-image-banner"
            src={require("../../assets/img/limited-offer.jpg")}
            fluid
          />
          <Image
            className="App-image-banner"
            src={require("../../assets/img/limited-offer.jpg")}
            fluid
          />
        </div>
      );
    } else {
      return null;
    }
  }
}
