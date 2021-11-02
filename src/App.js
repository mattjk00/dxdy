import {Page, Toolbar, Card, Input, Row, Col} from 'react-onsenui'
import {Plot} from "./Plot.js"
import {tokenize} from "./math/Tokenizer"
import React, {useState} from 'react';
import { HeatEqForm } from './forms/HeatEqForm.js';
import { WholeForm } from './forms/WholeForm.js';
const {laplace, Z} =  require('./math/PDEs/Laplace');
const {Matrix} = require('ml-matrix');

function App() {

  const [exprText, setExprText] = useState(0);
  const [validExpr, setValidExpr] = useState(false);

  const [ux0, setux0] = useState(Z);
  const [u0y, setu0y] = useState(Z);
  const [uay, setuay] = useState(Z);
  const [uxb, setuxb] = useState(Z);
  const [graphData, setGraphData] = useState(new Matrix(40, 40));

  const onExprInput = (e) => {
    const text = e.target.value;
    setExprText(text);
    let okayTokens = tokenize(text);
    setValidExpr(okayTokens);
  };

  const drawLaplace = () => {
    const m = laplace(2, 2, 40,
      u0y,
      ux0,
      uay,
      uxb);
    setGraphData(m);
    console.log(m);
  };

  return (
    <Page id="mainPage" modifier="material">
      <Toolbar>
        <div class="center">dx/dy App</div>
      </Toolbar>
      <br/><br/><br/>
      <Row>
        <Col width="33%">
          {/* <Card>
            <span class="form-container">
              <Input onChange={(e)=>{ onExprInput(e); }} placeholder="f(x,y)=" modifier="material" float></Input>
              <p>{validExpr ? "True" : "False"}</p>
            </span>
            <br/>

            <div>
            <math xmlns="http://www.w3.org/1998/Math/MathML"><mfrac><mrow><mn>5</mn><mo>*</mo><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mi>cos</mi><mo>(</mo><mi>y</mi><mo>)</mo></mrow><mn>2</mn></mfrac></math>
            </div>
          </Card> */}
          <Card>
            <WholeForm drawLaplace={drawLaplace} setux0={setux0} setu0y={setu0y} setuay={setuay} setuxb={setuxb}></WholeForm>
          </Card>
          
        </Col>
        <Col witdh="66%">
          <Card style={{textAlign:'center'}}>
            <h4 style={{textAlign:'center'}}>Surface Plot</h4>
            <Plot class="center" graphData={graphData}></Plot>
          </Card>
        </Col>
      </Row>
      
    </Page>
  );
}

export default App;
