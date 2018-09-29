from django.db import models
from django.contrib.auth.models import User


class Dialog(models.Model):
    uuid = models.UUIDField(primary_key=True)
    created_at = models.DateTimeField(auto_now=True)


class Message(models.Model):
    dialog = models.ForeignKey(Dialog, on_delete=True)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now=True)
    sender = models.ForeignKey(User, null=True, blank=True, on_delete=True)


class Snippet(models.Model):
    answer = models.TextField()
    question = models.TextField()
