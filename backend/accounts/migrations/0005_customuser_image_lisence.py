# Generated by Django 4.1.5 on 2023-01-29 19:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_remove_customuser_full_names_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='image',
            field=models.ImageField(blank=True, upload_to='profiles-images'),
        ),
        migrations.CreateModel(
            name='Lisence',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(blank=True, max_length=25, verbose_name='role')),
                ('name', models.CharField(blank=True, max_length=225, verbose_name='File Name')),
                ('file', models.FileField(upload_to='lisences', verbose_name='file')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='user')),
            ],
        ),
    ]