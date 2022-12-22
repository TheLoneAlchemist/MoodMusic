#!/usr/bin/env bash
# exit on error
set -o errexit

pip install django
pip install -r requirements.txt



python manage.py collectstatic --no-input
python manage.py migrate