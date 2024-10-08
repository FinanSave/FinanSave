# Generated by Django 5.0.6 on 2024-08-15 19:47

from decimal import Decimal
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_movimentacao_orcamento_created_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='movimentacao',
            name='categoria',
            field=models.CharField(choices=[('Transporte', 'Transporte'), ('Comida', 'Comida'), ('Roupas', 'Roupas'), ('Lazer', 'Lazer'), ('Outros', 'Outros')], default='Outros', max_length=50),
        ),
        migrations.AddField(
            model_name='movimentacao',
            name='quer_ser_lembrado',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='movimentacao',
            name='recorrente',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='movimentacao',
            name='valor',
            field=models.DecimalField(decimal_places=2, default=Decimal('0.00'), max_digits=10),
        ),
    ]
