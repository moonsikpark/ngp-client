function getConfig(displayWidth, displayHeight, codec = "avc1.42001E", avc = { format: "annexb" }) {
    return { codec: codec, displayWidth: displayWidth, displayHeight: displayHeight, avc: avc };
}

class VideoDecoderManager {
    constructor(videoSource, canvasContext, canvasTexture) {
        if (!('VideoEncoder' in window)) {
            alert("WebCodecs not supported.");
            return;
        }
        this.ctx = canvasContext;
        this.texture = canvasTexture;
        this.initialized = false;
        this.decoder = new VideoDecoder({
            output: this.paintFrame.bind(this),
            error: e => console.error(e),
        });
        this.setResolution(1280, 1296);
        this.videoSource = new WebSocket(videoSource);
        this.videoSource.error = e => console.log(e);
        this.videoSource.onmessage = this.onVideoSourceMessage.bind(this);
    }

    width() {
        return this.width;
    }

    height() {
        return this.height;
    }

    onVideoSourceMessage(event) {
        event.data.arrayBuffer()
            .then(data => {
                let dv = new DataView(data);
                let type = dv.getInt8(0) == 1 ? "delta" : "key";
                //dv.setUint8(0, 0);
                let chunk = new EncodedVideoChunk({
                    type: type,
                    timestamp: 0,
                    data: data,
                });
                this.decoder.decode(chunk);
            })
    }

    paintFrame(frame) {
        if (this.initialized) {
            this.ctx.drawImage(frame, 0, 0, this.width, this.height);
            frame.close();
            this.texture.needsUpdate = true;
        }
    }

    setResolution(width, height) {
        this.width = width;
        this.height = height;
        this.ctx.canvas.width = width;
        this.ctx.canvas.height = height;

        this.decoder.reset();

        let config = getConfig(width, height);

        if (!VideoDecoder.isConfigSupported(config)) {
            alert("Supplied decode configuration is not supported.");
            return;
        }

        this.decoder.configure(config);

        this.initialized = true;
    }
}
