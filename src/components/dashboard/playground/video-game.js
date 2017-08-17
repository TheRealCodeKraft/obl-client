import React from "react"

import { Grid, Row, Col} from 'react-bootstrap';

class VideoGame extends React.Component {
  
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            Video Game
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default VideoGame
