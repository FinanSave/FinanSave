# Generated by Django 5.0.6 on 2024-08-25 21:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_alter_movimentacao_categoria_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='orcamento',
            name='user_id',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='backend.usuario'),
            preserve_default=False,
        ),
    ]
