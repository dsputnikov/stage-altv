/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />

import * as alt from 'alt-client';
import * as native from 'natives';
import { browser } from '../Browser/app';

class CameraRotator {
    start(camera, basePosition, lookAtPosition, offsetVector, heading, fov) {
        this.camera = camera;
        this.basePosition = basePosition;
        this.lookAtPosition = lookAtPosition;
        this.offsetVector = offsetVector;
        this.heading = heading;
        this.baseHeading = heading;
        this.currentPoint = { x: 0, y: 0 };
        this.isPause = false;
        this.zUp = 0;
        this.zUpMultipler = 1;
        this.xBound = [0, 0];
        this.zBound = [-0.01, 0.8];

        this.changePosition();

        native.pointCamAtCoord(camera, lookAtPosition.x, lookAtPosition.y, lookAtPosition.z);

        // if(fov) {
        native.setCamFov(camera, Number(fov));
        // }

        this.activate(true);
    }

    pause(state) {
        this.isPause = state;
    }

    stop() {
        this.activate(false);
        native.renderScriptCams(false, false, 0, true, false, 0);
    }

    reset() {
        this.heading = this.baseHeading;
        this.zUp = 0;
        this.changePosition();
    }

    setXBound(min, max) {
        this.xBound = [min, max];
    }

    setZBound(min, max) {
        this.zBound = [min, max];
    }

    setZUpMultipler(value) {
        this.zUpMultipler = value;
    }

    getRelativeHeading() {
        return this.normilizeHeading(this.baseHeading - this.heading);
    }

    activate(state) {
        /* this.camera.setActive(state);
        //mp.game.cam.renderScriptCams(state, false, 3000, true, false); */
        this.isActive = state;
    }

    onMouseMove(dX, dY) {
        this.heading = this.normilizeHeading(this.heading + dX * 100);

        let relativeHeading = this.getRelativeHeading();

        if (relativeHeading > this.xBound[0] && relativeHeading < this.xBound[1]) {
            relativeHeading =
                Math.abs(this.xBound[0] - relativeHeading) > Math.abs(this.xBound[1] - relativeHeading)
                    ? this.xBound[1]
                    : this.xBound[0];
        }

        this.heading = this.normilizeHeading(-relativeHeading + this.baseHeading);
        this.zUp += dY * this.zUpMultipler * -1;

        if (this.zUp > this.zBound[1]) {
            this.zUp = this.zBound[1];
        } else if (this.zUp < this.zBound[0]) {
            this.zUp = this.zBound[0];
        }

        this.changePosition();
    }

    changePosition() {
        const position = native.getObjectOffsetFromCoords(
            this.basePosition.x,
            this.basePosition.y,
            this.basePosition.z + this.zUp,
            this.heading,
            this.offsetVector.x,
            this.offsetVector.y,
            this.offsetVector.z
        );

        native.setCamCoord(this.camera, position.x, position.y, position.z);
    }

    isPointEmpty() {
        return this.currentPoint.x === 0 && this.currentPoint.y === 0;
    }

    setPoint(x, y) {
        this.currentPoint = { x, y };
    }

    getPoint() {
        return this.currentPoint;
    }

    normilizeHeading(heading) {
        if (heading > 360) {
            heading = heading - 360;
        } else if (heading < 0) {
            heading = 360 + heading;
        }

        return heading;
    }

    setFov(fov) {
        native.setCamFov(this.camera, fov);
    }
}

const cameraRotator = new CameraRotator();

let pressed = false;
let interval;

alt.on('keydown', (key) => {
    if (key == 0x01) {
        if (!cameraRotator.isActive || cameraRotator.isPause) {
            return;
        }
        pressed = true;
    }
});

alt.on('keyup', (key) => {
    if (key == 0x01) {
        if (!cameraRotator.isActive || cameraRotator.isPause) {
            return;
        }
        pressed = false;
    }
});

alt.everyTick(() => {
    if (!cameraRotator.isActive || cameraRotator.isPause) {
        return;
    }
    const x = native.getDisabledControlNormal(2, 239);
    const y = native.getDisabledControlNormal(2, 240);
    const [_, width] = native.getActiveScreenResolution(0, 0);
    const cursor = alt.getCursorPos();
    const _x = cursor.x;
    if (_x < width / 2 + 450 && _x > width / 2 - 450) {
        //todo nahui
    }

    if (cameraRotator.isPointEmpty()) {
        cameraRotator.setPoint(x, y);
    }

    const currentPoint = cameraRotator.getPoint();

    const dX = currentPoint.x - x;
    const dY = currentPoint.y - y;

    cameraRotator.setPoint(x, y);

    if (pressed == true) {
        cameraRotator.onMouseMove(dX, dY);
    }
});

export function createCam(x, y, z, rx, ry, rz, heading, viewangle) {
    let camera = native.createCam('DEFAULT_SCRIPTED_CAMERA', 1);
    native.setCamCoord(camera, x, y, z);
    native.setCamRot(camera, x, y, z, 2);
    native.setCamFov(camera, viewangle);
    native.setCamActive(camera, true);

    var position = new alt.Vector3(x, y, z); // спавн авто
    cameraRotator.start(camera, position, position, new alt.Vector3(-3.0, 3.5, 0.5), heading, viewangle);
    cameraRotator.setZBound(-0.8, 1.8);
    cameraRotator.setZUpMultipler(5);
    cameraRotator.pause(false);

    native.renderScriptCams(true, false, 0, true, false, 0);
}

export function deleteCam() {
    cameraRotator.stop();
}

alt.onServer('Utils_3dcamera::CLIENT', (x, y, z, rx, ry, rz, heading, viewangle) => {
    createCam(x, y, z, rx, ry, 285.854, heading, viewangle); // координаты камеры и ротация
});
