<div align="center">
<h1>♾️ Toasted Notifier ♾️</h1>
<br />

<p>

Toasted Notifier is a forked verison of [node-notifier](https://github.com/mikaelbr/node-notifier) which has been updated with various changes. It allows for you to display push notifications within your application for Windows, Linux, and macOS. 

<br />

This library is packaged with [ntfy-desktop](https://github.com/Aetherinox/ntfy-desktop)
</p>

<br />

<img src="https://github.com/Aetherinox/toasted-notifier/assets/118329232/8ed8330f-2f1f-43e1-9264-cb5ead9314f0" width="630">

<br />

<img src="https://github.com/Aetherinox/toasted-notifier/assets/118329232/ca453129-bf45-4b92-9979-447219b7df02" width="630">

<br />

<img src="https://github.com/Aetherinox/toasted-notifier/assets/118329232/f2ec9a0f-07f0-4cef-b791-99cf97a9fa39" width="630">

<br />

</div>

<br />

<div align="center">

<!-- prettier-ignore-start -->
[![Version][badge-version-gh]][link-version-gh] [![Build Status][badge-build]][link-build] [![Downloads][badge-downloads-gh]][link-downloads-gh] [![Size][badge-size-gh]][badge-size-gh] [![Last Commit][badge-commit]][badge-commit]
<!-- prettier-ignore-end -->

</div>

<br />

---

<br />

- [About](#about)
  - [What is ntfy-toast](#what-is-ntfy-toast)
- [Features](#features)
- [Install](#install)
  - [appID support](#appid-support)
    - [Create App Shortcut](#create-app-shortcut)
    - [Call App](#call-app)


<br />

---

<br />

# About
Toasted Node allows you to send cross platform native notifications using Node.js. Works well with Electron.

The correct notification package will be used by Toasted Node depending on the end-user operating system:
-  `MacOS`: Notification Center
   - `>= 10.8` for native notifications, or Growl if earlier. 
-  `Linux`: notify-osd or libnotify-bin
   - notify-osd or libnotify-bin must be installed 
   - Ubuntu should have this by default
-  `Windows 8 - 11`: [ntfy-toast](#what-is-ntfy-toast)
-  `Windows 7 and earlier`: Taskbar balloons
   -  Taskbar balloons for Windows < 8.
   -  Growl as fallback.
   -  Growl takes precedence over Windows balloons.  
-  `Other`: Growl is used if none of these requirements are met

<br />

## What is ntfy-toast
[ntfy-toast](https://github.com/Aetherinox/ntfy-toast) is a notification system for Windows 10/11. It is one of the libraries used by Node Toasted to display notifications for users.

It is based on [SnoreToast](https://github.com/KDE/snoretoast), but has been updated with numerous features.

<br />

---

<br />

# Features
- Notification support for Windows XP - 11, Linux, and MacOS.
- Windows custom appID support for branding
- Persistent notifications keep a message on-screen until the user dismisses it
- No change in code if coming over from [node-notifier](https://github.com/mikaelbr/node-notifier)
- Customize sounds and icons

<br />

---

<br />

# Install
Simply install it using:

```shell
npm install --save toasted-notifier
```

<br />

---

<br />

## appID support
Windows Toast notifications will show the name of the application calling the notification at the top of each popup. Out-of-box, the application name will be NtfyToast.

With the `Windows Fall Creators Update`, you may modify the application name notifications on Windows 10 / 11 by supplying an `appID` to your notification javascript code. The appID must be the id assigned to the executable you wish to define that will show for the name at the top of the notification.

If you wish to brand notifications with your own application name, then there are a few steps you must complete.

<br />

### Create App Shortcut
You must create a windows shortcut (.lnk) within your windows Start Menu. This is a requirement by Microsoft.

The program used by Toasted Node for Windows 10 & 11 notifications named ntfy-toast; includes a command which will help you create the shortcut link automatically. To do this, open Command Prompt and run the command:

```shell
X:\path\to\node\project\node_modules\toasted-notifier\vendor\ntfyToast\ntfytoast.exe -install "MyApp\MyApp.lnk" "C:\path\to\myApp.exe" "My.APP_ID"
```

<br />

| Argument | Description |
| --- | --- |
| `"MyApp\MyApp.lnk"` | Where the lnk shortcut will be placed.  <br /> <br /> `C:\Users\USER\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\MyApp\MyApp.lnk` |
| `"C:\path\to\myApp.exe"` | Path to the executable you want to show the name for at the top of notifications |
| `"My.APP_ID"` | Your .exe app id |

<br />

To get the appID for the application you want to use, you can open Powershell and run the command:

```powershell
get-StartApps | Where-Object {$_.Name -like '*YourAppName*'}
```

<br />

In our example, we can run
```powershell
get-StartApps | Where-Object {$_.Name -like '*Ntfytoast*'}
```

<br />

Which returns the following:
```console
Name          AppID
----          -----
ntfytoast     com.ntfytoast.id
```

<br />

This means that if I wanted to use NtfyToast as the app which sends notifications, my final command would be:

```
X:\path\to\node\project\node_modules\toasted-notifier\vendor\ntfyToast\ntfytoast.exe -install "Ntfytoast\Ntfytoast.lnk" "C:\path\to\ntfytoast.exe" "com.ntfytoast.id"
```

<br />

When the `.lnk` is created, it will be placed in:
```
C:\Users\USER\AppData\Roaming\Microsoft\Windows\Start Menu\Programs
```

<br />

<div align="center">

<img src="https://github.com/Aetherinox/ntfy-toast/assets/118329232/ea9da9f3-4c8c-4fe5-9714-d4e83901f301" width="380px">

</div>


<br />

### Call App
Now that you have your app shortcut created, you can simply call the app every time you want to send a notification using `appID`. Remember to use your own app's id.

```javascript
const WindowsToaster = require('toasted-notifier').WindowsToaster;

var notifier = new WindowsToaster({
    withFallback: false,            // Fallback to Growl or Balloons?
    customPath: undefined           // Relative/Absolute path if you want to use your fork of SnoreToast.exe
});

notifier.notify(
{
    title: undefined,               // String. Required
    message: undefined,             // String. Required if remove is not defined
    icon: undefined,                // String. Absolute path to Icon
    sound: false,                   // Bool | String (as defined by http://msdn.microsoft.com/en-us/library/windows/apps/hh761492.aspx)
    id: undefined,                  // Number. ID to use for closing notification.
    appID: 'com.ntfytoast.id',      // String. App.ID and app Name. Defaults to no value, causing SnoreToast text to be visible.
    remove: undefined,              // Number. Refer to previously created notification to close.
    install: undefined              // String (path, application, app id).  Creates a shortcut <path> in the start menu which point to the executable <application>, appID used for the notifications.
},
function (error, response) {
    console.log(response);
}
);
```

<br />

With the above code, we have specified an `appID` on the following line:
```javascript
    appID: 'com.ntfytoast.id',
```

<br />

---

<br />


<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

<br />
<br />

<!-- prettier-ignore-start -->
<!-- BADGE > GENERAL -->
[link-general-npm]: https://npmjs.com
[link-general-nodejs]: https://nodejs.org
[link-npmtrends]: http://npmtrends.com/toasted-notifier
<!-- BADGE > VERSION > GITHUB -->
[badge-version-gh]: https://img.shields.io/github/v/tag/Aetherinox/toasted-notifier?logo=GitHub&label=Version&color=ba5225
[link-version-gh]: https://github.com/Aetherinox/toasted-notifier/releases
<!-- BADGE > VERSION > NPMJS -->
[badge-version-npm]: https://img.shields.io/npm/v/toasted-notifier?logo=npm&label=Version&color=ba5225
[link-version-npm]: https://npmjs.com/package/toasted-notifier
<!-- BADGE > LICENSE -->
[badge-license-mit]: https://img.shields.io/badge/MIT-FFF?logo=creativecommons&logoColor=FFFFFF&label=License&color=9d29a0
[link-license-mit]: https://github.com/Aetherinox/toasted-notifier/blob/main/LICENSE
<!-- BADGE > BUILD -->
[badge-build]: https://img.shields.io/github/actions/workflow/status/Aetherinox/toasted-notifier/release-npm.yml?logo=github&logoColor=FFFFFF&label=Build&color=%23278b30
[link-build]: https://github.com/Aetherinox/toasted-notifier/actions/workflows/release-npm.yml
<!-- BADGE > DOWNLOAD COUNT -->
[badge-downloads-gh]: https://img.shields.io/github/downloads/Aetherinox/toasted-notifier/total?logo=github&logoColor=FFFFFF&label=Downloads&color=376892
[link-downloads-gh]: https://github.com/Aetherinox/toasted-notifier/releases
[badge-downloads-npm]: https://img.shields.io/npm/dw/%40aetherinox%2Fmarked-alert-fa?logo=npm&&label=Downloads&color=376892
[link-downloads-npm]: https://npmjs.com/package/toasted-notifier
<!-- BADGE > DOWNLOAD SIZE -->
[badge-size-gh]: https://img.shields.io/github/repo-size/Aetherinox/toasted-notifier?logo=github&label=Size&color=59702a
[link-size-gh]: https://github.com/Aetherinox/toasted-notifier/releases
[badge-size-npm]: https://img.shields.io/npm/unpacked-size/toasted-notifier/latest?logo=npm&label=Size&color=59702a
[link-size-npm]: https://npmjs.com/package/toasted-notifier
<!-- BADGE > COVERAGE -->
[badge-coverage]: https://img.shields.io/codecov/c/github/Aetherinox/toasted-notifier?token=MPAVASGIOG&logo=codecov&logoColor=FFFFFF&label=Coverage&color=354b9e
[link-coverage]: https://codecov.io/github/Aetherinox/toasted-notifier
<!-- BADGE > ALL CONTRIBUTORS -->
[badge-all-contributors]: https://img.shields.io/github/all-contributors/Aetherinox/toasted-notifier?logo=contributorcovenant&color=de1f6f&label=contributors
[link-all-contributors]: https://github.com/all-contributors/all-contributors
[badge-tests]: https://img.shields.io/github/actions/workflow/status/Aetherinox/marked-alert-fa/npm-tests.yml?logo=github&label=Tests&color=2c6488
[link-tests]: https://github.com/Aetherinox/toasted-notifier/actions/workflows/tests.yml
[badge-commit]: https://img.shields.io/github/last-commit/Aetherinox/toasted-notifier?logo=conventionalcommits&logoColor=FFFFFF&label=Last%20Commit&color=313131
[link-commit]: https://github.com/Aetherinox/toasted-notifier/commits/main/
<!-- prettier-ignore-end -->
