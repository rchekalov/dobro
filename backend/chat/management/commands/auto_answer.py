from django.core.management.base import BaseCommand
from django.db import connection
import Stemmer
from chat.models import Message
import time

ANSWERS = {
    'Кошмары': "Не бойся кошмаров",
    'Отношения': "Школу сначала закончи",
    'Проблемы в семье': "Слушайся маму",
    'Секс': "Какой секс",
    'Одиночество': "все в мире одиноки",
    'Кибербуллинг': "Читай книжки",
    'Суицид': "не умирай"
}

stemmer = Stemmer.Stemmer('russian')


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
        print(question)
        uuid, messages = question
        themes = {
            'Кошмары': 0,
            'Отношения': 0,
            'Проблемы в семье': 0,
            'Секс': 0,
            'Одиночество': 0,
            'Кибербуллинг': 0,
            'Суицид': 0
        }
        for message in messages:
            message = message.replace(',', ' ').replace('.', ' ').replace('!', ' ').replace('?', ' ').replace('(', ' ').replace(')', ' ')
            stemmed_words = stemmer.stemWords(message.split(' '))
            for stemmed_word in stemmed_words:
                if len(stemmed_word) > 2:
                    if stemmed_word.lower() in ('родител', 'отч', 'мам', 'пап', 'мат', 'отец', 'спор'):
                        themes['Проблемы в семье'] += 1
                    if stemmed_word.lower() in ('кошмар', 'сон'):
                        themes['Кошмары'] += 1
                    if stemmed_word.lower() in ('секс', 'месячн', 'беремен', 'забеременя', 'мастурбац', 'дроч'):
                        themes['Секс'] += 1
                    if stemmed_word.lower() in ('парен', 'девушк'):
                        themes['Отношения'] += 1
                    if stemmed_word.lower() in ('дразн', 'бьют', 'ненавид', 'гноб'):
                        themes['Кибербуллинг'] += 1
                    if stemmed_word.lower() in ('никт', 'ник', 'заб'):
                        themes['Одиночество'] += 1
                    if stemmed_word.lower() in ('спрыгнул',
                                                'спрыгнут',
                                                'прыгнул',
                                                'крыш',
                                                'порез',
                                                'реза',
                                                'вен',
                                                'бритв',
                                                'нож'):
                        themes['Суицид'] += 1
        max_theme = ''
        max_number = 0
        for k, v in themes.items():
            if v > max_number:
                max_number = v
                max_theme = k
        if max_theme:
            Message.objects.create(dialog_id=uuid, text=ANSWERS.get(max_theme), sender_id=1)
