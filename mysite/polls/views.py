from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View
import logging
from django.http import JsonResponse
from django.shortcuts import redirect
from . import models
from datetime import datetime
import json

with open("./info.json") as file:
    data = json.load(file)
    context = data


logger = logging.getLogger(__name__)

def index(request):
    return render(request, "main.html", context)

def portal(request):
    return render(request, "portal.html", context)

def login(request):
    return render(request, "login.html", context)

def register(request):
    return render(request, "register.html", context)

def change_name(request):
    all_users = models.User.objects.all()
    curr_username, curr_user_email = calc_active()
    dict = {}
    query = request.GET
    name = query.getlist("name")[0]
    for user in all_users:
        if user.email == curr_user_email:
            user.name = name
            user.save()
    return JsonResponse(dict)

def change_pass(request):
    all_users = models.User.objects.all()
    curr_username, curr_user_email = calc_active()
    dict = {}
    query = request.GET
    password = query.getlist("pass")[0]
    for user in all_users:
        if user.email == curr_user_email:
            user.password = password
            user.save()
    return JsonResponse(dict)

def change_email(request):
    all_users = models.User.objects.all()
    curr_username, curr_user_email = calc_active()
    dict = {}
    query = request.GET
    logger.debug("QUERY-----\n{}".format(query))
    email = query.getlist("email")[0]
    for user in all_users:
        if user.email == curr_user_email:
            user.email = email
            user.save()
    return JsonResponse(dict)

def logout(request):
    all_users = models.User.objects.all()
    curr_username, curr_user_email = calc_active()
    for user in all_users:
        if user.email == curr_user_email:
            user.status = ""
            user.save()
    
    return JsonResponse({"Response":"Success"})

def calc_active():
    curr_username = None
    curr_user_email = None
    all_users = models.User.objects.all()
    h = 0
    for user in all_users:
        status = user.status
        if status is not "":
            t = float(status)
            if t > h:
                h = t
                curr_username = user.name
                curr_user_email = user.email
    return curr_username, curr_user_email

def get_active(request):
    curr_username, curr_user_email = calc_active()

    return JsonResponse({"name": curr_username, "email": curr_user_email})

def validate_reg(request):
    query = request.GET
    email = query.getlist("email")[0]
    all_users = models.User.objects.all()
    logger.debug("ALL USERS----\n{}".format(all_users))
    valid = True
    for user in all_users:
        if user.email == email:
            valid = False
    return JsonResponse({"Response":valid})

def validate_login(request):
    query = request.GET
    email = query.getlist("email")[0]
    password = query.getlist("pass")[0]
    all_users = models.User.objects.all()
    valid = False
    for user in all_users:
        if user.email == email and user.password == password:
            user.status = str(datetime.now().timestamp())
            user.save()
            valid = True
    return JsonResponse({"Response":valid})

def save_info(request):
    logger.debug("GETS HERE---\n")
    query = request.GET
    email = query.getlist("email")[0]
    name = query.getlist("name")[0]
    password = query.getlist("pass")[0]
    user = models.User(name=name, password=password, email=email, status="")
    user.save()
    return JsonResponse({"Response":"Success"})

def results(request, query):
    logger.debug("QUERY-----------\n")
    logger.debug(query)

    return render(request, 'results.html', context)

def getResults(request):
    logger.debug("GETTING RESULTS-----\n")
    query = request.GET
    logger.debug(query)
    majors = query.getlist("majors[]")
    locations = query.getlist("locations[]")
    employers = query.getlist("employers[]")
    for i in range(0, len(majors)):
        major = majors[i]
        if "%20" in major:
            logger.debug("TRUE----\n")
            majors[i] = major.replace("%20", " ")
            logger.debug(majors[i])


    avail_jobs = context['JOBS']
    query_jobs = {}
    query_jobs["JOBS"] = []

    if majors or employers or locations:
        for i in avail_jobs:
            ct = 0
            if majors:
                temp_jobs = i['Majors']
                for j in majors:
                    if j in temp_jobs:
                        ct += 1
                        break
            else:
                ct += 1
            
            if locations:
                temp_location = i['Location']
                for j in locations:
                    if j == temp_location:
                        ct += 1
                        break
            else:
                ct += 1
            
            if employers:
                temp_employer = i['Employer']
                for j in employers:
                    if j == temp_employer:
                        ct += 1
                        break
            else:
                ct += 1
            if ct == 3:
                query_jobs["JOBS"].append(i)
    else:
        query_jobs["JOBS"] = avail_jobs

    logger.debug("QUERY JOBS----\n{}".format(query_jobs))
    return JsonResponse(query_jobs)
    
def desc(request):
    return render(request, "jd.html", context)

def dropdowns(request):
    logger.debug("dropdown\n\n")
    dropdowns = {}
    dropdowns['EMPLOYERS'] = context['EMPLOYERS']
    dropdowns['MAJORS'] = context['MAJORS']
    dropdowns['LOCATIONS'] = context['LOCATIONS']
    return JsonResponse(dropdowns)

