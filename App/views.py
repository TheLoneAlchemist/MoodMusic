from django.shortcuts import redirect, render
from django.http import HttpResponse
from datetime import datetime
from App.models import Contact
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from Music.models import Channel, History, Listenlater, Song
from django.db.models import Case, When


def index(request):

    if request.user.is_anonymous:

        RecentlyAdded = Song.objects.all()[:4]

        channels = Channel.objects.all()[:4]
        song = Song.objects.all()
        return render(request, "index.html", {'song': RecentlyAdded, 'channels': channels})

    history = History.objects.filter(user=request.user)
    historyIds = []
    for i in history:
        historyIds.append(i.music_id)

    preservedh = Case(*[When(pk=pk, then=pos)
                      for pos, pk in enumerate(historyIds)])
    historys = Song.objects.filter(song_id__in=historyIds).order_by(preservedh)

    listenlaterobj = Listenlater.objects.filter(user=request.user)
    listenId = []
    for i in listenlaterobj:
        listenId.append(i.song_id)

    preservedl = Case(*[When(pk=pk, then=pos)
                      for pos, pk in enumerate(listenId)])
    listenlaters = Song.objects.filter(
        song_id__in=listenId).order_by(preservedl)

    RecentlyAdded = Song.objects.all()[:4]
    channels = Channel.objects.all()[:4]
    return render(request, "index.html", {'song': RecentlyAdded, 'channels': channels, 'historys': historys, 'listenlaters': listenlaters})


def contact(request):

    if request.method == "POST":
        try:

            Name = request.POST.get('name')
            Email = request.POST.get('email')
            Phone = request.POST.get('phone')
            Message = request.POST.get('message')

            if (Name == "") | (Email == "") | (Message == ""):
                raise

            contact = Contact(name=Name, email=Email, phone=Phone,
                              message=Message, date=datetime.today())
            contact.save()
            messages.success(request, "Your Message has been sent! ")
        except:
            messages.error(request, "You did not fill all field!")

        finally:
            redirect('/contact')

    return render(request, "contact.html")
    # return HttpResponse("Hello, world. You're at the about page. ")


def about(request):
    return render(request, "about.html")


def LoginUser(request):
    if request.method == "POST":
        Username = request.POST.get('username')
        Pasword = request.POST.get('password')
        print(Username, Pasword)
        user = authenticate(username=Username, password=Pasword)
        if user is not None:
            login(request, user)
            messages.success(request,f"Hii! Welcome Back {user}")
            return redirect("/")
        else:
            messages.error(request,"You enterd wrong details!, Kindly put right information.")
            return redirect("login")

    return render(request, "login.html")


def LogoutUser(request):
    logout(request)
    messages.success(request,"You has been logout")
    return redirect('/')

def ForgetPass(request):
    messages.info(request,"Kindly Enter the issue below. We will reach you soon!")
    return redirect('/contact')


def SignupUser(request):
    if request.method == "POST":
        username = request.POST.get('username')
        first_name = request.POST.get('fname')
        last_name = request.POST.get('lname')
        email = request.POST.get('email')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')
        # print(username, password1, email,first_name,last_name)

        if (len(first_name) < 3) | (len(last_name) < 3):
            messages.warning(request, "Name should be greater than 3 letter!")
            return redirect('signup')
        if User.objects.filter(username=username).exists():
            messages.warning(
                request, "Username is already taken. Please Choose another one !")
            return redirect('signup')
        if len(username) < 3:
            messages.warning(request, "Username should be greater then 3! ")
            return redirect('signup')
        if password1 != password2:
            messages.error(
                request, "Password did not match! kindly use same password in each field.")
            return redirect('signup')

        myuser = User.objects.create_user(
            username=username, email=email, password=password1)

        myuser.first_name = first_name
        myuser.last_name = last_name
        myuser.save()

        # Creating Channel Directly While Signup
        channel = Channel(name=username)
        channel.save()

        user = authenticate(username=username, password=password1)
        # print(user)
        messages.success(request, "User created successfully!")
        if user is not None:
            login(request, user)
            return redirect('/')

    return render(request, "signup.html")
