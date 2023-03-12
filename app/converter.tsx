import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import { useState } from 'react';

export default function Converter(props: any) {
    const type = props.type
    const options = props.options
    const ffmpeg = props.ffmpeg
    const file = props.file
    const [output, setOutput] = useState('');
    const [format, setFormat] = useState('');

    const setConverterAndClearDownload = (e: any) => {
        setFormat(e.target.value)
        setOutput('')
    }

    const convert = async() => {
        if (format) {
            const outFormat = (format == 'png-white-to-transparent' ? 'png' : format)
            const blobType = type + '/' + outFormat
            const outFile = file.name.split('.')[0] + '.' + outFormat

            // Write file to memory
            ffmpeg.FS('writeFile', file.name, await fetchFile(file));
        
            // ffmpeg command
            if (format == 'png-white-to-transparent') {
                await ffmpeg.run('-i', file.name, '-vf', 'colorkey=white:0.01:0.0', outFile)
            } else {
                await ffmpeg.run('-i', file.name, outFile)
            }
    
            // Read result
            const data = ffmpeg.FS('readFile', outFile)

            // Create URL
            const url = URL.createObjectURL(new Blob([data.buffer], {type: blobType}))
            setOutput(url)
        }
    };

    const optionButtons: any = options.map((key: any, value: any) => (
        <div className="p-0.5" key={key}>
            <label key={key}>
                <input 
                    type="radio" 
                    name="input" 
                    onChange={(e) => setConverterAndClearDownload(e)}
                    value={key} 
                />
                <span className="pl-2">{key}</span>
            </label>
        </div>
    ));

    return (
        <div>
            <p className='text-xl font-bold pb-3'>Converter options</p>
            <div className="flex">
                <div className="flex-col">{optionButtons}</div>
                <div className='pl-10 flex-1 flex-col'>
                    <div>
                        <button 
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={convert}
                        >Convert</button>
                    </div>
                    {output && 
                        <div className='pt-3'>
                            <a 
                                className="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                                href={output}
                                download='output'
                            >
                                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                                <span>Download</span>
                            </a>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}