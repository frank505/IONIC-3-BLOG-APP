import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ServicePage} from  '../pages/service/service';
import {AboutusPage } from '../pages/aboutus/aboutus';
import {ContactusPage} from '../pages/contactus/contactus';
import {BlogPage} from '../pages/blog/blog';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TabsContentPage} from '../pages/tabs-content/tabs-content';
import {TabsMainPage} from '../pages/tabs-main/tabs-main';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { HttpProvider } from '../providers/http/http';
import { HttpModule } from '@angular/http';
import { YoutubePage } from "../pages/youtube/youtube";
import { BlogcontentPage } from "../pages/blogcontent/blogcontent";
import {BlogsettingsPage} from '../pages/blogsettings/blogsettings';
import {BlogfullPage} from "../pages/blogfull/blogfull";
import {SafehtmlPipe} from '../pipes/safehtml/safehtml';
import { SocialSharing } from '@ionic-native/social-sharing';
import {ViewcommentsPage} from '../pages/viewcomments/viewcomments';
import {ViewrepliesPage} from '../pages/viewreplies/viewreplies';
import {SearchPage} from '../pages/search/search';
import {VideosearchPage} from '../pages/videosearch/videosearch';
import { StreamingMedia} from '@ionic-native/streaming-media';
import {MessagemePage} from '../pages/messageme/messageme';
import { IoniccontrollersProvider } from '../providers/ioniccontrollers/ioniccontrollers';
import {SettingsPage} from '../pages/settings/settings';
import { HelpPage} from '../pages/help/help';
import {PrivacyPage} from '../pages/privacy/privacy';
import {TermsofusePage} from '../pages/termsofuse/termsofuse';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ServicePage,
    AboutusPage,
    ContactusPage,
    BlogPage,
    TabsContentPage,
    TabsMainPage,
    YoutubePage,
    BlogcontentPage,
    BlogsettingsPage,
    BlogfullPage,
    SafehtmlPipe,
      ViewcommentsPage,
      ViewrepliesPage,
      SearchPage,
      VideosearchPage,
      MessagemePage,
      SettingsPage,
      PrivacyPage,
      HelpPage,
      TermsofusePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ServicePage,
    AboutusPage,
    ContactusPage,
    BlogPage,
    TabsContentPage,
    TabsMainPage,
    YoutubePage,
    BlogcontentPage,
    BlogsettingsPage,
    BlogfullPage,
    ViewcommentsPage,
    ViewrepliesPage,
    SearchPage,
    VideosearchPage,
    MessagemePage,
    SettingsPage,
      PrivacyPage,
      HelpPage,
      TermsofusePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpProvider,
   SafehtmlPipe,
   SocialSharing,
   StreamingMedia, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IoniccontrollersProvider,
    ]
})
export class AppModule {}
/**
 * downgrade my ionic version  npm i -g ionic@3.20.0
 */
