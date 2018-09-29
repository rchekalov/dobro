from django.conf.urls import url, include
from rest_framework import routers
from chat.views import UserViewSet, DialogViewSet, MessageViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'dialog', DialogViewSet)
router.register(r'message', MessageViewSet)
router.register(r'snippet', MessageViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
