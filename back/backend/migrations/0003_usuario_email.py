# Generated by Django 5.0.6 on 2024-08-14 00:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_usuario_created_at_usuario_updated_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='email',
            field=models.EmailField(blank=True, max_length=255, null=True),
        ),
    ]