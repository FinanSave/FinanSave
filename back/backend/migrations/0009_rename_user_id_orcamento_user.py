# Generated by Django 5.0.6 on 2024-08-25 21:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_orcamento_user_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='orcamento',
            old_name='user_id',
            new_name='user',
        ),
    ]