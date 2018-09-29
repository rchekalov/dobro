from django.contrib.auth.models import User
from rest_framework import serializers, viewsets
from .models import Dialog, Message, Snippet


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class DialogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dialog
        fields = '__all__'


class DialogViewSet(viewsets.ModelViewSet):
    queryset = Dialog.objects.all()
    serializer_class = DialogSerializer


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = '__all__'


class SnippetViewSet(viewsets.ModelViewSet):
    queryset = Snippet.objects.all()
    serializer_class = MessageSerializer
