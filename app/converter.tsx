import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import { useState } from 'react';

export default function Converter(props: any) {
    const type = props.type
    const options = props.options
    const ffmpeg = props.ffmpeg
    const file = props.file
    const [output, setOutput] = useState('');
    const [converting, setConverting] = useState(false);
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
            
            setConverting(true)
            // Write file to memory
            ffmpeg.FS('writeFile', file.name, await fetchFile(file));
        
            console.info("Convert " + file.name + " to " + outFile)
            // ffmpeg command
            if (format == 'png-white-to-transparent') {
                await ffmpeg.run('-i', file.name, '-vf', 'colorkey=white:0.1:0.0', outFile)
            } else {
                await ffmpeg.run('-i', file.name, outFile)
            }
    
            // Read result
            const data = ffmpeg.FS('readFile', outFile)

            // Create URL
            const url = URL.createObjectURL(new Blob([data.buffer], {type: blobType}))
            setOutput(url)
            setConverting(false)
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
                    {
                    (converting &&
                        <div className='pt-3'>
                            <span>Converting...</span>
                            <div className=''>
                                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}