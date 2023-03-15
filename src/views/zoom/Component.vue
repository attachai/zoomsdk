<template>
  <div class="auth-wrapper auth-v1 px-2">
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
        <div
          id="meetingSDKElement"
          style="width: 100%;height:500px;display: block !important;"
        >
          <!-- Zoom Meeting SDK Component View Rendered Here -->
        </div>
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
  </div>
</template>

<script>
import {
  BCard, BLink, BCardTitle, BButton,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import Configs from '@/@core/utils/config/index'
import ZoomMtgEmbedded from '@zoomus/websdk/embedded'
import { ZoomMtg } from '@zoomus/websdk'

export default {
  components: {
    // BSV\
    BCard,
    BCardTitle,
    BLink,
    VuexyLogo,
    BButton,
  },
  data() {
    return {
      // This sample app has been updated to use Meeting SDK credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
      client: ZoomMtgEmbedded.createClient(),
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
      this.startMeeting('')
    },
    startMeeting() {
      const signature = ZoomMtg.generateSDKSignature({
        sdkKey: 'iWMkwYNWQFSfIyRObV_cxA',
        sdkSecret: 'o8NvBFIXMwQ4KNnAzn3sdC0WxDOTba0G',
        meetingNumber: this.meetingNumber,
        role: this.role,
      })
      console.log(signature)
      const meetingSDKElement = document.getElementById('meetingSDKElement')

      this.client.init({
        debug: true,
        zoomAppRoot: meetingSDKElement,
        language: 'en-US',
        customize: {
          meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
          toolbar: {
            buttons: [
              {
                text: 'Custom Button',
                className: 'CustomButton',
                onClick: () => {
                  console.log('custom button')
                },
              },
            ],
          },
        },
      })

      this.client.join({
        signature,
        sdkKey: this.sdkKey,
        meetingNumber: this.meetingNumber,
        password: this.passWord,
        userName: this.userName,
        userEmail: this.userEmail,
        tk: this.registrantToken,
        zak: this.zakToken,
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
