import React, { Component } from "react";
import SwapiService from "../../services/swapi-service.js";

import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator";
import PlanetView from "./planet-view";

import "./random-planet.css";

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();
  constructor(props) {
    super(props);
    this.state = {
      planet: {},
      loading: true,
      error: false,
    };
    this.updatePlanet();
  }
  onPlanetLoaded = (planet) => {
    this.setState({ planet, loading: false });
  };
  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };
  updatePlanet() {
    const id = 15;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }
  render() {
    const { planet, loading, error } = this.state,
      hasData = !(loading || error),
      errorMassage = error ? <ErrorIndicator /> : null,
      spinner = loading ? <Spinner /> : null,
      content = hasData ? <PlanetView planet={planet} /> : null;
    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {content}
        {errorMassage}
      </div>
    );
  }
}
