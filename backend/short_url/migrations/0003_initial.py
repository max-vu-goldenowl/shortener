# Generated by Django 4.0.6 on 2022-08-03 09:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Shortener',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('click', models.PositiveIntegerField(default=0)),
                ('original_url', models.URLField()),
                ('short_url', models.CharField(blank=True, db_index=True, max_length=15, unique=True)),
            ],
        ),
    ]
