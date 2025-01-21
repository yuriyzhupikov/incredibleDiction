## Functions

<dl>
<dt><a href="#recordAudio">recordAudio([options])</a> ⇒ <code>RecordAudioReturn</code></dt>
<dd><p>Records audio using the microphone.</p>
</dd>
<dt><a href="#playAudio">playAudio(filePath)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Plays an audio file.</p>
</dd>
<dt><a href="#normalize">normalize(samples, chunkSize)</a> ⇒ <code>Float32Array</code></dt>
<dd><p>Normalizes audio samples to have values in the range [0, 1].</p>
</dd>
<dt><a href="#smooth">smooth(samples, windowSize)</a> ⇒ <code>Float32Array</code></dt>
<dd><p>Smooths audio samples using a moving average.</p>
</dd>
<dt><a href="#getDistanceAudio">getDistanceAudio(userSamples, referenceSamples)</a> ⇒ <code>number</code></dt>
<dd><p>Computes the distance between user audio samples and reference samples using DTW.</p>
</dd>
<dt><a href="#decodeWav">decodeWav(filePath)</a> ⇒ <code>Promise.&lt;Float32Array&gt;</code></dt>
<dd><p>Decodes a WAV file and extracts its audio samples.</p>
</dd>
<dt><a href="#windowedDTW">windowedDTW(refSamples, userSamples, windowSize)</a> ⇒ <code>number</code></dt>
<dd><p>Computes the average DTW distance over multiple windows of audio samples.</p>
</dd>
<dt><a href="#uploadToS3">uploadToS3(bucketName, key, body)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#deleteFromS3">deleteFromS3(bucketName, key)</a></dt>
<dd></dd>
<dt><a href="#scanFiles">scanFiles(dir, fileCallback)</a></dt>
<dd></dd>
<dt><a href="#addJsDoc">addJsDoc(filePath)</a></dt>
<dd></dd>
<dt><a href="#handleError">handleError(error, contextMessage)</a></dt>
<dd></dd>
<dt><a href="#getPathFile">getPathFile(...paths)</a> ⇒ <code>string</code></dt>
<dd><p>Joins multiple path segments into a single path.</p>
</dd>
<dt><a href="#readFileString">readFileString(filePath, [encoding])</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Reads the content of a file.</p>
</dd>
<dt><a href="#readFileBuffer">readFileBuffer(filePath)</a> ⇒ <code>Promise.&lt;Buffer&gt;</code></dt>
<dd><p>Reads the content of a file.</p>
</dd>
<dt><a href="#writeFile">writeFile(filePath, data)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Writes data to a file, creating directories if necessary.</p>
</dd>
<dt><a href="#deleteFile">deleteFile(filePath)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Deletes a file if it exists.</p>
</dd>
<dt><a href="#fileExists">fileExists(filePath)</a> ⇒ <code>Promise.&lt;boolean&gt;</code></dt>
<dd><p>Checks if a file exists.</p>
</dd>
<dt><a href="#amplitudeScreenTransformStream">amplitudeScreenTransformStream(maxWidth, maxHeight)</a> ⇒ <code>Transform</code></dt>
<dd><p>Creates a Transform stream for audio amplitude visualization.</p>
</dd>
<dt><a href="#createConsoleWriteStream">createConsoleWriteStream()</a> ⇒ <code>Writable</code></dt>
<dd><p>Creates a Writable stream for writing to the console.</p>
</dd>
<dt><a href="#createFileReadStream">createFileReadStream(path, [options])</a> ⇒ <code>ReadStream</code></dt>
<dd><p>Creates a Readable stream for reading from a file.</p>
</dd>
<dt><a href="#createFileWriteStream">createFileWriteStream(path, [options])</a> ⇒ <code>WriteStream</code></dt>
<dd><p>Creates a Writable stream for writing to a file.</p>
</dd>
<dt><a href="#visualizeAudio">visualizeAudio(params)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Processes an audio stream and applies transformations to visualize audio data.</p>
</dd>
</dl>

<a name="recordAudio"></a>

## recordAudio([options]) ⇒ <code>RecordAudioReturn</code>
Records audio using the microphone.

**Kind**: global function  
**Returns**: <code>RecordAudioReturn</code> - An instance of the audio recording process.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>RecordAudioParam</code> | Recording options. |

<a name="playAudio"></a>

## playAudio(filePath) ⇒ <code>Promise.&lt;void&gt;</code>
Plays an audio file.

**Kind**: global function  
**Returns**: <code>Promise.&lt;void&gt;</code> - Resolves with the command output on success.  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | Path to the audio file (requires SoX installed). |

<a name="normalize"></a>

## normalize(samples, chunkSize) ⇒ <code>Float32Array</code>
Normalizes audio samples to have values in the range [0, 1].

**Kind**: global function  
**Returns**: <code>Float32Array</code> - The normalized audio samples.  

| Param | Type | Description |
| --- | --- | --- |
| samples | <code>Float32Array</code> | The input audio samples. |
| chunkSize | <code>number</code> | Size of chunks to process. |

<a name="smooth"></a>

## smooth(samples, windowSize) ⇒ <code>Float32Array</code>
Smooths audio samples using a moving average.

**Kind**: global function  
**Returns**: <code>Float32Array</code> - The smoothed audio samples.  

