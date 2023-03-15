<template>

  <div class="auth-wrapper auth-v1 px-2">
    <b-row>
      <b-col
        cols="12"
      >
        <div class="auth-inner py-2">

          <!-- Login v1 -->
          <b-card class="mb-0">
            <b-link class="brand-logo">
              <vuexy-logo />

              <h2 class="brand-text text-primary ml-1">
                Tele Health
              </h2>
            </b-link>

            <b-card-title class="mb-1">
              Welcome to Tele! 👋
            </b-card-title>

            <b-button
              variant="primary"
              block
              :disabled="invalid"
              @click="getSignature"
            >
              Join Meeting
            </b-button>

          </b-card>
          <!-- /Login v1 -->
        </div>
      </b-col>
    </b-row>
  </div>

</template>

<script>
import {
  BButton, BCard, BLink, BCardTitle, BRow, BCol,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import Configs from '@/@core/utils/config/index'
import { ZoomMtg } from '@zoomus/websdk'

export default {
  components: {
    // BSV
    BButton,
    BCard,
    BCardTitle,
    BLink,
    VuexyLogo,
    BRow,
    BCol,
  },
  data() {
    return {
      // This sample app has been updated to use Meeting SDK credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
      sdkKey: Configs.sdkKey,
      meetingNumber: this.$route.params.id,
      passWord: this.$route.query.pwd,
      role: this.$route.query.role,
      userName: this.$route.query.usn,
      userEmail: '',
      leaveUrl: Configs.leaveUrl,
      // pass in the registrant's token if your meeting or webinar requires registration. More info here:
      // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered
      // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-registered
      registrantToken: '',
      zakToken: '',
    }
  },
  computed: {
  },
  created() {
    ZoomMtg.setZoomJSLib('https://source.zoom.us/2.10.1/lib', '/av')
    ZoomMtg.preLoadWasm()
    ZoomMtg.prepareWebSDK()
    // loads language files, also passes any error messages to the ui
    ZoomMtg.i18n.load('en-US')
    ZoomMtg.i18n.reload('en-US')
  },
  mounted() {
    ZoomMtg.inMeetingServiceListener('onUserJoin', data => {
      console.log('inMeetingServiceListener onUserJoin', data)
    })
  },
  methods: {
    getSignature() {
      this.startMeeting()
    },
    startMeeting() {
      const signature = ZoomMtg.generateSDKSignature({
        sdkKey: 'iWMkwYNWQFSfIyRObV_cxA',
        sdkSecret: 'o8NvBFIXMwQ4KNnAzn3sdC0WxDOTba0G',
        meetingNumber: this.meetingNumber,
        role: this.role,
      })
      console.log(signature)
      document.getElementById('zmmtg-root').style.display = 'block'

      ZoomMtg.init({
        leaveUrl: this.leaveUrl,
        success: success => {
          console.log(success)
          ZoomMtg.join({
            signature,
            sdkKey: this.sdkKey,
            meetingNumber: this.meetingNumber,
            passWord: this.passWord,
            userName: this.userName,
            userEmail: this.userEmail,
            tk: this.registrantToken,
            zak: this.zakToken,
            // eslint-disable-next-line no-shadow
            success: success => {
              console.log(success)
            },
            error: error => {
              console.log(error)
            },
          })
        },
        error: error => {
          console.log(error)
        },
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
#zmmtg-root {
  display: none;
}

</style>
