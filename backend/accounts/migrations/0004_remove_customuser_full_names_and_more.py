# Generated by Django 4.1.5 on 2023-01-23 08:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_customuser_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='full_names',
        ),
        migrations.AlterField(
            model_name='customuser',
            name='password',
            field=models.CharField(max_length=255, verbose_name='Password'),
        ),
    ]