| Param | Type | Description |
| --- | --- | --- |
| samples | <code>Float32Array</code> | The input audio samples. |
| windowSize | <code>number</code> | The size of the smoothing window. |

<a name="getDistanceAudio"></a>

## getDistanceAudio(userSamples, referenceSamples) ⇒ <code>number</code>
Computes the distance between user audio samples and reference samples using DTW.

**Kind**: global function  
**Returns**: <code>number</code> - The calculated distance.  

| Param | Type | Description |
| --- | --- | --- |
| userSamples | <code>Float32Array</code> | The user-provided audio samples. |
| referenceSamples | <code>Float32Array</code> | The reference audio samples. |

<a name="decodeWav"></a>

## decodeWav(filePath) ⇒ <code>Promise.&lt;Float32Array&gt;</code>
Decodes a WAV file and extracts its audio samples.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Float32Array&gt;</code> - A promise that resolves to the audio samples (mono channel).  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | Path to the WAV file. |

<a name="windowedDTW"></a>

## windowedDTW(refSamples, userSamples, windowSize) ⇒ <code>number</code>
Computes the average DTW distance over multiple windows of audio samples.

**Kind**: global function  
**Returns**: <code>number</code> - The average DTW distance.  

| Param | Type | Description |
| --- | --- | --- |
| refSamples | <code>Float32Array</code> | The reference audio samples. |
| userSamples | <code>Float32Array</code> | The user-provided audio samples. |
| windowSize | <code>number</code> | The size of each window. |

<a name="uploadToS3"></a>

## uploadToS3(bucketName, key, body) ⇒ <code>string</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| bucketName | <code>string</code> | 
| key | <code>string</code> | 
| body | <code>Buffer</code> | 

<a name="deleteFromS3"></a>

## deleteFromS3(bucketName, key)
**Kind**: global function  

| Param | Type |
| --- | --- |
| bucketName | <code>string</code> | 
| key | <code>string</code> | 

<a name="scanFiles"></a>

## scanFiles(dir, fileCallback)
**Kind**: global function  

| Param | Type |
| --- | --- |
| dir | <code>string</code> | 
| fileCallback | <code>function</code> | 

<a name="addJsDoc"></a>

## addJsDoc(filePath)
**Kind**: global function  

| Param | Type |
| --- | --- |
| filePath | <code>string</code> | 

<a name="handleError"></a>

## handleError(error, contextMessage)
**Kind**: global function  

| Param | Type |
| --- | --- |
| error | <code>unknown</code> | 
| contextMessage | <code>string</code> | 

<a name="getPathFile"></a>

## getPathFile(...paths) ⇒ <code>string</code>
Joins multiple path segments into a single path.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ...paths | <code>string</code> | Path segments to join. |

<a name="readFileString"></a>

## readFileString(filePath, [encoding]) ⇒ <code>Promise.&lt;string&gt;</code>
Reads the content of a file.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filePath | <code>string</code> |  | The file path. |
| [encoding] | <code>BufferEncoding</code> | <code>&#x27;utf-8&#x27;</code> | The encoding of the file. Default is `'utf-8'` |

<a name="readFileBuffer"></a>

## readFileBuffer(filePath) ⇒ <code>Promise.&lt;Buffer&gt;</code>
Reads the content of a file.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | The file path. |

<a name="writeFile"></a>

## writeFile(filePath, data) ⇒ <code>Promise.&lt;void&gt;</code>
Writes data to a file, creating directories if necessary.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | The file path. |
| data | <code>string</code> \| <code>Buffer</code> | The data to write. |

<a name="deleteFile"></a>

## deleteFile(filePath) ⇒ <code>Promise.&lt;void&gt;</code>
Deletes a file if it exists.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | The file path. |

<a name="fileExists"></a>

## fileExists(filePath) ⇒ <code>Promise.&lt;boolean&gt;</code>
Checks if a file exists.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | The file path. |

<a name="amplitudeScreenTransformStream"></a>

## amplitudeScreenTransformStream(maxWidth, maxHeight) ⇒ <code>Transform</code>
Creates a Transform stream for audio amplitude visualization.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| maxWidth | <code>number</code> | The maximum width for the visualization. |
| maxHeight | <code>number</code> | The maximum height for the visualization. |

<a name="createConsoleWriteStream"></a>

## createConsoleWriteStream() ⇒ <code>Writable</code>
Creates a Writable stream for writing to the console.

**Kind**: global function  
<a name="createFileReadStream"></a>

## createFileReadStream(path, [options]) ⇒ <code>ReadStream</code>
Creates a Readable stream for reading from a file.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>PathLike</code> | The file path. |
| [options] | <code>Object</code> | Options for the Readable stream. |

<a name="createFileWriteStream"></a>

## createFileWriteStream(path, [options]) ⇒ <code>WriteStream</code>
Creates a Writable stream for writing to a file.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>PathLike</code> | The file path. |
| [options] | <code>Object</code> | Options for the Writable stream. |

<a name="visualizeAudio"></a>

## visualizeAudio(params) ⇒ <code>Promise.&lt;void&gt;</code>
Processes an audio stream and applies transformations to visualize audio data.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> |  |
| params.inputStream | <code>Readable</code> | The input audio stream. |
| params.transformStream | <code>Duplex</code> | The stream to transform audio data. |
| params.outputStream | <code>Writable</code> | The output stream to write transformed data. |

