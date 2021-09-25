import {Input, Row, Col} from 'react-onsenui'

export const HeatEqForm = () => {

    return (
        <div>
            <ul class="list">
                <li class="list-header">
                    Header
                </li>
                <li class="list-item">
                    <div class="list-item__center">Item</div>
                </li>
                <li class="list-item">
                    <div class="list-item__center">Item</div>
                </li>
                <li class="list-item">
                    <div class="list-item__center">Item</div>
                </li>
            </ul>
            <Input placeholder="u(x, 0)=" modifier="material" float></Input>
        </div>
    );
}