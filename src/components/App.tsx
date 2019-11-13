import * as React from "react";

import { FirstFeature } from "./Features/FirstFeature";
import { SecondFeature } from "./Features/SecondFeature";
import { ThirdFeature } from "./Features/ThirdFeature";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Badge, Dropdown } from "react-bootstrap";

interface AppProps {
  client: SplitIO.IClient;
  attributes: SplitIO.Attributes;
  featureTreatments: { [key: string]: string };
}
interface AppState {
  // [key: string]: SplitIO.Treatment;
  firstTreatment: SplitIO.Treatment;
  secondTreatment: SplitIO.Treatment;
  thirdTreatment: SplitIO.Treatment;
  fourthTreatment: SplitIO.Treatment;
  showModal: boolean;
  splitAttributes: any;
  productIndex: number;
}

const ON = "on";
const UNAVAILABLE = "unavailable";
const MARKETING_CAMPAIGN = "marketingCampaign";
const PROJECT = "project";
const TRACKS = "tracks";
const EXPLICIT_MODE = "explicitMode";

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    const { client, attributes } = props;
    const firstTreatment: SplitIO.Treatment = client.getTreatment(
      MARKETING_CAMPAIGN,
      attributes
    );
    const secondTreatment: SplitIO.Treatment = client.getTreatment(PROJECT);
    const thirdTreatment: SplitIO.Treatment = client.getTreatment(
      TRACKS,
      attributes
    );
    const fourthTreatment: SplitIO.Treatment = client.getTreatment(
      EXPLICIT_MODE,
      attributes
    );

    // Initial state.
    this.state = {
      firstTreatment,
      secondTreatment,
      thirdTreatment,
      fourthTreatment,
      showModal: false,
      splitAttributes: attributes,
      productIndex: 0
    };
    // On SDK Update event, we will refresh the state for our treatments.
    client.on(client.Event.SDK_UPDATE, () => {
      const feature1: SplitIO.Treatment = client.getTreatment(
        MARKETING_CAMPAIGN,
        this.state.splitAttributes
      );
      const feature2: SplitIO.Treatment = client.getTreatment(PROJECT);
      const feature3: SplitIO.Treatment = client.getTreatment(
        TRACKS,
        this.state.splitAttributes
      );
      const feature4: SplitIO.Treatment = client.getTreatment(
        EXPLICIT_MODE,
        this.state.splitAttributes
      );

      this.setState({
        ...this.state,
        firstTreatment: feature1,
        secondTreatment: feature2,
        thirdTreatment: feature3,
        fourthTreatment: feature4
      });
    });
  }

  featureTreatments = this.props.featureTreatments;
  projectList = [
    {
      name: "Dark Side of the Moon",
      location: ["USA", "France"]
    },
    {
      name: "Abbey Road",
      location: ["India", "USA"]
    },
    {
      name: "Revolver",
      location: ["India", "France", "USA"]
    },
    {
      name: "Led Zeppelin IV",
      location: ["India", "USA"]
    }
  ];
  trackList = [
    {
      name: "On the Run",
      explicit: true
    },
    {
      name: "Here Comes the Sun",
      explicit: false
    },
    {
      name: "Tomorrow Never Knows",
      explicit: false
    },
    {
      name: "Rock and Roll",
      explicit: true
    }
  ];
  locationList = ["India", "USA", "France", "Cuba"];

  handleClose = () =>
    this.setState({
      ...this.state,
      showModal: false
    });

  handleShow = (productIndex: any) =>
    this.setState(
      {
        ...this.state,
        productIndex: productIndex
      },
      () => {
        this.setState({
          ...this.state,
          showModal: true
        });
      }
    );

  setSplitAttribute = (attributes: any) => {
    this.setState(
      {
        ...this.state,
        splitAttributes: attributes
      },
      () => {
        const { client } = this.props;

        console.log(this.state.splitAttributes);
        const feature1: SplitIO.Treatment = client.getTreatment(
          MARKETING_CAMPAIGN,
          this.state.splitAttributes
        );
        const feature2: SplitIO.Treatment = client.getTreatment(PROJECT);
        const feature3: SplitIO.Treatment = client.getTreatment(
          TRACKS,
          this.state.splitAttributes
        );
        const feature4: SplitIO.Treatment = client.getTreatment(
          EXPLICIT_MODE,
          this.state.splitAttributes
        );

        this.setState(
          {
            ...this.state,
            firstTreatment: feature1,
            secondTreatment: feature2,
            thirdTreatment: feature3,
            fourthTreatment: feature4
          },
          () => {
            console.log(this.state);
          }
        );
      }
    );
  };

  render() {
    const {
      firstTreatment,
      secondTreatment,
      thirdTreatment,
      fourthTreatment
      // splitAttributes: { explicitMode }
    } = this.state;

    const firstIsOn = firstTreatment === ON;
    const secondIsOn = secondTreatment === ON;
    const thirdIsOn = thirdTreatment === ON;
    const fourthIsOn = fourthTreatment === ON;
    const thirdIsUnavailable = thirdTreatment === UNAVAILABLE;

    const featureList = Object.keys(this.featureTreatments).map(key => {
      switch (key) {
        case MARKETING_CAMPAIGN:
          this.featureTreatments[key] = firstTreatment;
          break;
        case PROJECT:
          this.featureTreatments[key] = secondTreatment;
          break;
        case TRACKS:
          this.featureTreatments[key] = thirdTreatment;
          break;
        case EXPLICIT_MODE:
          this.featureTreatments[key] = fourthTreatment;
          break;
      }
      return key;
    });

    return (
      <div className="App">
        <div className="App-header">
          <div className="App-location-select">
            <Dropdown
              onSelect={(evt: any) => {
                console.log(evt);
                this.setSplitAttribute({
                  ...this.state.splitAttributes,
                  location: evt
                });
              }}
            >
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {this.state.splitAttributes.location || "Select Location"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {this.locationList.map(location => (
                  <Dropdown.Item eventKey={location}>{location}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <h1>Welcome to Split Demo!</h1>

          {/* <div className="App-section"> */}
          <Row>
            {featureList.map(name => (
              <Col key={name}>
                <Badge
                  pill
                  variant={
                    this.featureTreatments[name] === ON ? "success" : "danger"
                  }
                >
                  {name} is: {this.featureTreatments[name]}
                </Badge>
              </Col>
            ))}
          </Row>
          {/* </div> */}

          <div className="App-section">
            {firstIsOn && <FirstFeature treatment={firstTreatment} />}
            <Row>
              <Col>
                {secondIsOn && (
                  <SecondFeature
                    projectList={this.projectList}
                    openModal={this.handleShow}
                    setSplitAttribute={this.setSplitAttribute}
                    splitAttributes={this.state.splitAttributes}
                    unavailable={thirdIsUnavailable}
                    thirdTreatment={thirdIsOn}
                  />
                )}
              </Col>
              <Col>
                {thirdIsOn && (
                  <ThirdFeature
                    treatment={thirdIsOn}
                    explicitMode={fourthIsOn}
                    trackList={this.trackList}
                    splitAttributes={this.state.splitAttributes}
                    setSplitAttribute={this.setSplitAttribute}
                  />
                )}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
