import React, { Component } from 'react';
import { Statistic } from 'semantic-ui-react';

const calculateCountdown = (endDate) => {
  let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

  // clear countdown when date is reached
  if (diff <= 0) return false;

  const timeLeft = {
    years: 0,
    days: 0,
    hours: 0,
    min: 0,
    sec: 0
  };

  // calculate time difference between now and expected date
  if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
    timeLeft.years = Math.floor(diff / (365.25 * 86400));
    diff -= timeLeft.years * 365.25 * 86400;
  }
  if (diff >= 86400) { // 24 * 60 * 60
    timeLeft.days = Math.floor(diff / 86400);
    diff -= timeLeft.days * 86400;
  }
  if (diff >= 3600) { // 60 * 60
    timeLeft.hours = Math.floor(diff / 3600);
    diff -= timeLeft.hours * 3600;
  }
  if (diff >= 60) {
    timeLeft.min = Math.floor(diff / 60);
    diff -= timeLeft.min * 60;
  }
  timeLeft.sec = diff;

  return timeLeft;
};

const addLeadingZeros = (setValue) => {
  let value = String(setValue);
  while (value.length < 2) {
    value = `0${value}`;
  }
  return value;
};

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    };
  }

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const date = calculateCountdown(this.props.date);
      if (date) {
        this.setState(date);
      } else {
        this.stop();
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  stop() {
    clearInterval(this.interval);
  }

  render() {
    const countDown = this.state;
    return (
      <Statistic.Group inverted size="small" widths="four">
        <Statistic>
          <Statistic.Value>{addLeadingZeros(countDown.days)}</Statistic.Value>
          <Statistic.Label>{countDown.days === 1 ? 'Day' : 'Days'}</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{addLeadingZeros(countDown.hours)}</Statistic.Value>
          <Statistic.Label>Hour</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{addLeadingZeros(countDown.min)}</Statistic.Value>
          <Statistic.Label>Min</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{addLeadingZeros(countDown.sec)}</Statistic.Value>
          <Statistic.Label>Sec</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    );
  }
}

export default Countdown;
