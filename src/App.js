import {Page, Toolbar, Card, Input, Row, Col} from 'react-onsenui'
import {Plot} from "./Plot.js"

function App() {
  return (
    <Page id="mainPage" modifier="material">
      <Toolbar>
        <div class="center">dx/dy App</div>
      </Toolbar>
      <br/><br/><br/>
      <Row>
        <Col width="33%">
          <Card>
            <span class="form-container">
              <Input placeholder="f(x,y)=" modifier="material" float></Input>
            </span>
            <br/>

            <div>
            <math xmlns="http://www.w3.org/1998/Math/MathML"><mfrac><mrow><mn>5</mn><mo>*</mo><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mi>cos</mi><mo>(</mo><mi>y</mi><mo>)</mo></mrow><mn>2</mn></mfrac></math>
            </div>
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
