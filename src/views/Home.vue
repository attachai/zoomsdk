<template>
  <div>
    <b-card title="Kick start your project 🚀">
      <b-card-text>All the best for your new project.</b-card-text>
      <b-card-text>Please make sure to read our <b-link
        href="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/documentation/"
        target="_blank"
      >
        Template Documentation
      </b-link> to understand where to go from here and how to use our template.</b-card-text>
    </b-card>

    <b-card title="Want to integrate JWT? 🔒">
      <b-card-text>We carefully crafted JWT flow so you can implement JWT with ease and with minimum efforts.</b-card-text>
      <b-card-text>Please read our  JWT Documentation to get more out of JWT authentication.</b-card-text>
    </b-card>
    <b-card title="Want to integrate JWT? 🔒">
      <div class="col-12">
        <iframe
          id="myFrame"
          allow="camera; microphone"
          width="100%"
          height="500"
          title="W3Schools Free Online Web Tutorials"
        />
      </div>
    </b-card>
  </div>
</template>

<script>
import { BCard, BCardText, BLink } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardText,
    BLink,
  },
  data() {
    return {
      src: `https://1bd6-2405-9800-b961-636b-9c02-f8cf-93a3-ce67.ap.ngrok.io/tele/${this.$route.params.id}?pwd=${this.$route.query.pwd}&usn=${this.$route.query.usn}`,
      meetingNumber: this.$route.params.id,
      passWord: this.$route.query.pwd,
      role: 0,
      userName: this.$route.query.usn,
    }
  },
  mounted() {
    document.getElementById('myFrame').src = this.src
  },
}
</script>

<style>

</style>
