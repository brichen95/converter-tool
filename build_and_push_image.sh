#!/bin/bash

registry_host=10.0.1.3
registry_port=5050
image_name=web-converter

usage() {
    echo "Usage: $0 [-n <image name, default web-converter"
}

while getopts ":n:t:" o; do
    case "${o}" in
        n)
            n=${OPTARG}
            ;;
        t)
            t=${OPTARG}
            ;;
        *)
            usage
            exit
    esac
done

if ! [ -z "${n}" ]; then 
    echo "image name is ${n}"
    image_name=${n}
fi

full_image="$registry_host:$registry_port/$image_name"
read -p "Build and push $full_image:latest? " -n 1 -r
echo "" 
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker image build --platform=linux/amd64 -t $full_image:latest .
    docker image tag -t $full_image:latest
    docker image push $full_image:latest
else
    echo "Only 'Y' or 'y' accepted."
fi