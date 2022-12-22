#!/usr/bin/env bash
# exit on error
set -o errexit

pip install django
pip install -r requirements.txt



python manage.py collectstatic --no-input
python manage.py makemigrations
python manage.py migrate
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'email', 'Admin@00#')" | python manage.py shell