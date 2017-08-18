import React from "react"

import { Grid, Row, Col, Button} from 'react-bootstrap';

class VideoGame extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      running: false
    }

    this.runGame = this.runGame.bind(this)
  }
  
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <h2><i className="pe pe-7s-users text-warning"></i> Participez à votre entretien</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            Vous allez participer à votre entretien, blablabla...
            <Button onClick={this.runGame}>Commencer</Button>
            <iframe id="video-game-content" 
                    frameborder="0" 
                    style={{visibility: this.state.running ? "visible" : "hidden"}}
                    src="/video-game/WebGL/WebPlayer.html"
                    width="100%"
                    height="100%"
            ></iframe>
          </Col>
        </Row>
      </Grid>
    )
  }

  runGame() {
    this.setState({running: true})
  }
}

export default VideoGame
