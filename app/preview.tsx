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
    'video/mp4'
  ]
  const FFMPEG_VIDEO_FORMATS = [
    'avi',
    'gif',
    'mkv',
    'mp4',
  ]
  const FFMPEG_IMG_FORMATS = [
    'jpg',
    'png',
    'png-white-to-transparent'
  ]

  if (file) {
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
                    ? <Converter type='video' options={FFMPEG_VIDEO_FORMATS} ffmpeg={ffmpeg} file={file}/>
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