from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Word

class GuessesView(APIView):
    def post(self, request):
        guess = request.data.get("guess")
        if Word.objects.filter(value=guess).exists():
            todays_word = Word.get_selected_word()
            result = []
            for i in range(5):
                if guess[i] == todays_word[i]:
                    result.append(1)
                elif guess[i] in todays_word:
                    result.append(0)
                else:
                    result.append(-1)
            return Response({"result": result}, status=status.HTTP_200_OK)
        return Response({"message": "this is not a real word"}, status=status.HTTP_400_BAD_REQUEST)
