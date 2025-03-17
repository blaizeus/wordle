from django.urls import path
from .views import GuessesView

app_name = "api"
urlpatterns = [
    path("guesses/", GuessesView.as_view(), name="guesses"),
]
