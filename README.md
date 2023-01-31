# EDoctorUG

A react native project inspected by Mr. Mandela of EDoctorug Uganda

## Install dependencies

```bash
yarn install
```

## Preview

Make sure expo go is installed on your mobile device.
Scan the QR code to test the app on your device

## Start the dev server

```bash
yarn start
```

## Backend

The backend is a django and djangorestframework project. I have used dj-rest-auth for both login and registraion.

### Run the backend server.

Go to the backend directory

```bash
cd backend
```

create a virtual environment

```bash
python3 -m venv env
```

Activate the virtual environment
for linux

```bash
source env/bin/activate
```

Install required packages with pip

```bash
pip install -r requirements.txt
```
Run the server

```bash
python3 manage.py runserver 0.0.0.0:8000
```

Add the IP address to the allowed hosts in core.settings
