from django.contrib.auth.models import User
from rest_framework import serializers, viewsets
from .models import Dialog, Message, Snippet
from rest_framework.response import Response
from rest_framework import status
import uuid


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
    queryset = Dialog.objects.all().order_by('-created_at')
    serializer_class = DialogSerializer


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def create(self, request, *args, **kwargs):
        custom_data = dict(request.data)
        if 'dialog' not in custom_data:
            dialog = Dialog.objects.create()
            custom_data['dialog'] = dialog.uuid
        serializer = self.get_serializer(data=custom_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        dialog = request.query_params.get('dialog')
        if dialog:
            queryset = self.filter_queryset(self.get_queryset())
            try:
                dialog_uuid = uuid.UUID(dialog)
            except ValueError:
                return Response(status=status.HTTP_404_NOT_FOUND)
            else:
                queryset = queryset.filter(dialog=dialog_uuid)
                page = self.paginate_queryset(queryset)
                if page is not None:
                    serializer = self.get_serializer(page, many=True)
                    return self.get_paginated_response(serializer.data)

                serializer = self.get_serializer(queryset, many=True)
                return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = '__all__'


class SnippetViewSet(viewsets.ModelViewSet):
    queryset = Snippet.objects.all()
    serializer_class = MessageSerializer
