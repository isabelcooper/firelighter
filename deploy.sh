#!/usr/bin/env bash
PROJECT_NAME=firelighter

set -e

sudo apt-get install gettext

envsubst < app.yaml.template > app.yaml

if [[ ! $(command -v gcloud) ]]; then
    echo 'Installing gcloud sdk'
    sudo apt-get install python
    wget https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-214.0.0-linux-x86_64.tar.gz
    tar xzf google-cloud-sdk-214.0.0-linux-x86_64.tar.gz
    ./google-cloud-sdk/install.sh -q
    sudo cp -R google-cloud-sdk/* /usr/local
fi

echo "GCLOUD_SERVICE_KEY:" ${GCLOUD_SERVICE_KEY}
echo ${GCLOUD_SERVICE_KEY} | base64 --decode > ${HOME}/firelighter-a9cf2a05d349.json
gcloud auth activate-service-account --key-file=${HOME}/firelighter-a9cf2a05d349.json
echo "GOOGLE_PROJECT_ID:" ${GOOGLE_PROJECT_ID}
echo "GOOGLE_COMPUTE_ZONE:" ${GOOGLE_COMPUTE_ZONE}
gcloud --quiet config set project ${PROJECT_NAME}
gcloud --quiet config set compute/zone ${GOOGLE_COMPUTE_ZONE}
gcloud auth list

gcloud app deploy --project=${PROJECT_NAME} --quiet
