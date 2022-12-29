from pyexpat.errors import messages
from django import urls
from django.shortcuts import redirect, render
from .models import Song, Listenlater, History, Channel
from django.contrib.auth.models import User
from django.db.models import Case, When
from django.contrib import messages
# Create your views here.
# cloudinary import
from django import forms
from cloudinary.forms import cl_init_js_callbacks
from .forms import UplaodForm
#pagination
from django.core.paginator import Paginator




def Play(request):
    songobj = Song.objects.all().first()

    return render(request, "play.html", {'song': songobj})


def Songlist(request):
    songObj = Song.objects.all()
    paginator = Paginator(songObj,6)
    page_number = request.GET.get('page')
    songs = paginator.get_page(page_number)
    return render(request, "songlist.html", {'songs': songs})

def Songlisten(request, id):
    if request.method == "POST":
        user = request.user
        song_id = request.POST['song_id']

        userlisenlater = Listenlater.objects.filter(user=user)
        for i in userlisenlater:
            if song_id == i.song_id:
                message = "Your Song Already added !"
                break
        else:
            ListenLaterObj = Listenlater(song_id=song_id, user=user)
            ListenLaterObj.save()
            message = "Your Song is added to ListenLater"

        songobj = Song.objects.filter(song_id=song_id).first()
        return render(request, "listensong.html", {"message": message, "song": songobj})

    songObj = Song.objects.filter(song_id=id).first()

    return render(request, "listensong.html", {'song': songObj})


def Listenlaterfun(request):

    if request.user.is_anonymous:
        return redirect("/login")

    listenlaterobj = Listenlater.objects.filter(user=request.user)
    listenId = []
    for i in listenlaterobj:
        listenId.append(i.song_id)

    preserved = Case(*[When(pk=pk, then=pos)
                     for pos, pk in enumerate(listenId)])
    songObj = Song.objects.filter(song_id__in=listenId).order_by(preserved)
    paginator = Paginator(songObj,6)
    page_number = request.GET.get('page')
    songs = paginator.get_page(page_number)
    return render(request, "listenlater.html", {'songs': songs})


def Historyfun(request):
    if request.user.is_anonymous:
        return redirect("/login")

    if request.method == "POST":
        music_id = request.POST['music_id']
        print(music_id,"_______________")
        userhistory = History.objects.filter(user=request.user)
        for i in userhistory:
            if music_id == i.music_id:
                # break
                return redirect(f"/music/songlisten/{music_id}")
        else:

            history = History(user=request.user, music_id=music_id)
            history.save()
            return redirect(f"/music/songlisten/{music_id}")

    history = History.objects.filter(user=request.user)
    historyIds = []
    for i in history:
        historyIds.append(i.music_id)

    preserved = Case(*[When(pk=pk, then=pos)
                     for pos, pk in enumerate(historyIds)])
    songObj = Song.objects.filter(song_id__in=historyIds).order_by(preserved)
    paginator = Paginator(songObj,6)
    page_number = request.GET.get('page')
    songs = paginator.get_page(page_number)
    return render(request, "history.html", {'songs': songs})


def ChannelFuc(request, cname):
    if request.user.is_anonymous:
        return redirect("/login")

    channel = Channel.objects.filter(name=cname).first()
    musics = channel.music.split("|")[1:]
    print(musics)
    preserved = Case(*[When(pk=pk, then=pos) for pos, pk in enumerate(musics)])
    songObj = Song.objects.filter(song_id__in=musics).order_by(preserved)
    paginator = Paginator(songObj,6)
    page_number = request.GET.get('page')
    songs = paginator.get_page(page_number)
    return render(request, 'channel.html', {"channel": channel, "songs": songs})

# for local env
# def Upload(request):
#     if request.user.is_anonymous:
#         return redirect("/login")

#     if(request.method == "POST"):
#         try:
#             title = request.POST.get('title')
#             artist = request.POST.get('artist')
#             tag = request.POST.get('tag')
#             copyrights = request.POST.get('copyrights')
#             image = request.FILES['image']
#             song = request.FILES['song']

