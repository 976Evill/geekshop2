# Generated by Django 3.2.5 on 2021-07-28 20:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authapp', '0002_auto_20210728_2136'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shopuser',
            name='activation_key_expires',
        ),
        migrations.AddField(
            model_name='shopuser',
            name='activation_key_created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
