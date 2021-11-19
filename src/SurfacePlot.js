import React, { Component } from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
const {Matrix} = require('ml-matrix');

export class SurfacePlot extends Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);

    this.mesh = null;
  }

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.update();
    
    
    const geometry = new THREE.PlaneGeometry(2, 2, 38, 38);

    const loader = new THREE.TextureLoader();
    const texture = this.createSurfaceTexture();//loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
    texture.flipY = true;
    //texture.wrapS = THREE.RepeatWrapping;
    //texture.wrapT = THREE.RepeatWrapping;
    //texture.magFilter = THREE.NearestFilter;
    //const repeats = 5 / 2;
    //texture.repeat.set(repeats, repeats);
    
    const material = new THREE.MeshPhongMaterial({
        color: "white",    // red (can also use a CSS color string here)
        flatShading: false,
        //shininess:150,
        //specular:0x050505,
        side:THREE.DoubleSide,
        wireframe:false,
        map:texture
      });
    this.mesh = new THREE.Mesh(geometry, material);
        //console.log(cube.geometry);
    //cube.geometry.attributes.position.array[0]= 25;
    
    //cube.geometry.attributes.setZ(0, 5);

    camera.position.z = 2;
    scene.add(this.mesh);
    renderer.setClearColor('#EEE');
    renderer.setSize(width, height);

    const light2 = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
    scene.add( light2 );

    const size = 10;
const divisions = 25;

const gridHelper = new THREE.GridHelper( size, divisions );
gridHelper.position.setY(-0.1);
scene.add( gridHelper );

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    //this.cube = cube;

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  createSurfaceTexture() {
    const size = 38*38;
    let data = new Uint8Array(3 * size);

    let pi = 0;
    for (let i = 0; i < 38; i++) {
      for (let j = 0; j < 38; j++) {
        const val = this.props.graphData.get(j, i) / 10;
        //const index = (j*38) + i;
        data[pi] = Math.min(255, 25 * (val));
        data[pi+1] = Math.min(255, 15 * (val));
        data[pi+2] = Math.min(255, 45 * (val));
        pi += 3;
      }
    }

    const texture = new THREE.DataTexture(data, 38, 38, THREE.RGBFormat);
    texture.flipY = true;
    return texture;
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate() {
    this.mesh.rotation.x = -Math.PI/2 + 0.05;
    //this.cube.rotation.z += 0.005;

    if (this.props.redrawFlag) {
        this.updateMesh();
        this.props.redrawCallback();
    }

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  updateMesh() {
    let icount = 2;
    for (let y = 0; y < 39; y++) {
        for (let x = 0; x < 39; x++) {
            this.mesh.geometry.attributes.position.array[icount] = this.props.graphData.get(x, y) / 100;
            icount += 3;
        }
    }
    this.mesh.geometry.attributes.position.needsUpdate = true;

    this.mesh.material.map = this.createSurfaceTexture();
    //this.mesh.material.flipY = true;
    this.mesh.material.needsUpdate = true;
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        style={{ width: '800px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

//export default SurfacePlot;