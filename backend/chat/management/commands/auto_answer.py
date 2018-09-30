from django.core.management.base import BaseCommand
from django.db import connection
from chat.models import Message
import time


class Command(BaseCommand):

    def handle(self, *args, **options):
        while True:
            time.sleep(5)
            self.proceed_messages()

    def proceed_messages(self):
        questions = self.get_unanswered()
        for question in questions:
            self.answer(question)

    def get_unanswered(self):
        with connection.cursor() as cursor:
            cursor.execute("select dialog_id, array_agg(text) from chat_message group by dialog_id having count(sender_id=1) < 1;")
            rows = cursor.fetchall()

        return rows

    def answer(self, question):
        uuid, messages = question
        answer = 'всё будет хорошо (нет)'
        Message.objects.create(dialog_id=uuid, text=answer, sender_id=1)
