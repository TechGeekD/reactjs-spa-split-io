import * as dotenv from "dotenv";

import * as React from "react";
import { render } from "react-dom";
import "./index.css";

import * as serviceWorker from "./serviceWorker";

import { SplitFactory } from "@splitsoftware/splitio";

import { App } from "./components/App";

dotenv.config();
if (!process.env.REACT_APP_SPLIT_AUTH_KEY) {
  throw Error("Please Provide Split Authorization Key For Demo");
}

const browserMockedFeatures: SplitIO.MockedFeaturesMap = {
  marketingCampaign: "off",
  project: "on",
  tracks: "on",
  explicitMode: "off"
};

const settings: SplitIO.IBrowserSettings = {
  core: {
    authorizationKey: process.env.REACT_APP_SPLIT_AUTH_KEY,
    key: "theOrchard",
    trafficType: "creator" // consumer || creator
  },
  features: browserMockedFeatures,
  scheduler: {
    offlineRefreshRate: 3,
    featuresRefreshRate: 3
  },
  startup: {
    readyTimeout: 1.5 // 1.5 sec
  }
};

const sdk: SplitIO.ISDK = SplitFactory(settings);

const client: SplitIO.IClient = sdk.client();

const attributes: SplitIO.Attributes = {
  location: "USA",
  user: "free",
  explicitMode: false
};

client.on(client.Event.SDK_READY, () => {
  render(
    <App
      client={client}
      attributes={attributes}
      featureTreatments={sdk.settings.features}
    />,
    document.getElementById("root")
  );
});

// /***** The code below this line is just for demo purposses. It will periodically change treatments of the mocked features. *****/
// const ON = "on";
// const OFF = "off";
// // Random number generator.
// function getRandomInt(max: number, min: number = 1): number {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// // "Treatment swapper".
// function getSwappedTreatment(currentTreatment: string) {
//   return currentTreatment === OFF ? ON : OFF;
// }
// setInterval(() => {
//   const featureTarget = `feature${getRandomInt(3)}`;
//   sdk.settings.features[featureTarget] = getSwappedTreatment(
//     sdk.settings.features[featureTarget]
//   );
// }, 3000);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
