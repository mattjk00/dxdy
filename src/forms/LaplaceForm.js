import { useState } from 'react';
import {Input, Row, Col} from 'react-onsenui'
import { getTokens, tokenize } from '../math/Tokenizer';

export const LaplaceForm = () => {

    const [ux0, setux0] = useState(0);

    const ux0_change = (e) => {
        const val = e.target.value;
        const success = tokenize(val);
        const tokens = getTokens();
        console.log(tokens);
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
                <Input placeholder="u(0, t)=" modifier="material" float></Input>
                </li>
            </ul>
            
        </div>
    );
}