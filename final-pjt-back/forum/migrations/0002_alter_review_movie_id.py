# Generated by Django 3.2.6 on 2021-11-18 14:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='movie_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='forum.movie'),
        ),
    ]
