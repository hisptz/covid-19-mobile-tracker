# COVID-19 Mobile Tracking

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Mobile app powered by DHIS2 tracker implementation to help track COVID-19 cases

# Installation

Run `npm install` to install all necessary dependencies

# Usage

## 1. With capacitor

### 1.1 Build your project

You must build your Ionic project at least once before adding any native platforms.

`ionic build`

This creates the `www` folder that Capacitor has been automatically configured to use as the webDir in `capacitor.config.json`.

This file is ignored but example file is available and you will have to copy and paste `capacitor.config.example.json` and rename the copy to `capacitor.config.json`.

### 1.2 App platforms

```
npx cap add ios
npx cap add android
```

Both android and ios folders at the root of the project are created. These are entirely separate native project artifacts that should be considered part of your Ionic app (i.e., check them into source control, edit them in their own IDEs, etc.).

### 1.3 Open IDE to build, run, and deploy

```
npx cap open ios
npx cap open android
```

The native iOS and Android projects are opened in their standard IDEs (Xcode and Android Studio, respectively). Use the IDEs to run and deploy your app.

**NOTE:**

You may encounter and error `Unable to launch Android Studio. You must configure "linuxAndroidStudioPath" in your capacitor.config.json to point to the location of studio.sh, using JavaScript-escaped paths`. In this case, locate your sdk location and update `linuxAndroidStudioPath` attrbute in `capacitor.config.json` to point to your system path eg

```
{
    "linuxAndroidStudioPath": "/usr/local/android-studio/bin/studio.sh"
}
```

### Syncing your app with Capacitor

Every time you perform a build (e.g. ionic build) that changes your web directory (default: www), you'll need to copy those changes down to your native projects:

`npx cap copy`

### Further Reads

For more about capacitor [Read more here](https://capacitor.ionicframework.com/docs)
