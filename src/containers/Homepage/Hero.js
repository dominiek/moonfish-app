import React from 'react';
import styled, { keyframes } from 'styled-components';

const twinkle = keyframes`
  0% {
    transform: scale(1.0);
    opacity: 1;
  }
  50% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1.0);
    opacity: 1;
  }
`;


const Star = styled.div`
  border-radius: 100%;
  position: absolute;
  display: block;
  animation: ${twinkle} 2s linear 0s infinite normal;
  background: #F6F6F6;
  z-index: 1;
  left: 100%;
  top: 100%;
`;

const Planet = styled.div`
  border-radius: 100%;
  position: absolute;
  display: block;
  animation: ${twinkle} 5s linear 0s infinite normal;
  box-shadow: 0px 0px 10px 0px rgba(255,255,255,0.5);
  border-radius: 100%;
  z-index: 2;
  left: 300%;
  top: 300%;
`;

// Array for planet colors
const background = ['rgba(143, 189, 255, 0.7)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.9)'];

// Function for planet colors
function backgroundColor() {
  return background[Math.floor(Math.random() * background.length)];
}

function createStars(limit) {
  const stars = [...Array(limit)];
  return stars.map((c, index) => {
    const style = {};
    style.top = `${Math.random() * 100}%`;
    style.left = `${Math.random() * 100}%`;
    style.height = `${Math.random() * 3}px`;
    style.width = style.height;
    style.webkitAnimationDelay = `${Math.random()}s`;
    style.mozAnimationDelay = `${Math.random()}s`;
    style.webkitAnimationDuration = `${Math.random() + 1}s`;
    style.mozAnimationDuration = `${Math.random() + 1}s`;
    return { key: `star-${index}`, style };
  });
}

function createPlanets(limit) {
  const planets = [...Array(limit)];
  return planets.map((c, index) => {
    const style = {};
    style.top = `${Math.random() * 100}%`;
    style.left = `${Math.random() * 100}%`;
    style.height = `${(Math.random() * 6) + 2}px`;
    style.width = style.height;
    style.opacity = Math.random() + 0.15;
    style.webkitAnimationDelay = `${Math.random()}s`;
    style.mozAnimationDelay = `${Math.random()}s`;
    style.webkitAnimationDuration = `${Math.random()+3}s`;
    style.mozAnimationDuration = `${Math.random()+3}s`;
    style.background = backgroundColor();
    return { key: `planets-${index}`, style };
  });
}

export default class Home extends React.Component {
  render() {
    const viewportSize = window.innerHeight + window.innerWidth;
    const stars = createStars(Math.round(viewportSize * 0.12));
    const planets = createPlanets(Math.round(viewportSize * 0.025));
    return (
      <div>
        { stars.map(p => <Star {...p} />)}
        { planets.map(p => <Planet {...p} />)}
      </div>
    );
  }
}

