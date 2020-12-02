# MySurveys

MySurveys is an open source web app designed to help researchers conduct studies. You can read more about conducting surveys by reading the documentation

https://docs.google.com/document/d/1IhZD4RmyarY-Kn3iSRXIRboweJbqwUJOCRHqaf_P_bM/edit?usp=sharing

# Test scripts

ng test --no-watch --no-progress --browsers=ChromeHeadlessCI
ng e2e

## Installation and getting started

There are two parts to the software: the Laravel backend and Angular frontend. This readme will cover both.

### Frontend

The frontend is an angular~9 web app.

**Local installation**

clone \*
configure endpoints
npm install
ng serve

**Deployment**
See ng docs for deployment

### Backend

The backend is Laravel \*v#.

**Local installation and testing**
Clone the backend at http://github.com/DukeCityDigital/mysurveys-backend
composer install
set up env
migrate

## Initial Configuration

After migration, you should be able to log in as the administrator using the default credentials.

Invite your first researcher by navigating to the \*panel.

**View full documentation here**
https://docs.google.com/document/d/1IhZD4RmyarY-Kn3iSRXIRboweJbqwUJOCRHqaf_P_bM/edit?usp=sharing
