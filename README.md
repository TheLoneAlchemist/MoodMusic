
## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)


# Mood Music

A full stack web application that allows user to upload and listen music🎶.
User can sign up and login to access features like play history, listen later,upload etc.


## Authors

- [@TheLoneAlchemist](https://www.github.com/TheLoneAlchemist)


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://thelonealchemist.github.io/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/iamdkp7531)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)


## Deployment on Localhost

1.Download the project via zip or clone.
```bash
git clone https://github.com/TheLoneAlchemist/MoodMusic
```

2. Uncomment the local database(sqlite3) and comment out external database. 
![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

3. Create a virtual environment and download the requirements 

```
pip install requirements.txt
```

3. Change media URL
4. Change html files according to your media url as I am using Cloudinary API to serve the files

5. Run below command:

```
python manage.py makemigrations
python manage.py migrate
```
6. Start the server

```
  python manage.py runserver
```
7. Now go to your favourite browser and open

```
http://127.0.0.1:8000/
```
## License

[MIT](https://choosealicense.com/licenses/mit/)


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Tech Stack

**Client:** HTML, CSS, JAVASCRIPT, BOOTSTRAP

**Server:** Django, Python

**Database:** PostgreSQL


## Demo

[Deployment Link](https://moodmusic.onrender.com/)

