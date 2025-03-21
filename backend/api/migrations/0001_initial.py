# Generated by Django 5.0.1 on 2025-03-15 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Word',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=5, unique=True)),
                ('date_selected', models.DateField(blank=True, null=True)),
            ],
            options={
                'indexes': [models.Index(fields=['value', 'date_selected'], name='api_word_value_04a323_idx')],
            },
        ),
    ]
