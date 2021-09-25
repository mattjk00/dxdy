import { HeatEqForm } from "./HeatEqForm";
import { useState } from "react"

export const WholeForm = () => {

    const [tabIndex, setTabIndex] = useState(0);

    const tabPressed = (e) => {
        const tabi = e.target.value;
        setTabIndex(tabi);
        
    }

    const renderForm = () => {
        if (tabIndex == 0) {
            return <HeatEqForm></HeatEqForm>;
        } 
        else if (tabIndex == 1) {
            return <p>Wave</p>;
        }
        else {
            return <p>Laplace</p>;
        }
    }

    return (
        <div>
            <div class="tabbar tabbar--top tabbar--material">
                <label class="tabbar__item tabbar--material__item">
                    <input type="radio" name="tabbar-material-a" checked={tabIndex==0} value={0} onClick={(e)=>{tabPressed(e)}}/>
                    <button class="tabbar__button tabbar--material__button">
                    Heat
                    </button>
                </label>

                <label class="tabbar__item tabbar--material__item">
                    <input type="radio" name="tabbar-material-a" checked={tabIndex==1} value={1} onClick={(e)=>{tabPressed(e)}}/>
                    <button class="tabbar__button tabbar--material__button">
                    Wave
                    </button>
                </label>

                <label class="tabbar__item tabbar--material__item">
                    <input type="radio" name="tabbar-material-a" checked={tabIndex==2} value={2} onClick={(e)=>{tabPressed(e)}}/>
                    <button class="tabbar__button tabbar--material__button">
                    Laplace
                    </button>
                </label>

                
            </div>
            
            <div>
                {renderForm()}
                
            </div>
        </div>
    );
};