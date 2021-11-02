import { useState } from 'react';
import {Input, Row, Col, Button} from 'react-onsenui'
import { getTokens, tokenize } from '../math/Tokenizer';


export const LaplaceForm = ({setux0, setu0y, setuay, setuxb, drawLaplace}) => {

    //const [ux0, setux0] = useState(0);

    const ux0_change = (e) => {
        const val = e.target.value;
        const success = tokenize(val);
        const tokens = getTokens();
        //console.log(tokens);
        setux0(tokens);
    }

    const uxb_change = (e) => {
        const val = e.target.value;
        const success = tokenize(val);
        const tokens = getTokens();
        //console.log(tokens);
        setuxb(tokens);
    }

    const uay_change = (e) => {
        const val = e.target.value;
        const success = tokenize(val);
        const tokens = getTokens();
        //console.log(tokens);
        setuay(tokens);
    }

    const u0y_change = (e) => {
        const val = e.target.value;
        const success = tokenize(val);
        const tokens = getTokens();
        //console.log(tokens);
        setu0y(tokens);
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
                </li>
                <br/>
                <li class="list-item">
                    <Input onChange={(e)=>{ u0y_change(e);}} placeholder="u(0, y)=" modifier="material" float></Input>
                </li>
                <br/>
                <li class="list-item">
                    <Input onChange={(e)=>{ uxb_change(e);}}placeholder="u(x, b)=" modifier="material" float></Input>
                </li>
                <br/>
                <li class="list-item">
                    <Input onChange={(e)=>{ uay_change(e);}}placeholder="u(a, y)=" modifier="material" float></Input>
                </li>
                <br/>
                <li class="list-item">
                    <Button onClick={drawLaplace}>Calculate Laplace</Button>
                </li>
            </ul>
            
        </div>
    );
}