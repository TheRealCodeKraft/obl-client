import React from "react"

import withUserAgent from 'react-useragent'

import { Grid, Row, Col } from 'react-bootstrap';

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
            <form action="" id="FormCodeJeu" className="form-inline" onSubmit={this.handleCodeInput}>
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
                      ref="qrscanner"
                      delay={500}
                      onError={this.handleQrError}
                      onScan={this.handleQrScan}
                      legacyMode={this.props.ua.os === "iOS"}
                    />
                    <a href="javascript:void(0);" onClick={this.closeScanner}>Annuler</a>
<span>tmp : {this.props.ua.os}</span>
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
    this.setState({flashing: true, error: false}, {
      if (this.props.ua.os === "iOS") {
        this.refs.qrscanner.openImageDialog()
      }
    })
  }

  closeScanner() {
    this.setState({flashing: false})
  }

  handleQrError(err) {
    console.log("QR Scanner error : " + err)
  }

  handleQrScan(data) {
    if (data) {
      /****************************************************
       * CODE TEMPORAIRE                                  *
       * A SUPPRIMER LORSQUE LES QR CODES SERONT CORRIGES *
       ****************************************************/
      if (data.indexOf("www.openbusinesslabs.com") !== -1) {
        data = this.tempInverse(data)
      }
      this.setState({flashing: false, codeInput: "", code: data}, function() {
        if (this.props.onScan) this.props.onScan(data)
      })
    }
  }

  tempInverse(code) {
    var nCode = ""

    var id = code.split("indice10")[1]
    switch(id) {
      case "01":
        nCode = "F1BAJL"
        break
      case "02":
        nCode = "A2RAZ"
        break
      case "03":
        nCode = "E3FAG"
        break
      case "04":
        nCode = "R4EAB"
        break
      case "05":
        nCode = "J5MAP"
        break
      case "06":
        nCode = "P6TAO"
        break
      case "07":
        nCode = "Z7YAU"
        break
      case "08":
        nCode = "A8AAT"
        break
      case "09":
        nCode = "E9PAP"
        break
      case "10":
        nCode = "ZAE1E"
        break
      case "11":
        nCode = "M1S1P"
        break
      case "12":
        nCode = "P2F1S"
        break
      case "13":
        nCode = "J3Z1P"
        break
      case "14":
        nCode = "U4M1K"
        break
      case "15":
        nCode = "Y5T1N"
        break
      case "16":
        nCode = "S6E1Q"
        break
      case "17":
        nCode = "C7H1D"
        break
      case "18":
        nCode = "R8J1J"
        break
      case "19":
        nCode = "C9Q1S"
        break
      case "20":
        nCode = "QAD2X"
        break
      case "21":
        nCode = "J1X2F"
        break
      case "22":
        nCode = "X2S2W"
        break
      case "23":
        nCode = "P3E2V"
        break
      case "24":
        nCode = "X4M2L"
        break
      case "25":
        nCode = "C5G2N"
        break
      case "26":
        nCode = "S6Y2U"
        break
      case "27":
        nCode = "K7H2G"
        break
      case "28":
        nCode = "B8L2M"
        break
      case "29":
        nCode = "X9C2V"
        break
      case "30":
        nCode = "WAV3D"
        break
      case "31":
        nCode = "F1D3R"
        break
      case "32":
        nCode = "U2U3H"
        break
      case "33":
        nCode = "E3Z3Z"
        break
      case "34":
        nCode = "M4M3L"
        break
      case "35":
        nCode = "Y5T3N"
        break
      case "36":
        nCode = "X6B3D"
        break
      case "37":
        nCode = "T7X3C"
        break
      case "38":
        nCode = "M8V3H"
        break
      case "39":
        nCode = "U9C3S"
        break
      case "40":
        nCode = "MAS4R"
        break
      case "41":
        nCode = "C1J4A"
        break
      case "42":
        nCode = "F2N4D"
        break
    }
    
    return nCode
  }

  handleCodeInputChange(e) {
    this.setState({codeInput: e.target.value})
  }

  handleCodeInput(e) {
    e.preventDefault()
    if (this.state.codeInput !== "" && this.props.onScan) this.props.onScan(this.state.codeInput)
    this.setState({codeInput: ""})
  }
}

export default withUserAgent(ScenarioSelector)
