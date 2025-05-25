// function splitTranscript(text, chunkSize = 800) {
//     const chunks = [];
//     let index = 0;
  
//     while (index < text.length) {
//       let chunk = text.substring(index, index + chunkSize);
//       chunks.push(chunk.trim());
//       index += chunkSize;
//     }
  
//     return chunks;
//   }
  
//   module.exports = splitTranscript;
  


// splitTranscript.js
function splitTranscript(segments, chunkDuration = 300) { // 300 seconds = 5 minutes
  const chunks = [];
  let currentChunk = "";
  let currentTime = 0;

  for (const seg of segments) {
    if (seg.start >= currentTime + chunkDuration) {
      chunks.push(currentChunk.trim());
      currentChunk = "";
      currentTime += chunkDuration;
    }
    currentChunk += seg.text + " ";
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

module.exports = splitTranscript;
