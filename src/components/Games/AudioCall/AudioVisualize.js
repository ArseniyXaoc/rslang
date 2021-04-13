const audio1 = new Audio();

let audioSource;
let analyser;
let audioCtx;

function AudioVisualize(canvas, audioSrc) {
  try {
    const ctx = canvas.getContext("2d");

    audio1.src = audioSrc;
    audio1.crossOrigin = "anonymous";

    audio1.load();
    audio1.play();

    audioCtx = audioCtx || new AudioContext();

    audioSource = audioSource || audioCtx.createMediaElementSource(audio1);
    analyser = analyser || audioCtx.createAnalyser();

    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);

    // analyser.fftSize = 128;
    analyser.fftSize = 512;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // const barWidth = canvas.width / bufferLength;
    const barWidth = 5;
    let barHeight;
    let x;

    function animate() {
      x = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      analyser.getByteFrequencyData(dataArray);

      drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray);
      requestAnimationFrame(animate);
    }
    animate();

    function drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray) {
      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(i + Math.PI * 4 / bufferLength);

        // const hue = i * 15;
        // const hue = i * 2;
        const hue = i / 2;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillRect(0, 0, barWidth, barHeight);
        x += barWidth;
        ctx.restore();
      }
    }
  } catch (error) {
    throw error;
  }
}

export default AudioVisualize;
