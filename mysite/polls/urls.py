from django.urls import path
from django.urls import include, re_path

from . import views

urlpatterns = [
    path('home', views.index, name='index'),
    path('results/<query>', views.results, name='results'),
    path("ajax/get_dropdowns", views.dropdowns, name="dropdowns"),
    path('results/ajax/get_results', views.getResults, name="get_results"),
    path('login', views.login, name='login'),
    path('register', views.register, name='register'),
    path('ajax/validate_reg', views.validate_reg, name='validate_reg'),
    path('ajax/validate_login', views.validate_login, name='validate_login'),
    path('ajax/save_info', views.save_info, name='save_info'),
    path('ajax/get_active', views.get_active, name='get_active'),
    path('ajax/logout', views.logout, name='logout'),
    path('portal', views.portal, name='portal'),
    path('ajax/change_name', views.change_name, name='portal'),
    path('ajax/change_pass', views.change_pass, name='portal'),
    path('ajax/change_email', views.change_email, name='portal'),
    path('results/ajax/apply', views.apply, name="apply"),
    path('ajax/get_jobs', views.get_jobs, name="apply")
]