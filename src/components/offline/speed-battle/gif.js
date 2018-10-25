import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react-component';

class Gif extends Component {

  render()

    const img =
                  `<img src="https:/\/media.giphy.com/media/4eQFLKTo1Tymc/giphy.gif"
                       id="iloading"
                       alt="loading"
                       title="loading"
                       width="500"
                       height="500"
                       style="top: 0px; left: 54px; position: absolute;"
                  >`


    const gif = document.getElementById("gif")


    return (
      gif.insertAdjacentHTML('afterbegin', `${img}`)
    )

}

export default Gif;
