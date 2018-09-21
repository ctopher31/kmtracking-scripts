// Video Handler

import _ from 'underscore';

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g,
};

const videoTemplate = _.template(`<span id="iframe-wrapper-{{ videoId }}" class="iframe-wrapper">
    <iframe src="{{ videoIframeSrc }}" allowfullscreen></iframe>
  </span>`);

const playVideo = element => element.contentWindow.postMessage('{"event": "command", "func": "playVideo", "args": ""}', '*');

const pauseVideo = element => element.contentWindow.postMessage('{"event": "command", "func": "pauseVideo", "args": ""}', '*');

const stopVideo = element => element.contentWindow.postMessage('{"event": "command", "func": "stopVideo", "args": ""}', '*');

const pauseAllVideos = () => Array.prototype.map.call(document.querySelectorAll('.iframe-wrapper iframe'), playing => pauseVideo(playing));

const stopAllVideos = () => Array.prototype.map.call(document.querySelectorAll('.iframe-wrapper iframe'), playing => stopVideo(playing));

const iframeClickHandler = () => {
  Array.prototype.map.call(document.querySelectorAll('.iframe-wrapper'), (wrapper) => {
    const iframe = wrapper.firstElementChild;
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    iframeDocument.addEventListener('click', () => {
      if (wrapper.firstElementChild.classList.contains('playing')) {
        playVideo(wrapper.firstElementChild);
      } else {
        pauseVideo(wrapper.firstElementChild);
      }
    });
  });
};

const addIframe = (event) => {
  pauseAllVideos();
  const videoWrapper = event.currentTarget;
  const templateProps = {
    videoId: '',
    videoIframeSrc: '',
  };
  templateProps.videoId = videoWrapper.id.slice(6);
  templateProps.videoIframeSrc = `https://www.youtube.com/embed/${templateProps.videoId}?rel=0&autoplay=1&enablejsapi=1`;
  const compiled = videoTemplate(templateProps);
  const d = document.createElement('div');
  d.innerHTML = compiled;
  videoWrapper.appendChild(d.firstChild);
  videoWrapper.lastElementChild.firstElementChild.id = templateProps.videoId;
  videoWrapper.lastElementChild.firstElementChild.classList.add('playing');
  iframeClickHandler();
};

const init = () => {
  Array.prototype.map.call(document.querySelectorAll('.video-wrapper'), video => video.addEventListener('click', addIframe, false));
};

export {
  addIframe,
  init,
  playVideo,
  pauseVideo,
  stopVideo,
  pauseAllVideos,
  stopAllVideos,
};
