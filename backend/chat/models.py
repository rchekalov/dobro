from django.db import models
from django.contrib.auth.models import User
import uuid


class Dialog(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now=True)
    theme = models.TextField(null=True, blank=True)


class Message(models.Model):
    dialog = models.ForeignKey(Dialog, on_delete=True)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now=True)
    sender = models.ForeignKey(User, null=True, blank=True, on_delete=True)


class Snippet(models.Model):
    answer = models.TextField()
    question = models.TextField()
