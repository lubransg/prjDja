# Generated by Django 2.1.10 on 2019-07-24 21:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SDO_Users',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Code', models.CharField(max_length=25)),
                ('Password', models.CharField(max_length=50)),
                ('Name', models.CharField(max_length=100)),
                ('LastName', models.CharField(max_length=100)),
                ('BirthDate', models.DateField(verbose_name='BirthDate')),
            ],
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
