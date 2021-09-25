import {Input, Row, Col} from 'react-onsenui'

export const HeatEqForm = () => {

    return (
        <div>
            <p>EQUATION IMG</p>
            <ul class="list">
                <li class="list-header">
                    Initial Conditions
                </li>
                <li class="list-item">
                    <Input placeholder="u(x, 0)=" modifier="material" float></Input>
                </li>
                <li class="list-item">
                <Input placeholder="u(0, t)=" modifier="material" float></Input>
                </li>
            </ul>
            
        </div>
    );
}