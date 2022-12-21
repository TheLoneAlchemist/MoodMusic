# Generated by Django 4.0.3 on 2022-11-25 07:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Music', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Listenlater',
            fields=[
                ('listen_id', models.AutoField(primary_key=True, serialize=False)),
                ('song_id', models.CharField(default='', max_length=10000000)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]