#             # creating Song object to save song
#             SongObj = Song(title=title, artist=artist, tags=tag,
#                         song=song, image=image, copyrights=copyrights)
#             SongObj.save()

#             # creating music_id object to store in the Channel of requested user(login user)
#             music_id = SongObj.song_id
#             ChannelObj = Channel.objects.filter(name=request.user).first()
#             ChannelObj.music += f"| {music_id}"
#             ChannelObj.save()
#             messages.success(request, "Your file uploaded sucessfully !")
#         except Exception as e:
#             print("_______________________________________________")
#             print(e)
#             print("_______________________________________________")
#             messages.error(request,"Something went wrong! ")
#         finally:

#             return redirect('/music/upload')

#     return render(request, 'upload.html')


def Upload(request):
    if request.user.is_anonymous:
        return redirect('/login')

    if (request.method == "POST"):
        context = dict(backend_form = UplaodForm())
        try:
            form = UplaodForm(request.POST,request.FILES)
            context['posted'] = form.instance
            if form.is_valid():
                form.save()

            # creating music_id object to store in the Channel of requested user(login user)
            SongObj = Song.objects.filter(title = request.POST.get('title')).first()
            music_id = SongObj.song_id
            print(music_id,"------------------------------------")
            ChannelObj = Channel.objects.filter(name=request.user).first()
            ChannelObj.music += f"| {music_id}"
            ChannelObj.save()
            messages.success(request, "Your file uploaded sucessfully !")
                
        except Exception as e:
            print("____________________________________")
            print(e)
            print("____________________________________")
            messages.error(request,"Something went Wrong!")
        finally:
            return redirect('/upload')

    form = UplaodForm()
    ctx = {'form':form}
    return render(request,'upload.html',ctx)




def Search(request):
    if request.method == "GET":
        searchKeyword = request.GET.get("keyword")
        searchedSong = Song.objects.filter(title__icontains=searchKeyword)
        # print(searchedSong)
        # print("#########################")
        allsong = Song.objects.all()
        print(allsong.filter(title__icontains=searchKeyword))

        paginator = Paginator(searchedSong,6)
        page_number = request.GET.get('page')
        songs = paginator.get_page(page_number)
    return render(request, 'searchresult.html', {"keyword": searchKeyword, "songs": songs})


def profile(request):
    if request.user.is_anonymous:
        return redirect("/login")

    if request.method == "POST":
        if request.POST.get('fname') != None:
            userobj = User.objects.filter(
                first_name=request.user.first_name).first()
            userobj.first_name = request.POST.get('fname')
            userobj.save()
            messages.success(
                request, f"Your First Name sucessfully changed to {userobj.first_name}!")
            return redirect('/music/profile')

        elif request.POST.get('lname') != None:
            userobj = User.objects.filter(
                last_name=request.user.last_name).first()
            userobj.last_name = request.POST.get('lname')
            userobj.save()
            messages.success(
                request, f"Your Last Name sucessfully changed to {userobj.last_name}!")
            return redirect('/music/profile')

        elif request.POST.get('email') != None:
            userobj = User.objects.filter(email=request.user.email).first()
            userobj.email = request.POST.get('email')
            userobj.save()
            messages.success(
                request, f"Your email sucessfully changed to {userobj.email}!")
            return redirect('/music/profile')

        elif (request.POST.get('cpass') != None) & (request.POST.get('npass1') != None) & (request.POST.get('npass2') != None):

            userobj = User.objects.filter(
                password=request.user.password).first()
            from django.contrib.auth.hashers import check_password
            # checking current password is valid or not
            pwd_valid = check_password(
                request.POST.get('cpass'), userobj.password)

            if pwd_valid & (request.POST.get('napss1') == request.POST.get('npass2')):
                userobj.change_password = request.POST.get('npass1')
                messages.success(request, "Your password sucessfully changed!")
                return redirect('/music/profile')

            else:
                messages.error(
                    request, "You enterd Wrong Password!, Kindly use your currect password")
                print('password did not match')
                return redirect('/music/profile')

        else:
            messages.error(request, "Something went Wrong!")
            return redirect('/music/profile')

    return render(request, "profile.html")
