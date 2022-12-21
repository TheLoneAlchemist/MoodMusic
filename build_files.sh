echo "BUILD START"
python3.10.0 -m pip install - requirements.txt
python3.10.0 manage.py collectstatic --noinput --clear
echo "BUILD END"