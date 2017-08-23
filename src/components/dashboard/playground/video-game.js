import React from "react"

import { Grid, Row, Col, Button} from 'react-bootstrap';

import SessionClient from 'clients/session'

class VideoGame extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      running: false,
      scores: {}
    }

    this.runGame = this.runGame.bind(this)
  }

  componentWillMount() {
    var self = this;
    window.API_1484_11 = {
      Initialize: function() {
        self.setState({scores: {}})
        return "true";
      },
      SetValue: function(key, value) {
        var scores = self.state.scores
        fillHash(scores, key.split('.'), value)
        self.setState({scores: scores})
        return "true"
      },
      GetValue: function(parameter) {
        return "value";
      },
      Commit: function(value) {
        self.endGame()
        return "true";
      },
      Terminate: function(value) {
        return "true";
      },
      GetLastError: function() {
        return 0;
      },
      GetErrorString: function(code) {
        return "Error string";
      },
      GetDiagnostic: function(code) {
        return "Diagnostic";
      }
    }
  }

  componentDidUnmount() {
    window.API_1484_11 = undefined
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
                    src="https://s3.eu-west-2.amazonaws.com/obl-production/video-games/example/WebPlayer.html"
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

  endGame() {
    var self=this
    SessionClient.setUserScores(this.props.session.id, this.props.me.id, this.state.scores, function() {
      self.setState({running: false})
    })
  }
}

function fillHash(hash, address, value) {
  if (address.length === 1) {
    hash[address[0]] = value
    return true
  } else {
    if (!hash[address[0]]) {
      hash[address[0]] = {}
    }

    hash = hash[address[0]]
    address.shift()
    return fillHash(hash, address, value)
  }
}

export default VideoGame
