import {createRouter, createWebHistory} from "vue-router"
import Login from "./pages/Login.vue"
import Profile from "./pages/Profile.vue"
import MediaAssets from "./pages/MediaAssets.vue"
import isLoggedIn from "./middleware/isLoggedIn"
import preventAuthAccess  from "./middleware/preventAuthAccess"
import SignUp from "./pages/SignUp.vue"
import MeetingNotes from "./pages/MeetingNotes.vue"
import UsefulInfo from "./pages/UsefulInfo.vue"
import PaidAdvertisementReports from "./pages/PaidAdvertisementReports.vue"
import AdminPage from "./pages/admin/AdminPage.vue"
import ClientPage from "./pages/admin/ClientPage.vue"
import OnBoarding from "./pages/OnBoarding.vue"
import ContactDetails from "./pages/ContactDetails.vue"
import MeetingNotePage from "./pages/MeetingNotePage.vue"

export const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:"/onboarding",
            component:OnBoarding
        },
        {
            path:"/",
            component:Profile,
            beforeEnter:isLoggedIn
        },
        {
            path:"/login",
            component:Login,
            // beforeEnter:isLoggedIn
        },
        {
            path:"/media-assets",
            component:MediaAssets
        },
        {
            path:"/signup",
            component:SignUp
        },
        {
            path:"/meeting-notes",
            component:MeetingNotes
        },
        {
            path:"/useful-info",
            component:UsefulInfo
        },
        {
            path:"/paid-advertising-reports",
            component:PaidAdvertisementReports
        },
        {
            path:"/contacts-details",
            component:ContactDetails
        },
        {
            path:"/meeting-notes/meeting-note-page/:email/:id",
            component:MeetingNotePage
        },
        {
            path: "/admin",
            children: [
                {
                    path:"",
                    component: AdminPage,
                },
                {
                    path: "client-page/:email",
                    component: ClientPage
                }
            ]
        }
        
    ]
})
