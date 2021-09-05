import {Page, Toolbar, Card, Button, Row, Col} from 'react-onsenui'
import {Plot} from "./Plot.js"

function App() {
  return (
    <Page id="mainPage">
      <Toolbar>
        <div class="center">DE Viewer</div>
      </Toolbar>
      <br/><br/><br/>
      <Row>
        <Col width="33%">
          <Card>
            <p>Hello</p>
            <Button>Hello</Button>
          </Card>
        </Col>
        <Col>
          <Card style={{textAlign:'center'}}>
            <h4 style={{textAlign:'center'}}>Surface Plot</h4>
            <Plot class="center"></Plot>
          </Card>
        </Col>
      </Row>
      
    </Page>
  );
}

export default App;
