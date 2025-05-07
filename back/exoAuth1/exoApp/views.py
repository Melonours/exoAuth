

from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, Article
from .serializers import UserSerializer, ArticleSerializer

import json

# Create your views here.

#Gestion d'inscription, connexion et déconnexion 
@api_view(['POST'])
def inscription(request):
    data = json.loads(request.body)
    nom = data.get('nom')
    prenom = data.get('prenom')
    email = data.get('email')
    password = data.get('password')
    if User.objects.filter(email = email).exists():
        return JsonResponse({'status' : 'error', 'message' : 'Email déjà utilisé'})
    new_user = User(nom = nom, prenom = prenom, email = email, password = make_password(password))
    new_user.save()
    return JsonResponse({'status' : 'success', 'message' : 'Utilisateur créé !'})


@api_view(['POST'])
def connexion(request):
    data = json.loads(request.body)
    email = data.get('email')
    password = data.get('password')
    user = authenticate(request, email = email, password = password)
    if user is not None:
        login(request, user)
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return JsonResponse({'status' : 'success', 'message' : 'Connecté !', 'access_token' : access_token, 'refresh_token' : str(refresh)})
    else:
        return JsonResponse({'status' : 'error', 'message' : "Nom d'utilisateur ou mot de passe incorrect"})
    

@api_view(['POST'])
def deconnexion(request):
    logout(request)
    return JsonResponse({'status' : 'success', 'message' : 'Déconnecté'})


#Récupération d'un utilisateur connecté
def get_user(request):
    try:
        auth = JWTAuthentication()
        user, _ = auth.authenticate(request)
    except:
        return JsonResponse({'error' : 'erreur'})
    mon_user = {
        'nom' : user.nom,
        'prenom' : user.prenom,
        'id' : user.id,
    }
    return JsonResponse({'user' : mon_user})


#CRUD des articles
def index(request):
    all_articles = ArticleSerializer(Article.objects.all(), many=True)
    return JsonResponse({'all_articles' : all_articles.data})

def get_article_by_id(request, id):
    article = ArticleSerializer(Article.objects.get(id=id))
    return JsonResponse({'data' : article.data})


@api_view(['POST'])
def create_article(request):
    # try:
    #     auth = JWTAuthentication()
    #     user, _ = auth.authenticate(request)
    # except:
    #     return JsonResponse({'error' : 'erreur'})
    # mon_user = {
    #     'nom' : user.nom,
    #     'prenom' : user.prenom,
    #     'id' : user.id,
    # }
    # articles = ArticleSerializer(data = request.data)
    # if articles.is_valid():
    #     articles.save()
    #     print('article créé')
    #     return Response({'success' : 'Article created successfully'})
    # return JsonResponse(articles.errors, {'user' : mon_user})
    user = request.user
    
    print(user.id)

    return JsonResponse({'success' : 'Article created successfully'})


@api_view(['DELETE'])
def delete_article(request, id):
    print('destroy article')
    article = Article.objects.get(id=id)
    article.delete()
    return Response({'success' : 'Article deleted successfully'})


@api_view(['PUT'])
def update_artcile(request, id):
    print('update article')
    article = Article.objects.get(id=id)
    articles = ArticleSerializer(article ,data=request.data)
    if articles.is_valid():
        articles.save()
        return Response({'success' : 'Artcile updated successfully'})
    return Response(articles.errors)