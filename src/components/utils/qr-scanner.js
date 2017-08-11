import React from "react"

import { Grid, Row, Col, Button } from 'react-bootstrap';

import QrReader from 'react-qr-reader'

class ScenarioSelector extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      flashing: false,
      code: "",
      codeInput: "",
    }

    this.openScanner = this.openScanner.bind(this)
    this.closeScanner = this.closeScanner.bind(this)

    this.handleQrError = this.handleQrError.bind(this)
    this.handleQrScan = this.handleQrScan.bind(this)

    this.handleCodeInputChange = this.handleCodeInputChange.bind(this)
    this.handleCodeInput = this.handleCodeInput.bind(this)
  }

  render() {
    return (
      <Grid fluid className="qr-core-module">
        <Row>
          <Col xs={12}>
            <h2>
              <i className="pe pe-7s-keypad text-warning"></i> {this.props.title}
            </h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center scanner-container">
            {this.buildContent()}
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center">
            ou entre ton code carte ici :
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center">
            <form action="#" id="FormCodeJeu" className="form-inline" onSubmit={this.handleCodeInput}>
              <div className="form-group">
                <input ref="codeInput" type="text" title="Entrez le code du jeu" value={this.state.codeInput} name="game-code" id="game-code" className="form-control" required="" onChange={this.handleCodeInputChange} />
                <button className="btn btn-accent">Valider</button>
              </div>
            </form>
          </Col>
        </Row>
      </Grid>
    )
  }

  buildContent() {
    var component = null

    if (this.state.flashing) {
      component = <div className="qr-scanner">
                    <QrReader
                      delay={500}
                      onError={this.handleQrError}
                      onScan={this.handleQrScan}
                    />
                    <a href="javascript:void(0);" onClick={this.closeScanner}>Annuler</a>
                  </div>
    } else if (this.props.searching) {
      component = <div className="searching-code"><span>Recherche du code en cours ...</span></div>
    } else {
      component = []
      component.push(<img src="/assets/images/qr-code.jpg" className="img-rounded" style={{cursor: "pointer"}} alt="Scanne ton QR Code" onClick={this.openScanner} />)
      if (this.props.error) {
        component.push(<div><span onClick={this.openScanner}>{this.props.errorMessage}</span></div>)
        component = <div className="qr-scanner-with-error">{component}</div>
      }
    }

    return component
  }

  openScanner() {
    this.setState({flashing: true, error: false})
  }

  closeScanner() {
    this.setState({flashing: false})
  }

  handleQrError(err) {
    console.log("QR Scanner error : " + err)
  }

  handleQrScan(data) {
    if (data) {
      this.setState({flashing: false, codeInput: "", code: data}, function() {
        if (this.props.onScan) this.props.onScan(data)
      })
    }
  }

  handleCodeInputChange(e) {
    this.setState({codeInput: e.target.value})
  }

  handleCodeInput(e) {
    e.preventDefault()
    if (this.state.codeInput !== "" && this.props.onScan) this.props.onScan(this.state.codeInput)
  }
}

export default ScenarioSelector
