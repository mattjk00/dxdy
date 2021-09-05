import React from 'react';
import ReactDOM from 'react-dom';
import p5 from 'p5'
import {Button} from 'react-onsenui'

export class Plot extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.state = {x:24};
    }

    Sketch = (p) => {

        p.setup = () => {
            p.createCanvas(p.displayWidth*0.5, p.displayHeight*0.6, p.WEBGL);
        }

        p.draw = () => {
            p.background("#EEEEEE");
            p.rotateX(p.frameCount * 0.01);
            p.rotateY(p.frameCount * 0.01);
            p.box(this.state.x);
        }
    }

    componentDidMount() {
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }

    clicky() {
        this.setState({x:this.state.x+12});
    }

    render() {
        return (
            <div ref={this.myRef}>
                <Button onClick={()=>{this.clicky();}}>Click</Button>
            </div>
        )
    }
}