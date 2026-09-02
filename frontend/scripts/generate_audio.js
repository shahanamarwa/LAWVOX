import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const audioDir = path.join(__dirname, '../public/audio');

if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Function to generate a valid PCM WAV buffer (compatible with HTML5 audio and all browsers)
function createWavAudio(durationSeconds = 30, baseFreq = 440, chordPattern = [0, 4, 7, 11]) {
  const sampleRate = 44100;
  const numChannels = 2; // Stereo
  const bytesPerSample = 2; // 16-bit
  const numSamples = Math.floor(sampleRate * durationSeconds);
  const dataSize = numSamples * numChannels * bytesPerSample;
  const headerSize = 44;
  const totalSize = headerSize + dataSize;
  const buffer = Buffer.alloc(totalSize);

  // RIFF Chunk
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(totalSize - 8, 4);
  buffer.write('WAVE', 8);

  // fmt sub-chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size for PCM
  buffer.writeUInt16LE(1, 20); // AudioFormat 1 = PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * numChannels * bytesPerSample, 28); // ByteRate
  buffer.writeUInt16LE(numChannels * bytesPerSample, 32); // BlockAlign
  buffer.writeUInt16LE(bytesPerSample * 8, 34); // BitsPerSample

  // data sub-chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Synthesize pleasant acoustic ambient tone (sine waves with gentle harmonics and envelope)
  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    
    // Cycle through chords every 4 seconds
    const chordIndex = Math.floor(t / 4) % chordPattern.length;
    const semitone = chordPattern[chordIndex];
    const freq = baseFreq * Math.pow(2, semitone / 12);
    
    // Soft rhythmic acoustic pulse envelope
    const envelope = Math.sin(Math.PI * ((t % 4) / 4)) * 0.7 + 0.3;
    
    // Harmonic frequencies (fundamental + soft octave + overtone)
    const fundamental = Math.sin(2 * Math.PI * freq * t);
    const overtone1 = 0.3 * Math.sin(2 * Math.PI * freq * 2 * t);
    const overtone2 = 0.15 * Math.sin(2 * Math.PI * freq * 3 * t);
    const subharmonic = 0.25 * Math.sin(2 * Math.PI * (freq / 2) * t);
    
    // Stereo spread
    const leftSample = (fundamental + overtone1 + subharmonic) * envelope * 0.35;
    const rightSample = (fundamental + overtone2 + subharmonic) * envelope * 0.35;
    
    const leftInt16 = Math.max(-32768, Math.min(32767, Math.floor(leftSample * 32767)));
    const rightInt16 = Math.max(-32768, Math.min(32767, Math.floor(rightSample * 32767)));
    
    buffer.writeInt16LE(leftInt16, offset);
    buffer.writeInt16LE(rightInt16, offset + 2);
    offset += 4;
  }

  return buffer;
}

const audioFiles = [
  { name: 'kesavananda-bharati.mp3', duration: 45, baseFreq: 220, chords: [0, 5, 7, 2, 0] },
  { name: 'maneka-gandhi.mp3', duration: 35, baseFreq: 261.63, chords: [0, 4, 7, 9, 5] },
  { name: 'shreya-singhal.mp3', duration: 30, baseFreq: 293.66, chords: [0, 3, 7, 10, 5] },
  { name: 'puttaswamy.mp3', duration: 40, baseFreq: 246.94, chords: [0, 7, 4, 2, 0] },
  { name: 'vishaka.mp3', duration: 35, baseFreq: 329.63, chords: [0, 5, 9, 7, 4] },
  { name: 'olga-tellis.mp3', duration: 30, baseFreq: 196.00, chords: [0, 4, 7, 2, 0] },
];

console.log('Generating LAWVOX legal audio demonstration assets...');
for (const item of audioFiles) {
  const filePath = path.join(audioDir, item.name);
  const audioBuffer = createWavAudio(item.duration, item.baseFreq, item.chords);
  fs.writeFileSync(filePath, audioBuffer);
  console.log(`Generated ${item.name} (${item.duration}s, ${(audioBuffer.length / 1024).toFixed(1)} KB)`);
}

console.log('All audio assets generated successfully in public/audio/');
