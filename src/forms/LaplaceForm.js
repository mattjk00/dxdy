import { useState } from 'react';
import {Input, Row, Col, Button} from 'react-onsenui'
import { getTokens, tokenize } from '../math/Tokenizer';


export const LaplaceForm = ({setux0, setu0y, setuay, setuxb, drawLaplace}) => {

    //const [ux0, setux0] = useState(0);
    const [e1, setE1] = useState(false);
    const [e2, setE2] = useState(false);
    const [e3, setE3] = useState(false);
    const [e4, setE4] = useState(false);

    const ux0_change = (e) => {
        const val = e.target.value;
        const success = tokenize(val);
        const tokens = getTokens();
        setE1(!success);
        //console.log(tokens, errors);
        setux0(tokens);
    }

    const uxb_change = (e) => {
        const val = e.target.value;
        const success = tokenize(val);
        const tokens = getTokens();
        setE2(!success);
        //setErrors(!(!errors && success));
        //console.log(tokens);
        setuxb(tokens);
    }

    const uay_change = (e) => {
        const val = e.target.value;
        const success = tokenize(val);
        const tokens = getTokens();
        setE3(!success);
        //setErrors(!(!errors && success));
        //console.log(tokens);
        setuay(tokens);
    }

    const u0y_change = (e) => {
        const val = e.target.value;
        const success = tokenize(val);
        const tokens = getTokens();
        setE4(!success);
        //setErrors(!(!errors && success));
        //console.log(tokens);
        setu0y(tokens);
    }

    const errorMessage = (e) => {
        if (e) {
            return <p>Errors</p>
        } else {
            return <p></p>
        }
    }
    

    return (
        <div>
            <p>EQUATION IMG</p>
            
            <ul class="list">
                <li class="list-header">
                    Initial Conditions
                </li>
                
                <br/>
                <li class="list-item">
                    <Input onChange={(e)=>{ ux0_change(e);}}placeholder="u(x, 0)=" modifier="material" float></Input>
                    {errorMessage(e1)}
                </li>
                <br/>
                <li class="list-item">
                    <Input onChange={(e)=>{ u0y_change(e);}} placeholder="u(0, y)=" modifier="material" float></Input>
                    {errorMessage(e2)}
                </li>
                <br/>
                <li class="list-item">
                    <Input onChange={(e)=>{ uxb_change(e);}}placeholder="u(x, b)=" modifier="material" float></Input>
                    {errorMessage(e3)}
                </li>
                <br/>
                <li class="list-item">
                    <Input onChange={(e)=>{ uay_change(e);}}placeholder="u(a, y)=" modifier="material" float></Input>
                    {errorMessage(e4)}
                </li>
                <br/>
                <li class="list-item">
                    {!(e1||e2||e3||e4) &&<Button onClick={drawLaplace}>Calculate Laplace</Button>}
                </li>
            </ul>
            
        </div>
    );
}