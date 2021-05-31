import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const doResize = (): void => {
  const element = document.documentElement
  const width = window.innerWidth || element.clientWidth
  const height = window.innerHeight || element.clientHeight
  let fontSize = Math.floor(Math.min(width / 7.5, 100) * 10000) / 10000
  if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    fontSize = Math.floor(Math.min(fontSize, height / 12) * 10000) / 10000
  }
  element.style.fontSize = fontSize.toFixed(4) + 'px'
  const realFontSize =
    Math.floor(
      parseFloat(
        window.getComputedStyle(element).fontSize.replace('px', ''),
      ) * 10000,
    ) / 10000
  if (fontSize !== realFontSize) {
    element.style.fontSize =
      (fontSize * (fontSize / realFontSize)).toFixed(4) + 'px'
  }
}

window.addEventListener('resize', doResize)
window.addEventListener('orientationchange', doResize)
document.addEventListener('DOMContentLoaded', doResize)
doResize()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
