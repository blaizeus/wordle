from django.db import models
from random import randint
from datetime import datetime
import json

class Word(models.Model):
    value = models.CharField(max_length=5, unique=True)
    date_selected = models.DateField(blank=True, null=True)
    class Meta:
        indexes = [
            models.Index(fields=["value", "date_selected"])
        ]
    
    @staticmethod
    def populate_words():
        if not Word.objects.exists():
            word_list = []
            with open('words.json') as file:
                file_json = json.load(file)
                word_list = file_json["words"]
            words_to_create = []
            for word in word_list:
                word_obj = Word(value=word)
                words_to_create.append(word_obj)
            Word.objects.bulk_create(words_to_create)

    @staticmethod
    def select_word():
        todays_word = Word.objects.filter(date_selected=datetime.now().date())
        if not todays_word.exists():
            unused_words = Word.objects.filter(date_selected__isnull=True)
            if unused_words.exists():
                selected_word_index = randint(0, unused_words.count() - 1)
                selected_word = unused_words[selected_word_index]
                selected_word.date_selected = datetime.now().date()
                selected_word.save(update_fields=["date_selected"])
            else:
                oldest_used_word = Word.objects.order_by("date_selected").first()
                oldest_used_word.date_selected = datetime.now().date()
                oldest_used_word.save(update_fields=["date_selected"])

    @staticmethod
    def get_selected_word():
        return Word.objects.get(date_selected=datetime.now().date()).value
