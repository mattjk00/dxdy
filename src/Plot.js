import React from 'react';
import p5 from 'p5'
import {Button} from 'react-onsenui'
import { sinArray, testArray } from './math/Complex';
import { DFT, absArray, realArray } from './math/Transforms';
export class Plot extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.state = {x:24};
    }

    sketch = (p) => {
        let f = [];
        const SF = 1;
        const DETAIL=0.1;
        const SIZE = 256;
        let geo;
        let mp;
        let lastmx;
        let lastmy;
        let rotz=0;
        let rotx;
        let zoom = 2;
        let gridimg;
        let OFFSET=0;

        let g = (x,y) => {
            return f[y*SIZE+x];
        }

        p.setup = () => {
            p.createCanvas(p.displayWidth*0.5, p.displayHeight*0.6, p.WEBGL);
            p.noStroke();
 
            rotx=4.4*p.PI;
            p.strokeWeight(2);
            p.fill("green");
            p.textureMode(p.NORMAL);
            p.blendMode(p.BLEND);
            
            mp = p.createImage(SIZE, SIZE); 
            mp.loadPixels();
            gridimg = p.createImage(SIZE, SIZE);
            gridimg.loadPixels();
            for (let y = 0; y < SIZE; y++) {
                for (let x = 0; x < SIZE; x++) {
                    gridimg.set(x, y, p.color(255,255,255,0));
                    if ((x+1) % p.floor(10) == 0) {
                        gridimg.set(x, y, p.color(50,50,50));
                    }
                    if ((y+1) % p.floor(10) == 0) {
                        gridimg.set(x, y, p.color(50,50,50));
                    }
                }
                
            }
            gridimg.updatePixels();
            
            //const GS = 8;
            let dcountx=0;
            let dcounty=0;
            for (let y = 0; y < SIZE; y++) {
                for (let x = 0; x < SIZE; x++) {
                const val = 2.5*p.sin(dcountx)*p.cos(dcounty);
                f.push(val);
                dcountx += DETAIL;
                
                
                p.fill(val*255);
                mp.set(x, y, p.color((val+15)*155, 130*(val), 50*(val+5)));
                }
                dcountx=0;
                dcounty += DETAIL;
            }
            mp.updatePixels();
            
            
            geo = new p5.Geometry(SIZE, 0, function() {
                OFFSET = -SIZE/2 * DETAIL;
                
                let dex=0;
                let dey=0;
                for (let y = 0; y < SIZE; y += 1) {
                    for (let x = 0; x < SIZE; x += 1) {
                        const x1 = dex + OFFSET;
                        const y1 = dey + OFFSET;
                        dex += DETAIL;
                        let v1 = new p5.Vector(x1, y1, g(x, y));
                        let v2 = new p5.Vector(x1+SF, y1, g(x+SF, y));
                        let v2alt = new p5.Vector(x1, y1+SF, g(x, y+SF));
                        let v3 = new p5.Vector(x1+SF, y1+SF, g(x+SF, y+SF));
                        
                        this.vertices.push(v1, v2, v3, v1, v2alt, v3);
                        
                        let uv1 = [x/SIZE, y/SIZE];
                        let uv2 = [(x+SF)/SIZE, y/SIZE];
                        let uv2alt = [x/SIZE, (y+SF)/SIZE];
                        let uv3 = [(x+SF)/SIZE, (y+SF)/SIZE];
                        this.uvs.push(uv1, uv2, uv3, uv1, uv2alt, uv3);
                    }
                    dex=0;
                    dey += DETAIL;
                }
            });
            geo.computeFaces();
            geo.computeNormals();
        }
    
        p.draw = () => {
            p.background(200);
  
            p.fill("green");
            p.plane(1, 300);
            p.push();
            p.scale(15);
            
            p.pointLight(255, 255, 255, p.width/2, p.height/2, 250);
            p.ambientLight(200, 200, 260);
            p.specularMaterial(255);
            p.shininess(255);

            p.rotateX(rotx);
            if (p.mouseIsPressed) {
                rotz += -(p.mouseX - lastmx)/150;
                rotx += -(p.mouseY - lastmy)/150;
            }
            p.rotateZ(rotz);
            
            p.fill("red");
            p.plane(1, 300);
            p.fill(50, 50, 50);
            p.translate(OFFSET*2, 0);
            for (let i = 0 ; i < 50; i++) {
                p.translate(1, 0);
                p.plane(0.05, 40)
            }
            p.translate(-50-OFFSET*2, OFFSET*2);
            for (let i = 0 ; i < 50; i++) {
                p.translate(0, 1);
                p.plane(40, 0.05)
            }
            p.translate(0, -50-OFFSET*2);
            //p.texture(gridimg);
            //p.plane(SIZE*DETAIL, SIZE*DETAIL);
            //p.image(gridimg, 0, 0);
            
            p.texture(mp);
            p.model(geo);
            p.pop();

            
            
            lastmx = p.mouseX;
            lastmy = p.mouseY;
        }
    
    }

    sketch2d = (p) => {
        p.setup = () => {
            p.createCanvas(1000, 500, p.WEBGL);
            p.noStroke();
            const sa = sinArray(400, 1000, 44100);
            const ft = absArray(DFT(sa));
            //console.log(absArray(sa));
            const spacing = p.width/(ft.length/4);
            console.log(spacing);
            //p.translate(-p.width, -p.height/2);
            p.scale(1);
            
            for (let  i = 0; i < ft.length/2; i++) {
                p.fill("black");
                
                const m = ft[i] * 1/2;
                p.rect(i*spacing - p.width/2, 0, spacing/2, -m);
                //p.text("" + i * spacing, i + ft.length/2, p.height-m-20);
                //p.ellipse(i, sa[i].r * 100 + p.height/2, 1, 1);
            }
        }

        p.draw = () => {

        }
    }

    componentDidMount() {
        this.myP5 = new p5(this.sketch2d, this.myRef.current)
    }

    clicky() {
        this.setState({x:this.state.x+12});
    }

    render() {
        return (
            <div ref={this.myRef}>
                
            </div>
        )
    }
}