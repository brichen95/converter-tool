"use client";
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import Converter from './converter';

/* @ts-ignore */
export default function Preview({file, ffmpeg}) {
  const IMGS = [
    'image/jpeg',
    'image/png'
  ]
  const VIDS = [
    'video/mp4',
    'video/quicktime'
  ]
  const FFMPEG_VIDEO_FORMATS = [
    'avi',
    'gif',
    'mkv',
    'mov',
    'mp4',
    'mp3-audio-only'
  ]
  const VIDEO_CONVERTER_OUTPUTS = [
    {'filetype': 'video/avi', 'ext': 'avi', 'label': 'avi'},
    {'filetype': 'video/mp4', 'ext': 'mp4', 'label': 'mp4'},
    {'filetype': 'video/mkv', 'ext': 'mkv', 'label': 'mkv'},
    {'filetype': 'video/mov', 'ext': 'mov', 'label': 'mov'},
    {'filetype': 'image/gif', 'ext': 'gif', 'label': 'gif'},
    {'filetype': 'audio/mpeg', 'ext': 'mp3', 'label': 'mp3 - AUDIO ONLY'},
  ]
  const FFMPEG_IMG_FORMATS = [
    'ico',
    'jpg',
    'png',
    'png-white-to-transparent'
  ]

  if (file) {
    console.log(file)
    return (
      <div>
        <div className='flex h-500'>
          <div className='flex-2 pr-5'>
            { IMGS.includes(file.type)
              ? <Image width="500" height="500" alt="n/a" src={URL.createObjectURL(file)} />
              : (VIDS.includes(file.type) || file.name.includes(".mkv"))
                ? <video controls width="500" src={URL.createObjectURL(file)} />
                : <div>Invalid file type</div>
            }
          </div>
          <div className='flex-1'>
            { IMGS.includes(file.type)
              ? (
                <div>
                  <p>Type: {file.type}</p>
                  <p>Size: {(file.size / 1000 / 1000).toFixed(2)} GB</p>
                </div>
              )
              : (VIDS.includes(file.type) || file.name.includes(".mkv"))
                ? (
                  <div>
                    <p>Type: {file.type ? file.type : file.name}</p>
                    <p>Size: {(file.size / 1000 / 1000).toFixed(2)} MB</p>
                  </div>
                )
                : (
                  <div></div>
                )
            }
          </div>
        </div>
        <div className='pt-3'>
          <div className='flex'>
              { IMGS.includes(file.type)
                ? <Converter type='image' options={FFMPEG_IMG_FORMATS} ffmpeg={ffmpeg} file={file}/>
                  : (VIDS.includes(file.type) || file.name.includes(".mkv"))
                  ? <Converter type='video' options={VIDEO_CONVERTER_OUTPUTS} ffmpeg={ffmpeg} file={file}/>
                  : (
                    <div></div>
                  )
              }          
          </div>
        </div>
      </div>
    )
  } else return (
    <div></div>
  )
}