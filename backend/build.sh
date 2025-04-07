#!/usr/bin/env bash

set -o errexit

pipenv install -r backend/requirements.txt

python backend/manage.py collectstatic --no-input
python backend/manage.py migrate
