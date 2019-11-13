import * as React from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

interface ThirdFeatureProps {
  treatment: boolean;
  explicitMode: boolean;
  trackList: Array<any>;
  splitAttributes: any;
  setSplitAttribute: any;
}
interface ThirdFeatureState {
  explicitMode: boolean;
}

export class ThirdFeature extends React.Component<
  ThirdFeatureProps,
  ThirdFeatureState
> {
  constructor(props: ThirdFeatureProps) {
    super(props);
    let explicitMode = this.props.splitAttributes.explicitMode;

    this.state = {
      explicitMode: explicitMode ? explicitMode : false
    };
  }

  noExplicitContentLocations = ["India", "Cuba"];

  render() {
    const {
      trackList,
      setSplitAttribute,
      explicitMode,
      splitAttributes
    } = this.props;

    const handleExplicitModeCheckBox = () => {
      this.setState(
        { ...this.state, explicitMode: !this.state.explicitMode },
        () => {
          setSplitAttribute({
            ...splitAttributes,
            explicitMode: this.state.explicitMode
          });
        }
      );
    };

    const explicitToggleButton = (location: string) => {
      if (this.noExplicitContentLocations.includes(location)) {
        return null;
      }

      return (
        <p>
          <label className="pure-material-checkbox">
            <input
              type="checkbox"
              checked={this.state.explicitMode}
              onChange={handleExplicitModeCheckBox}
            />
            <span>Explicit</span>
          </label>
        </p>
      );
    };

    return (
      <Container>
        <Row>
          <Col>
            <Table
              style={{ width: "30rem" }}
              striped
              bordered
              hover
              variant="dark"
              responsive
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    <div className="App-space-between">
                      Top Tracks{" "}
                      {explicitToggleButton(splitAttributes.location)}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {trackList.map((track, index) => (
                  <tr key={track.name}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="App-space-between">
                        {track.name}
                        <Button
                          className="App-buy-btn"
                          variant={
                            track.explicit && explicitMode
                              ? "danger"
                              : "primary"
                          }
                        >
                          {track.explicit && explicitMode
                            ? "Explicit"
                            : "Listen"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}
